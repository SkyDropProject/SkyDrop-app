import { ProductType } from '@/app/interfaces/Product';
import { GeoType } from '@/app/interfaces/GeoType';
import { DroneType } from '@/app/interfaces/Drone';
import { User } from '@/app/interfaces/User';

interface OrderType {
    _id?: string;
    userId: User | string;
    droneId: DroneType;
    dateOrder: Date;
    status: string;
    products: ProductType[];
    deliveryCoordinates: GeoType;
    price: number;
}

export { OrderType };
