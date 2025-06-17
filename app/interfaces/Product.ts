interface ProductType {
    _id: string;
    imageUrl: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    weight: number;
    categoryId: string;
    quantity?: number;
}

export { ProductType };
