'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Form, InputRef, Row, Switch } from 'antd';
import { useRouter } from 'next/navigation';
import { PatternFormat } from "react-number-format";
import { useRegistrationStore } from '@/stores/registrationStore';
import { DocumentData } from '@/types/registration';
import { useSaveStep } from '@/hooks/useSaveStep';
import { onlyNumbers } from '@/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const cpfMask = "###.###.###-##";
const cnpjMask = "##.###.###/####-##";

export function Step2() {
    const [form] = Form.useForm();
    const router = useRouter();
    const { setDocumentData, document: initialValues, submissionId } = useRegistrationStore();
    const inputRef = useRef<InputRef>(null);
    const { mutate, data, isPending, isSuccess } = useSaveStep();
    const [mask, setMask] = useState(cpfMask);
    const [checked, setChecked] = useState(false);

    const onFinish = useCallback((values: DocumentData) => {
        const numericDocument = onlyNumbers(values.document);
        mutate({
            step: 2,
            data: { document: numericDocument },
            submissionId: submissionId,
        });
    }, [mutate, submissionId]);

    const handleGoBack = useCallback(() => {
        router.push('/register/1');
    }, [router]);

    useEffect(() => {
        if (isSuccess) {
            setDocumentData(data.form_data as unknown as DocumentData);
            router.push('/register/3');
        }
    }, [isSuccess, router, data, setDocumentData]);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            if (initialValues.document && initialValues.document.length > 11) {
                setChecked(true);
                setMask(cnpjMask);
            } else {
                setChecked(false);
                setMask(cpfMask);
            }
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
                label={
                    <Switch
                        checked={checked}
                        checkedChildren="CNPJ"
                        unCheckedChildren="CPF"
                        onChange={(checked) => setMask(checked ? cnpjMask : cpfMask)}
                        onClick={() => setChecked(!checked)}
                    />
                }
                name="document"
                rules={[{ required: true, message: 'Por favor, insira seu documento!' }]}
            >
                <PatternFormat
                    key={mask}
                    getInputRef={inputRef}
                    mask="_"
                    format={mask}
                    allowEmptyFormatting
                    placeholder="Digite seu CPF ou CNPJ"
                    allowClear
                    customInput={Input}
                />
            </Form.Item>
            <Form.Item>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={4}>
                        <Button loading={isPending} block htmlType="submit" >
                            Avançar
                        </Button>
                    </Col>
                    <Col xs={24} md={4}>
                        <Button loading={isPending} block type="default" onClick={handleGoBack}  >
                            Voltar
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
}