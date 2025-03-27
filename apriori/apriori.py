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
client = MongoClient('mongodb+srv://dukdy:dukdy2003@cluster0.vjet0.mongodb.net/')
db = client['test']
collection = db['orders']

# Hàm gợi ý sản phẩm
def suggest_top_products(order_id):
    # Lấy đơn hàng từ cơ sở dữ liệu
    order = collection.find_one({'_id': ObjectId(order_id)})
    if not order or 'cartItems' not in order:
        return []

    # Lấy sản phẩm đã mua
    purchased_items = [item['productId'] for item in order['cartItems']]

    # Tính toán quy tắc cho tất cả các đơn hàng
    # Lấy Dữ Liệu Đơn Hàng
    orders = collection.find()
    data = []

    for order in orders:
        if 'cartItems' in order:
            items = [item['productId'] for item in order['cartItems']]
            data.append(items)

    # Chuyển Đổi Dữ Liệu Thành DataFrame
    encoder = TransactionEncoder()
    onehot = encoder.fit(data).transform(data)
    onehot_df = pd.DataFrame(onehot, columns=encoder.columns_)

    # Tìm Các Tập Sản Phẩm Thường Xuyên
    frequent_itemsets = apriori(onehot_df, min_support=0.01, use_colnames=True)

    if not frequent_itemsets.empty:
        rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.5,num_itemsets=None)

        # Lọc các quy tắc dựa trên sản phẩm đã mua
        if not rules.empty:
            # Lấy các quy tắc có antecedents là sản phẩm đã mua
            filtered_rules = rules[rules['antecedents'].apply(lambda x: x.issubset(set(purchased_items)))]

            # Nếu có quy tắc, lấy gợi ý từ consequents
            if not filtered_rules.empty:
                # Sắp xếp theo confidence và lấy 5 quy tắc cao nhất
                best_suggestions = rules.sort_values(by='confidence', ascending=False).head(5)
        
                # Lấy danh sách sản phẩm từ các quy tắc
                suggested_products = [list(suggestion) for suggestion in best_suggestions['consequents']]
        
                # Đưa ra danh sách sản phẩm gợi ý, loại bỏ sản phẩm đã mua
                unique_suggestions = set(item for sublist in suggested_products for item in sublist)
                filtered_suggestions = list(unique_suggestions - set(purchased_items))  # Chuyển đổi trước khi trừ
                final_suggestions = list(set(filtered_suggestions))
                print("Sản phẩm đã mua", purchased_items)
                
                return final_suggestions[:5]  # Chuyển đổi lại thành danh sách

    return []

@app.route('/suggest', methods=['GET'])
def get_suggestions():
    order_id = request.args.get('order_id')
    
    try:
        order = collection.find_one({'_id': ObjectId(order_id)})
        if order and 'cartItems' in order:
            suggestions = suggest_top_products(order_id)
            print("Sản phẩm gợi ý",suggestions)
            return jsonify(suggestions), 200
            
        else:
            return jsonify({"error": "Không tìm thấy đơn hàng hoặc không có sản phẩm nào."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=7777)