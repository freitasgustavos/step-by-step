import { Input as InputAntd, InputProps, InputRef } from "antd";

interface Props extends InputProps {
    ref?: React.Ref<InputRef>;
}

export const Input = ({ ref, ...props }: Props) => {
    return <InputAntd
        variant="filled"
        allowClear
        size="large"
        ref={ref}
        {...props}
    />;
}
