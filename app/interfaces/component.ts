import Icon from "@/app/utils/Icon";

interface inputProps{
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    disabled?: boolean;
    secureTextEntry? : boolean;
}

interface SubmitButtonProps {
    text: string;
    onPress: () => void;
}

interface CategoryButtonProps {
    icon: typeof Icon[keyof typeof Icon];
    text?: string;
}

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    icon: typeof Icon[keyof typeof Icon];
}

interface MenuBarProps {
    activeTab: string;
    onTabPress: (tab: string) => void;
}

export { inputProps, SubmitButtonProps, CategoryButtonProps, ProductCardProps, MenuBarProps }