from pymongo import MongoClient
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
from bson.objectid import ObjectId
from flask import Flask, request, jsonify
from flask_cors import CORS
import random
app = Flask(__name__)
CORS(app)
# Kết nối đến MongoDB
client = MongoClient('mongodb+srv://Cao:cao12345@cluster0.q2w0h.mongodb.net/')
db = client['test']
collection = db['orders']

# Hàm gợi ý sản phẩm
def suggest_top_products(order_id):
    try:
        # Lấy đơn hàng từ cơ sở dữ liệu
        order = collection.find_one({'_id': ObjectId(order_id)})
        print("Order in suggest_top_products:", order)
        if not order or 'cartItems' not in order:
            return []

        # Lấy sản phẩm đã mua
        purchased_items = [str(item['productId']) for item in order['cartItems']]
        print("Purchased items:", purchased_items)

        # Tính toán quy tắc cho tất cả các đơn hàng
        # Lấy Dữ Liệu Đơn Hàng
        orders = collection.find()
        data = []

        for order in orders:
            if 'cartItems' in order:
                items = [str(item['productId']) for item in order['cartItems']]
                if items:  # Chỉ thêm vào nếu có items
                    data.append(items)

        print("Transaction data:", data)
        
        if not data:  # Kiểm tra nếu không có dữ liệu
            print("No transaction data available")
            return []

        # Chuyển Đổi Dữ Liệu Thành DataFrame
        encoder = TransactionEncoder()
        onehot = encoder.fit(data).transform(data)
        onehot_df = pd.DataFrame(onehot, columns=encoder.columns_)

        # Tìm Các Tập Sản Phẩm Thường Xuyên với ngưỡng support thấp hơn
        frequent_itemsets = apriori(onehot_df, min_support=0.01, use_colnames=True)
        print("Frequent itemsets:", frequent_itemsets)

        if frequent_itemsets.empty:
            print("No frequent itemsets found")
            return []

        # Tạo quy tắc kết hợp với ngưỡng confidence thấp hơn
        rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.3)
        print("Association rules:", rules)

        if rules.empty:
            print("No association rules found")
            return []

        # Lọc các quy tắc dựa trên sản phẩm đã mua
        filtered_rules = rules[rules['antecedents'].apply(lambda x: x.issubset(set(purchased_items)))]
        print("Filtered rules:", filtered_rules)

        if filtered_rules.empty:
            print("No matching rules found for purchased items")
            return []

        # Sắp xếp theo confidence và lấy 10 quy tắc cao nhất
        best_suggestions = filtered_rules.sort_values(by='confidence', ascending=False).head(10)
        print("Best suggestions:", best_suggestions)

        # Lấy danh sách sản phẩm từ các quy tắc
        suggested_products = []
        for _, row in best_suggestions.iterrows():
            suggested_products.extend(list(row['consequents']))

        # Loại bỏ các sản phẩm đã mua và trùng lặp
        final_suggestions = list(set(suggested_products) - set(purchased_items))
        print("Final suggestions before filtering:", final_suggestions)

        # Nếu không có gợi ý nào, tìm các sản phẩm thường được mua cùng
        if not final_suggestions:
            # Tìm các sản phẩm xuất hiện nhiều nhất trong các giao dịch
            all_products = [item for sublist in data for item in sublist]
            product_counts = pd.Series(all_products).value_counts()
            
            # Lấy top 5 sản phẩm phổ biến nhất, loại bỏ sản phẩm đã mua
            popular_products = product_counts[~product_counts.index.isin(purchased_items)].head(5)
            final_suggestions = list(popular_products.index)
            print("Popular products suggestions:", final_suggestions)

        return final_suggestions[:5]

    except Exception as e:
        print("Error in suggest_top_products:", str(e))
        import traceback
        print("Traceback:", traceback.format_exc())
        return []

@app.route('/suggest', methods=['GET'])
def get_suggestions():
    order_id = request.args.get('order_id')
    print("Received order_id:", order_id)
    
    try:
        order = collection.find_one({'_id': ObjectId(order_id)})
        print("Found order:", order)
        if order and 'cartItems' in order:
            try:
                suggestions = suggest_top_products(order_id)
                print("Sản phẩm gợi ý", suggestions)
                return jsonify(suggestions)
            except Exception as e:
                print("Error in suggest_top_products:", str(e))
                return jsonify({"error": f"Lỗi khi tạo gợi ý: {str(e)}"}), 500
        else:
            print("Order not found or no cart items")
            return jsonify({"error": "Không tìm thấy đơn hàng hoặc không có sản phẩm nào."}), 404
    except Exception as e:
        print("Error in get_suggestions:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=7777)