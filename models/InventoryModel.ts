export interface Inventory {
    description: string;
    folio: number;
    id_brand: number;
    id_inventory: number;
    id_model: number;
    id_module: number;
    image_url: string;
    name: string;
    not_located: string | null;
    quantity: number;
    stock: number;
    second_custodian: string | null;
    serie: string;
    status: number;
}