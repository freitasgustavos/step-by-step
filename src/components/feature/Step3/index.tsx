'use client';

import { Button, Col, Form, Input, InputRef, Row } from 'antd';
import { PatternFormat } from "react-number-format";
import { useRegistrationStore } from '@/stores/registrationStore';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { ContactData } from '@/types/registration';
import { useSaveStep } from '@/hooks/useSaveStep';
import { onlyNumbers } from '@/utils';

export function Step3() {
    const [form] = Form.useForm();
    const router = useRouter();
    const { setContactData, contact: initialValues, submissionId } = useRegistrationStore();
    const inputRef = useRef<InputRef>(null);
    const { mutate, data, isPending, isSuccess } = useSaveStep();

    const onFinish = useCallback((values: ContactData) => {
        const numericPhone = onlyNumbers(values.phone);
        mutate({
            step: 3,
            data: { phone: numericPhone },
            submissionId: submissionId,
        });
    }, [mutate, submissionId]);

    const handleGoBack = useCallback(() => {
        router.push('/register/2');
    }, [router]);

    useEffect(() => {
        if (isSuccess) {
            setContactData(data.form_data as unknown as ContactData);
            router.push('/register/4');
        }
    }, [isSuccess, router, data, setContactData]);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [form, initialValues]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <Form
            size="large"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
        >
            <Form.Item
                label="Telefone Celular"
                name="phone"
                rules={[
                    { required: true, message: 'Por favor, insira seu telefone!' },
                ]}
            >
                <PatternFormat
                    format="(##) #####-####"
                    mask="_"
                    getInputRef={inputRef}
                    placeholder="(99) 99999-9999"
                    customInput={Input}
                    type='tel'
                    allowClear
                />
            </Form.Item>

            <Form.Item>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={4}>
                        <Button loading={isPending} block type="primary" htmlType="submit" >
                            Avançar
                        </Button>
                    </Col>
                    <Col xs={24} md={4}>
                        <Button loading={isPending} block color='default' variant='filled' onClick={handleGoBack}  >
                            Voltar
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
}