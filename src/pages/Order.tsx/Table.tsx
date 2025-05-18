import React from "react";
import { Table } from "antd";
import { CartItem } from "../../types";
interface TableInterface {
    dataSource: Array<CartItem>;
}
const OrderTable: React.FC<TableInterface> = (props: TableInterface) => {
    const columns = [
        {
            title: "No.",
            dataIndex: "no",
            key: "1",
            render: (text: string, record: CartItem, index: number) => index + 1,
        },
        {
            title: "Item",
            dataIndex: "item_name",
            key: "2",
        },
        {
            title: "Price",
            dataIndex: "item_price",
            key: "3",
            render: (text: string) => text + " THB",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "4",
        },
    ];

    return <Table dataSource={props.dataSource} columns={columns} pagination={false} />;
};

export default OrderTable;
