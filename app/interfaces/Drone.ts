import {GeoType} from "@/app/interfaces/GeoType";

interface DroneType {
    _id: string;
    name: string;
    status: string; //available, waiting, ready, delivering, pending, returning
    coordinates: GeoType;
}

export { DroneType };