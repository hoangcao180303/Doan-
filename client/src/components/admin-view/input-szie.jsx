import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Trash } from 'lucide-react';
import { Pen } from 'lucide-react';
import { Save } from 'lucide-react';
const SizeInput = ({ sizes, setSizes }) => {
    const [size, setSize] = useState(''); // Kích thước mới
    const [quantity, setQuantity] = useState(0); // Số lượng mới
    const [editIndex, setEditIndex] = useState(-1); // Chỉ số của phần tử đang chỉnh sửa
    const [newQuantity, setNewQuantity] = useState(0); // Số lượng mới cho phần chỉnh sửa

    // Hàm thêm kích thước mới
    const addSize = () => {
        if (size && quantity > 0) {
            setSizes(prevSizes => [...prevSizes, { size, quantity }]);
            resetInputs();
        }
    };

    // Hàm xóa kích thước
    const removeSize = (index) => {
        setSizes(prevSizes => prevSizes.filter((_, i) => i !== index));
    };

    // Bắt đầu chỉnh sửa số lượng
    const startEdit = (index) => {
        setEditIndex(index);
        setNewQuantity(sizes[index].quantity); // Đặt số lượng hiện tại vào state
    };

    // Lưu thay đổi số lượng
    const saveEdit = (index) => {
        const updatedSizes = sizes.map((s, i) => {
            if (i === index) {
                return { ...s, quantity: newQuantity }; // Tạo bản sao mới của đối tượng với số lượng đã sửa
            }
            return s; // Giữ nguyên đối tượng không thay đổi
        });

        setSizes(updatedSizes);
        resetInputs();
    };

    // Đặt lại các trường nhập liệu
    const resetInputs = () => {
        setSize('');
        setQuantity(0);
        setEditIndex(-1); // Đặt lại chỉ số chỉnh sửa
        setNewQuantity(0); // Reset số lượng mới
    };

    return (
        <div className="mb-4">
            <h3><b>Add sizes</b></h3>
            <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Sizes (S, M, L...)"
                className="border p-3 mr-3"
            />
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                placeholder="Quantity"
                className="border p-3 mr-3"
            />
            <Button onClick={addSize}>Add</Button>
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Size</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sizes.map((s, index) => (
                        <TableRow key={index}>
                            <TableCell>{s.size}</TableCell>
                            <TableCell>
                                {editIndex === index ? (
                                    <input
                                        type="number"
                                        value={newQuantity}
                                        onChange={(e) => setNewQuantity(parseInt(e.target.value, 10))}
                                        className="border p-1"
                                    />
                                ) : (
                                    s.quantity
                                )}
                            </TableCell>
                            <TableCell>
                                {editIndex === index ? (
                                    <Button onClick={() => saveEdit(index)} variant="outline"><Save/></Button>
                                ) : (
                                    <Button onClick={() => startEdit(index)} variant="outline"><Pen/></Button>
                                )}
                                <Button onClick={() => removeSize(index)} variant="outline" className="ml-2"><Trash/></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SizeInput;