"use client";

import { Button, Card, Flex, Result, theme } from "antd";
import { ProfileOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useRegistrationStore } from "@/stores/registrationStore";

export const Home = () => {
    const { token } = theme.useToken();
    const router = useRouter();
    const { submissionId } = useRegistrationStore();

    const handleStep = useCallback(() => {
        router.push("/register/1");
    }, [router]);

    return (
        <Flex justify="center" align="center">
            <Card>
                <Result
                    icon={<ProfileOutlined style={{ color: token.colorPrimary }} />}
                    title="Bem-vindo ao Sistema de Cadastro"
                    subTitle="Para continuar, precisamos de algumas informações. O processo é rápido e dividido em etapas simples para facilitar."
                    extra={
                        <Button onClick={handleStep} type="primary" size="large">
                            {submissionId ? 'Continuar Cadastro' : 'Iniciar Cadastro'}
                        </Button>
                    }
                />
            </Card>
        </Flex>
    );
}