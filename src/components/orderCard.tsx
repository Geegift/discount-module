import { Card, Flex, Tag } from "antd";
import { ReactNode } from "react";
interface CardTagInterface {
    cardTitle?: string;
    child?: ReactNode;
}
const OrderCard: React.FC<CardTagInterface> = (props: CardTagInterface) => {
    return (
        <Flex gap="4px 0" wrap justify="center" style={{ paddingTop: "20px" }}>
            <Card title={props.cardTitle} style={{ marginTop: "20px", width: 600 }}>
               {props.child}
            </Card>
        </Flex>
    );
};

export default OrderCard;
