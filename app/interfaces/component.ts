import Icon from '@/app/utils/Icon';
import { BodySize, TitleSize } from '@/app/utils/Typography';
import { ProductType } from '@/app/interfaces/Product';

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
}

interface LikeButtonProps {
    isLiked: boolean;
    onPress: () => void;
}

interface QuantityComponentProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
}

interface ProductDetailProps {
    product: ProductType;
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
}

interface InscriptionTabProps {
    onPress: () => void;
    onRegisterSubmit: () => void;
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
};
