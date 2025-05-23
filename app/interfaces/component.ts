import Icon from "@/app/utils/Icon";
import {BodySize, TitleSize} from "@/app/utils/Typography";

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

interface MenuBarProps {
    activeTab: string;
    onTabPress: (tab: string) => void;
}

interface ProfileButtonProps {
    text: string;
    icon: typeof Icon[keyof typeof Icon];
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

export { inputProps, SubmitButtonProps, CategoryButtonProps, MenuBarProps, ProfileButtonProps,AccountProps, TitleProps, BodyProps }