import { Button as ButtonAntd, ButtonProps } from "antd";

export const Button = (props: ButtonProps) => {
    return (
        <ButtonAntd
            type="primary"
            size="large"
            {...props}
        >
            {props.children}
        </ButtonAntd>
    );
}
