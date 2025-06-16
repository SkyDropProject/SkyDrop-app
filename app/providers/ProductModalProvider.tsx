import React, { createContext, useContext, useState } from 'react';
import { Modal } from 'react-native';

import ProductDetail from '@/app/components/ProductDetail';
import { ProductType } from '@/app/interfaces/Product';

interface ProductModalContextType {
    showProduct: (product: ProductType) => void;
    hideProduct: () => void;
};

const ProductModalContext = createContext<ProductModalContextType | undefined>(undefined);

export const useProductModal = (): ProductModalContextType => useContext(ProductModalContext)!;

export const ProductModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [product, setProduct] = useState<ProductType | null>(null);

    const showProduct  = (p: ProductType) : void => setProduct(p);
    const hideProduct  = (): void => setProduct(null);

    return (
        <ProductModalContext.Provider value={{ showProduct, hideProduct }}>
            {children}
            <Modal visible={!!product} animationType="slide" transparent>
                {product && <ProductDetail product={product} onClose={hideProduct} />}
            </Modal>
        </ProductModalContext.Provider>
    );
};