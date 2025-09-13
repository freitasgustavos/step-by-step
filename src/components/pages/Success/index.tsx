"use client";

import { useCallback, useEffect } from 'react';
import { Button, Card, Flex, Result } from 'antd';
import { useRouter } from 'next/navigation';
import { useRegistrationStore } from '@/stores/registrationStore';

export default function Success() {
    const resetStore = useRegistrationStore((state) => state.reset);
    const router = useRouter();

    const handleHome = useCallback(() => {
        router.push("/");
    }, [router]);

    useEffect(() => {
        resetStore();
    }, [resetStore]);

    return (
        <Flex justify="center" align="center">
            <Card>
                <Result
                    status={"success"}
                    title="Cadastro Concluído com Sucesso!"
                    subTitle="Seu registro foi finalizado. Em breve você receberá mais informações no seu e-mail."
                    extra={
                        <Button onClick={handleHome} type="primary" size="large">
                            Ir para a Home
                        </Button>
                    }
                />
            </Card>
        </Flex>
    );
}