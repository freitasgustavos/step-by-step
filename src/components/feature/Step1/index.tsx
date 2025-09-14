'use client';

import { Col, Form, Row } from 'antd';
import { useRegistrationStore } from '@/stores/registrationStore';
import { useRouter } from 'next/navigation';
import { IdentificationData } from '@/types/registration';
import { useSaveStep } from '@/hooks/useSaveStep';
import { useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function Step1() {
    const [form] = Form.useForm();
    const router = useRouter();
    const { setIdentificationData, setSubmissionId, submissionId, identification: initialValues } = useRegistrationStore();
    const { mutate, data, isPending, isSuccess } = useSaveStep();

    const onFinish = useCallback((values: IdentificationData) => {
        mutate({
            step: 1,
            data: values,
            submissionId,
        });
    }, [mutate, submissionId]);

    useEffect(() => {
        if (isSuccess) {
            setIdentificationData(data.form_data as unknown as IdentificationData);
            setSubmissionId(data.id);
            router.push('/register/2');
        }
    }, [isSuccess, router, setIdentificationData, data, setSubmissionId]);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [form, initialValues]);

    return (
        <Form
            size='large'
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Nome Completo"
                name="name"
                rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
            >
                <Input placeholder="Digite seu nome completo" />
            </Form.Item>
            <Form.Item
                label="Seu melhor e-mail"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Por favor, insira um e-mail válido!' }]}
            >
                <Input type='email' placeholder="exemplo@email.com" />
            </Form.Item>
            <Form.Item>
                <Row>
                    <Col xs={24} md={4}>
                        <Button loading={isPending} block htmlType="submit" >
                            Avançar
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
}