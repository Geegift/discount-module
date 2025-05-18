import { Campaigns, Cart, CartItem } from "../types";
import {
    CampaignsCategory,
    campaignsCategory,
    campaignsSchema,
    CurrencyType,
    DiscountParameter,
    itemsCategory,
    itemsSchema,
} from "./schema";

const mapItems = (items_in_cart: CartItem[]) => {
    return items_in_cart.flatMap((cartItem, index) => {
        const matchedItem = itemsSchema.find((item) => item.item_id === cartItem.item_id);
        if (!matchedItem) return [];
        return itemsCategory
            .filter((cat) => cat.item_category_id === matchedItem.item_category_id)
            .map((cat) => ({
                ...matchedItem,
                item_category_name: cat.item_category_name,
                key: index,
            }));
    });
};

const mapCampaigns = (campaigns_list: Array<Campaigns> | Array<string>) => {
    return campaigns_list.flatMap((campaignId, index) => {
        const matchedCampaign = campaignsSchema.find((data) => data.campaigns_id === campaignId);
        if (!matchedCampaign) return [];
        return campaignsCategory
            .filter((cat) => cat.campaigns_category_id === matchedCampaign.campaigns_category_id)
            .map((cat) => ({
                ...matchedCampaign,
                campaigns_category_name: cat.campaigns_category_name,
                campaigns_category_priority: cat.priority,
                key: index,
            }));
    });
};

export const discount = (bodyRequest: Cart) => {
    console.log("bodyRequest::", bodyRequest);
    const haveCampaigns = bodyRequest.campaigns_list && bodyRequest.campaigns_list.length !== 0;
    const haveItems = bodyRequest.items_in_cart && bodyRequest.items_in_cart.length !== 0;
    if (!haveItems) return ["Error: No items in cart"];

    const currency_type = CurrencyType.THB;
    const items = bodyRequest.items_in_cart ? mapItems(bodyRequest.items_in_cart) : [];
    const beforeDiscount = bodyRequest.items_in_cart?.reduce((total, item) => total + item.item_price, 0) || 0;

    let campaigns: Array<Campaigns> = [];
    let campaignDiscounts: Array<number> = [0];
    let campaignDescription: Array<Campaigns> = [];

    if (bodyRequest.campaigns_list && bodyRequest.campaigns_list.length !== 0) {
        campaigns = mapCampaigns(bodyRequest.campaigns_list) as Array<Campaigns>;
        const sortCampatgnsByPriority = campaigns.sort((a, b) => {
            if (a.campaigns_category_priority && b.campaigns_category_priority) {
                return a.campaigns_category_priority - b.campaigns_category_priority;
            }
            return 0;
        });
        
        sortCampatgnsByPriority.map((campaign) => {
            if (campaign.discount) {
                if (campaign.campaigns_category_name === CampaignsCategory.Coupon) {
                    switch (campaign.parameters) {
                        case DiscountParameter.Amount:
                            campaignDescription.push({
                                campaigns_id: campaign.campaigns_id,
                                discount_des: `${campaign.discount} ${currency_type}`,
                            });
                            return campaignDiscounts.push(campaign.discount);

                        case DiscountParameter.Percentage:
                            const calByCateType = items.reduce((total, item) => total + item.item_price, 0);
                            campaignDescription.push({
                                campaigns_id: campaign.campaigns_id,
                                discount_des: `${campaign.discount}%`,
                            });
                            return campaignDiscounts.push(calByCateType * (campaign.discount / 100));

                        default:
                            return campaignDiscounts.push(0);
                    }
                } else if (campaign.campaigns_category_name === CampaignsCategory.OnTop) {
                    switch (campaign.parameters) {
                        case DiscountParameter.Amount:
                            const calByCateType = items
                                .filter((item) => campaign.group_item_category_id?.includes(item.item_category_id))
                                .reduce((total, item) => total + item.item_price, 0);
                            const categoryNames = items
                                .filter((item) => campaign.group_item_category_id?.includes(item.item_category_id))
                                .map((item) => item.item_category_name)
                                .filter((value, index, self) => self.indexOf(value) === index)
                                .join(", ");
                            campaignDescription.push({
                                campaigns_id: campaign.campaigns_id,
                                discount_des: `${campaign.discount}% Off on ${categoryNames}`,
                            });
                            return campaignDiscounts.push(calByCateType * (campaign.discount / 100));

                        case DiscountParameter.Points:
                            const calTotal = items.reduce((total, item) => total + item.item_price, 0);
                            const fixedAmount = campaign.fixed_amount ?? 0;
                            const amountPercent = calTotal * fixedAmount;
                            const discount = campaign.discount > amountPercent ? amountPercent : campaign.discount;
                            campaignDescription.push({
                                campaigns_id: campaign.campaigns_id,
                                discount_des: `${discount} Points`,
                            });
                            return campaignDiscounts.push(discount);
                        default:
                            return campaignDiscounts.push(0);
                    }
                } else if (campaign.campaigns_category_name === CampaignsCategory.Seasonal) {
                    switch (campaign.parameters) {
                        case DiscountParameter.EveryXTHBDiscountYTHB:
                            const calTotal = items.reduce((total, item) => total + item.item_price, 0);
                            const fixedAmount = campaign.fixed_amount ?? 0;
                            const discount = Math.floor(calTotal / fixedAmount) * campaign.discount;
                            campaignDescription.push({
                                campaigns_id: campaign.campaigns_id,
                                discount_des: `${campaign.discount} THB at every ${fixedAmount} THB`,
                            });
                            return campaignDiscounts.push(discount);
                        default:
                            return campaignDiscounts.push(0);
                    }
                } else {
                    campaignDescription.push({
                        campaigns_id: campaign.campaigns_id,
                        discount_des: `No Campaigns available`,
                    });
                    return campaignDiscounts.push(0);
                }
            }
            
        });
    }

    const totalDiscount = campaignDiscounts.reduce((total, discount) => total + discount, 0);

    const campaignsList = campaigns.map((campaign) => {
        const desc = campaignDescription.find((text) => text.campaigns_id === campaign.campaigns_id);
        return {
            campaigns_id: campaign.campaigns_id,
            campaigns_name: campaign.campaigns_name,
            campaigns_des: campaign.campaigns_des,
            parameters: campaign.parameters,
            discount_des: desc ? desc.discount_des : "",
        };
    });

    const itemList = items.map((item) => {
        return {
            item_id: item.item_id,
            item_name: item.item_name,
            item_des: item.item_des,
            quantity: item.quantity,
            item_price: item.item_price,
        };
    });

    const response = {
        campaigns_list: campaignsList,
        items_in_cart: itemList,
        total_discount: haveCampaigns ? totalDiscount : 0,
        total_price: haveCampaigns ? beforeDiscount - totalDiscount : beforeDiscount,
        currency_type: currency_type,
    };

    return response;
};
