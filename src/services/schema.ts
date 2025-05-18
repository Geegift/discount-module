export enum DiscountParameter {
    Amount = "Amount",
    Percentage = "Percentage",
    Points = "Points",
    EveryXTHBDiscountYTHB = "Every X THB Discount Y THB",
}

export enum CampaignsCategory {
    Coupon = "Coupon",
    OnTop = "On Top",
    Seasonal = "Seasonal",
}

export enum ItemCateType {
    Clothing = "Clothing",
    Accessories = "Accessories",
    Electronics = "Electronics",
}

export enum CurrencyType {
    THB = "THB",
    USD = "USD",
}

export const campaignsCategory = [
    {
        campaigns_category_id: "CPC001",
        campaigns_category_name: CampaignsCategory.Coupon,
        priority: 1,
    },
    {
        campaigns_category_id: "CPC002",
        campaigns_category_name: CampaignsCategory.OnTop,
        priority: 2,
    },
    {
        campaigns_category_id: "CPC003",
        campaigns_category_name: CampaignsCategory.Seasonal,
        priority: 3,
    },
];

export const itemsCategory = [
    {
        item_category_id: "C001",
        item_category_name: ItemCateType.Clothing,
    },
    {
        item_category_id: "C002",
        item_category_name: ItemCateType.Accessories,
    },
    {
        item_category_id: "C003",
        item_category_name: ItemCateType.Electronics,
    },
];

export const itemsSchema = [
    {
        item_id: 1,
        item_name: "T-Shirt",
        item_des: "T-Shirt",
        quantity: 1,
        item_price: 350,
        item_category_id: "C001",
    },
    {
        item_id: 2,
        item_name: "Hat",
        item_des: "Hat",
        quantity: 1,
        item_price: 250,
        item_category_id: "C002",
    },
    {
        item_id: 3,
        item_name: "Watch",
        item_des: "Watch",
        quantity: 1,
        item_price: 850,
        item_category_id: "C003",
    },
    {
        item_id: 4,
        item_name: "Bag",
        item_des: "Bag",
        quantity: 1,
        item_price: 640,
        item_category_id: "C002",
    },
    {
        item_id: 5,
        item_name: "Belt",
        item_des: "Belt",
        quantity: 1,
        item_price: 230,
        item_category_id: "C002",
    },
    {
        item_id: 6,
        item_name: "Hoodie",
        item_des: "Hoodie",
        quantity: 1,
        item_price: 700,
        item_category_id: "C001",
    },
    // {
    //     item_id: 88,
    //     item_name: "Special Gift",
    //     item_des: "Special Gift",
    //     quantity: 1,
    //     item_price: 100,
    //     item_category_id: "Special",
    // },
];

export const campaignsSchema = [
    {
        campaigns_id: "CP001",
        campaigns_name: "Fixed amount",
        campaigns_category_id: "CPC001",
        campaigns_des: "Discounts the entire cart by subtracting an amount from the total price",
        parameters: DiscountParameter.Amount,
        discount: 50,
        fixed_amount: 0,
        discount_des: "{discount}THB",
        group_item_category_id: [],
    },
    {
        campaigns_id: "CP002",
        campaigns_name: "Percentage discount",
        campaigns_category_id: "CPC001",
        campaigns_des: "Discounts the entire cart by subtracting a percentage from the total price",
        parameters: DiscountParameter.Percentage,
        discount: 10,
        fixed_amount: 0,
        discount_des: "{discount}% ",
        group_item_category_id: [],
    },
    {
        campaigns_id: "CP003",
        campaigns_name: "Percentage discount by item category",
        campaigns_category_id: "CPC002",
        campaigns_des: "Discount the entire amount of a specific category of items in cart",
        parameters: DiscountParameter.Amount, //Category (Clothing,Accessories, Electronics)
        discount: 15,
        fixed_amount: 0,
        discount_des: "{discount}% Off on {item_category_name}",
        group_item_category_id: ["C001"],
    },
    {
        campaigns_id: "CP004",
        campaigns_name: "Discount by points",
        campaigns_category_id: "CPC002",
        campaigns_des:
            "Users spent points for a fixed amount of discount (1 point = 1 THB). The amount will be capped at 20% of total price",
        parameters: DiscountParameter.Points, //Noted that “20%” is fixed rule
        discount: 68,
        fixed_amount: 20, //total price*20/100,
        discount_des: "{discount} Points",
        group_item_category_id: [],
    },
    {
        campaigns_id: "CP005",
        campaigns_name: "Special campaigns",
        campaigns_category_id: "CPC003",
        campaigns_des: "From the total price, at every X THB, subtracting a fixed amount Y THB",
        parameters: DiscountParameter.EveryXTHBDiscountYTHB,
        discount: 40,
        fixed_amount: 300,
        discount_des: "{discount} THB at every {fixed_amount} THB", // (total price/fixed_amount)*discount
        group_item_category_id: [],
    },
];
