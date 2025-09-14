"use client";

import { useCallback } from 'react';
import { Flex, Result } from 'antd';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
    const router = useRouter();

    const handleHome = useCallback(() => {
        router.push("/");
    }, [router]);

    return (
        <Flex justify="center" align="center">
            <Result
                status={"404"}
                title="404"
                subTitle="Desculpe, a página que você está procurando não existe."
                extra={
                    <Button onClick={handleHome}>
                        Ir para a Home
                    </Button>
                }
            />
        </Flex>
    );
}