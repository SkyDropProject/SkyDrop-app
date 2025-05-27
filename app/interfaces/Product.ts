import { CategoryType } from './Category';

interface ProductType {
    _id?: string;
    image: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    weight: number;
    categoryId: CategoryType | string;
}

export { ProductType };