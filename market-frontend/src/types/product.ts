export interface productCard {
    uuid: string;
    title: string;
    description: string | null;
    images: string[] | null;
    header_image: string | null;
    price: string | null;
    ozon_price: string | null;
    wb_price: string | null;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
}