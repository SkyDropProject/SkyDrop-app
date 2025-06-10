interface UserCoreData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthdate: number,
    phone: string,
}

interface InscriptionUserPayload extends UserCoreData {
    confirmPassword: string;
}
interface User extends UserCoreData {
    _id?: string;
    registrationDate: Date;
    verificationDate?: Date;
    address: string;
    zip: string;
    city: string;
    accountType: string;
    token?: string;
    stripeId?: string;
    favoriteProductsId: string[];
}

interface LoginPayload {
    email: string;
    password: string;
}

export {
    InscriptionUserPayload,
    User,
    LoginPayload,
};

