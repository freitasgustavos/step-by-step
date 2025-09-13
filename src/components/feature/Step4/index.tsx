'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button, Form, Input, Spin, Row, Col, InputRef, App } from 'antd';
import { useRouter } from 'next/navigation';
import { PatternFormat } from "react-number-format";

import { useRegistrationStore } from '@/stores/registrationStore';
import { AddressData } from '@/types/registration';
import { useSaveStep } from '@/hooks/useSaveStep';
import { cepService } from '@/services/cepService';
import { onlyNumbers } from '@/utils';

export function Step4() {
    const { notification } = App.useApp();
    const router = useRouter();
    const [form] = Form.useForm();
    const { setAddressData, address: initialValues, submissionId } = useRegistrationStore();
    const [isCepPending, setIsCepPending] = useState(false);
    const { mutate, data, isPending, isSuccess } = useSaveStep();

    const inputRef = useRef<InputRef>(null);
    const numberInputRef = useRef<InputRef>(null);

    const handleSearchCep = useCallback(async (event: React.FocusEvent<HTMLInputElement>) => {
        const cep = onlyNumbers(event.target.value);
        if (cep.length === 8) {
            try {
                setIsCepPending(true);
                const response = await cepService(cep);

                form.setFieldsValue({
                    street: response.street,
                    neighborhood: response.neighborhood,
                    city: response.city,
                    state: response.state,
                });

            } catch (error) {
                notification.error({
                    message: 'Erro ao buscar CEP',
                    description: error instanceof Error ? error.message : 'Ocorreu um erro ao buscar o CEP.',
                })
                form.resetFields();
            } finally {
                setIsCepPending(false);
                numberInputRef.current?.select();
            }
        }
    }, [form, notification]);

    const onFinish = useCallback((values: AddressData) => {
        const numericCep = onlyNumbers(values.cep);
        mutate({
            step: 4,
            data: { ...values, cep: numericCep },
            submissionId: submissionId,
        });
    }, [mutate, submissionId]);

    const handleGoBack = useCallback(() => {
        router.push('/register/3');
    }, [router]);

    useEffect(() => {
        if (isSuccess) {
            setAddressData(data.form_data as unknown as AddressData);
            router.push('/register/5');
        }
    }, [isSuccess, router, data, setAddressData]);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [form, initialValues]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <Form size="large" form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label="CEP" name="cep" rules={[{ required: true, message: 'CEP é obrigatório' }]}>
                        <PatternFormat
                            getInputRef={inputRef}
                            onChange={handleSearchCep}
                            mask="_"
                            format="#####-###"
                            placeholder="00000-000"
                            max={9}
                            customInput={Input}
                            allowClear
                            addonAfter={isCepPending ? <Spin size="small" /> : null}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={18}>
                    <Form.Item label="Rua / Logradouro" name="street" rules={[{ required: true, message: 'Rua é obrigatória' }]}>
                        <Input disabled={isCepPending} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={6}>
                    <Form.Item label="Número" name="number" rules={[{ required: true, message: 'Número é obrigatório' }]}>
                        <Input ref={numberInputRef} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24}>
                    <Form.Item label="Bairro" name="neighborhood" rules={[{ required: true, message: 'Bairro é obrigatório' }]}>
                        <Input disabled={isCepPending} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="Cidade" name="city" rules={[{ required: true, message: 'Cidade é obrigatória' }]}>
                        <Input disabled={isCepPending} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="Estado" name="state" rules={[{ required: true, message: 'Estado é obrigatório' }]}>
                        <Input disabled={isCepPending} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} >
                    <Form.Item label="Complemento" name="complement">
                        <Input disabled={isCepPending} />
                    </Form.Item>
                </Col>
            </Row>

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