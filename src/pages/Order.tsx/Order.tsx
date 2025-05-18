import React, { useCallback, useEffect, useState } from "react";
import { itemsList } from "../../services/data";
import { Campaigns, Cart, CartItem } from "../../types";
import PrimaryButton from "../../components/primaryButton";
import InputTag from "../../components/inputTag";
import { discount } from "../../services/discount";
import OrderCard from "../../components/orderCard";
import OrderTable from "./Table";
import { campaignsSchema } from "../../services/schema";
import { Tag } from "antd";

const Order: React.FC = () => {
    const [list, setList] = useState<CartItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [totalSummary, setTotalSummary] = useState<Cart | null>(null);

    const discountPrice = useCallback((bodyRequest: Cart) => {
        const res = discount(bodyRequest);
        console.log("ressponse====>", res);
        if (typeof res === "object" && res !== null && !Array.isArray(res)) {
            setTotalSummary(res);
        } else {
            setTotalSummary(null);
        }
    }, []);

    useEffect(() => {
        const resItemsList = itemsList;
        const resCampaignsList = campaignsSchema.map((item) => item.campaigns_id);
        setTags(resCampaignsList);
        setList(resItemsList);

        const items: {
            item_id: number;
            quantity: number;
            item_price: number;
        }[] = [];
        resItemsList.map((item) => {
            items.push({
                item_id: item.item_id,
                quantity: item.quantity,
                item_price: item.item_price,
            });
        });
        setSelectedItems(items);
        const bodyRequest: Cart = {
            campaigns_list: selectedTags,
            items_in_cart: items,
        };
        discountPrice(bodyRequest);
    }, [discountPrice]);

    const onConfirmOrder = () => {
        const bodyRequest = {
            campaigns_list: selectedTags,
            items_in_cart: selectedItems,
        };
        discountPrice(bodyRequest);
    };

    const handleTagChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
        setSelectedTags(nextSelectedTags);
    };

    return (
        <>
            <OrderTable dataSource={list} />
            {totalSummary && totalSummary.campaigns_list && (
                <OrderCard
                    cardTitle={"Total summary"}
                    child={
                        <>
                            <p>
                                Discount :{" "}
                                {totalSummary.campaigns_list.length !== 0
                                    ? totalSummary.campaigns_list.map((value:any, index) => <Tag key={index}>{value.discount_des}</Tag>)
                                    : 0}
                            </p>
                            <p>
                                Total Price : {totalSummary.total_price || 0} {totalSummary.currency_type}
                            </p>
                        </>
                    }
                />
            )}
            <InputTag
                tagTitle={"Select Coupon :"}
                tagsData={tags}
                selectedTags={selectedTags}
                handleChange={handleTagChange}
                disabled={totalSummary === null}
            />
            <PrimaryButton buttonName={"Confirm Order"} onClick={onConfirmOrder} disabled={totalSummary === null} />
        </>
    );
};

export default Order;
