interface inputProps{
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    disabled?: boolean;
}

interface SubmitButtonProps {
    text: string;
    onPress: () => void;
}

interface CategoryButtonProps {
    icon: string;
    text: string;
}

export { inputProps, SubmitButtonProps, CategoryButtonProps }