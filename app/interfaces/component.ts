import { ProductType } from '@/app/interfaces/Product';
import Icon from '@/app/utils/Icon';
import { BodySize, TitleSize } from '@/app/utils/Typography';
import { OrderType } from '@/app/interfaces/Order';

interface inputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    disabled?: boolean;
    small?: boolean;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
    mode?: 'text' | 'date';
}

interface SubmitButtonProps {
    text: string;
    onPress: () => void;
}

interface CategoryButtonProps {
    icon: (typeof Icon)[keyof typeof Icon];
    text?: string;
    onPress: () => void;
}

interface MenuBarProps {
    activeTab: string;
    onTabPress: (tab: string) => void;
}

interface ProfileButtonProps {
    text: string;
    icon: (typeof Icon)[keyof typeof Icon];
    onPress?: () => void;
}

interface AccountProps {
    name: string;
    email: string;
}

interface TitleProps {
    size: keyof typeof TitleSize;
    text: string;
}

interface BodyProps {
    size: keyof typeof BodySize;
    text: string;
}

interface QuantityButtonProps {
    icon: (typeof Icon)[keyof typeof Icon];
    onPress: () => void;
    disabled?: boolean;
}

interface LikeButtonProps {
    isLiked: boolean;
    onPress: () => void;
}

interface QuantityComponentProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
    loading: boolean;
    min?: number;
}

interface ProductDetailProps {
    product: ProductType;
    onClose: () => void;
}

interface LinkButtonProps {
    text: string;
    onPress?: () => void;
}

interface DateInputProps {
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

interface LoginTabProps {
    onPress: () => void;
    onSubmit: (token: string) => void;
}

interface InscriptionTabProps {
    onPress: () => void;
    onSubmit: () => void;
}

interface SearchBarProps {
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
}

interface ProductCartCardProps {
    product: ProductType & { quantity?: number };
    onIncrease?: (productId: string) => void;
    onDecrease?: (productId: string) => void;
    loading: boolean;
    disabled?: boolean;
}

interface MapPickerProps {
    onClose: () => void;
    onOpen?: () => void;
}

interface inputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    disabled?: boolean;
    small?: boolean;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
    mode?: 'text' | 'date';
    onSubmitEditing?: () => void;
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
}

interface DeliveryPositionPickerProps {
    position: string;
    onPress: () => void;
}

interface DroneTabProps {
    order: OrderType;
    visible: boolean;
}

interface StatusBarsProps {
    status: 0 | 1 | 2;
}
interface AnimatedBarsProps {
    active: boolean;
}
interface CurrentOrderIndicatorProps {
    onPress: () => void;
}
export {
    inputProps,
    SubmitButtonProps,
    CategoryButtonProps,
    MenuBarProps,
    ProfileButtonProps,
    AccountProps,
    TitleProps,
    BodyProps,
    QuantityButtonProps,
    LikeButtonProps,
    QuantityComponentProps,
    ProductDetailProps,
    LinkButtonProps,
    DateInputProps,
    LoginTabProps,
    InscriptionTabProps,
    SearchBarProps,
    ProductCartCardProps,
    MapPickerProps,
    DeliveryPositionPickerProps,
    DroneTabProps,
    StatusBarsProps,
    AnimatedBarsProps,
    CurrentOrderIndicatorProps,
};
