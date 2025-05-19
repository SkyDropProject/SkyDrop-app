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

export { inputProps, SubmitButtonProps }