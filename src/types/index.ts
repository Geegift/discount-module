export interface CampaignsCategory {
    campaigns_category_id: number;
    campaigns_category_name: string;
    priority: number;
}

export interface ItemCategory {
    item_category_id: number;
    item_category_name: string;
}

export interface Campaigns {
    key?: number;
    campaigns_id?: string;
    campaigns_name?: string;
    campaigns_category_id?: string;
    campaigns_category_name?: string;
    campaigns_des?: string;
    parameters?: string;
    discount?: number;
    fixed_amount?: number;
    discount_des?: string;
    group_item_category_id?: Array<string>;
    campaigns_category_priority?: number;
}

export interface CartItem {
    key?: number;
    item_id: number;
    item_name?: string;
    item_price: number;
    item_des?: string;
    item_category_id?: string;
    item_category_name?: string;
    quantity: number;
}

export interface Cart {
    campaigns_list?: Array<Campaigns>|Array<string>;
    items_in_cart?: Array<CartItem>;
    total_discount?: number;
    total_price?: number;
    discount_des?: Array<string>;
    currency_type?: string;
}
