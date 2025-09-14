'use client';

import { Descriptions, Space, Row, Col } from 'antd';
import { useRegistrationStore } from '@/stores/registrationStore';
import { useRouter } from 'next/navigation';
import { formatCep, formatDocument, formatPhone } from '@/utils';
import { useCallback, useEffect } from 'react';
import { useCompleteStep } from '@/hooks/useCompleteStep';
import { Button } from '@/components/ui/Button';

export function Step5() {
    const router = useRouter();
    const data = useRegistrationStore((state) => state);
    const { mutate: completeStep, isPending, isSuccess } = useCompleteStep();

    const handleGoBack = useCallback(() => {
        router.push('/register/4');
    }, [router]);

    useEffect(() => {
        if (isSuccess) {
            router.push('/register/success');
        }
    }, [isSuccess, router]);

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Descriptions title="Dados de Identificação" bordered column={1}>
                <Descriptions.Item label="Nome">{data.identification?.name}</Descriptions.Item>
                <Descriptions.Item label="E-mail">{data.identification?.email}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="Documento e Contato" bordered column={1}>
                <Descriptions.Item label="Documento">{formatDocument(data.document?.document)}</Descriptions.Item>
                <Descriptions.Item label="Telefone">{formatPhone(data.contact?.phone)}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="Endereço" bordered column={1}>
                <Descriptions.Item label="CEP">{formatCep(data.address?.cep)}</Descriptions.Item>
                <Descriptions.Item label="Rua">{`${data.address?.street ?? ''}, ${data.address?.number ?? ''}`}</Descriptions.Item>
                <Descriptions.Item label="Bairro">{data.address?.neighborhood}</Descriptions.Item>
                <Descriptions.Item label="Cidade/Estado">{`${data.address?.city ?? ''} / ${data.address?.state ?? ''}`}</Descriptions.Item>
            </Descriptions>

            <Row gutter={[16, 16]}>
                <Col xs={24} md={4}>
                    <Button loading={isPending} block onClick={() => completeStep()}>
                        Concluir
                    </Button>
                </Col>
                <Col xs={24} md={4}>
                    <Button loading={isPending} block type="default" onClick={handleGoBack}  >
                        Voltar
                    </Button>
                </Col>
            </Row>
        </Space>
    );
}