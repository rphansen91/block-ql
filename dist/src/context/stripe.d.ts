export declare function createCheckoutSession({ billing_address_collection, payment_method_types, line_items }: any): Promise<{
    session: string;
}>;
