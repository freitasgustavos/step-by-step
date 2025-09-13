"use client";

import { Step1 } from "@/components/feature/Step1";
import { Step2 } from "@/components/feature/Step2";
import { Step3 } from "@/components/feature/Step3";
import { Step4 } from "@/components/feature/Step4";
import { Step5 } from "@/components/feature/Step5";

import { useRegistrationStore } from "@/stores/registrationStore";
import { Card, Col, Flex, Grid, Row, Steps, Typography } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

const { useBreakpoint } = Grid;

export function StepsPage() {
    const router = useRouter();
    const params = useParams();
    const screens = useBreakpoint();
    const formData = useRegistrationStore((state) => state);

    const stepString = Array.isArray(params.step) ? params.step[0] : params.step;
    const currentStep = parseInt(stepString || '1', 10);

    const renderStepContent = useCallback(() => {
        switch (currentStep) {
            case 1: return <Step1 />;
            case 2: return <Step2 />;
            case 3: return <Step3 />;
            case 4: return <Step4 />;
            case 5: return <Step5 />;
            default:
                if (typeof window !== 'undefined') {
                    router.replace('/register/1');
                }
                return null;
        }
    }, [currentStep, router]);

    const isStepCompleted = useCallback((stepIndex: number) => {
        if (stepIndex === 0) return true;
        if (stepIndex === 1) return !!formData.identification;
        if (stepIndex === 2) return !!formData.document;
        if (stepIndex === 3) return !!formData.contact;
        if (stepIndex === 4) return !!formData.address;
        return false;
    }, [formData]);

    const handleStepChange = useCallback((step: number) => {
        const targetStep = step + 1;
        if (isStepCompleted(step)) {
            router.push(`/register/${targetStep}`);
        }
    }, [isStepCompleted, router]);

    const stepsConfig = useMemo(() => [
        { title: 'Identificação' },
        { title: 'Documento' },
        { title: 'Contato' },
        { title: 'Endereço' },
        { title: 'Revisão' },
    ], []);

    const firstIncompleteStep = useMemo(() => {
        for (let i = 0; i < stepsConfig.length; i++) {
            if (!isStepCompleted(i)) {
                return i;
            }
        }
        return stepsConfig.length;
    }, [isStepCompleted, stepsConfig]);

    useEffect(() => {
        if (currentStep > firstIncompleteStep) {
            router.replace(`/register/${firstIncompleteStep}`);
        }
    }, [currentStep, firstIncompleteStep, router]);

    return (
        <Row justify="center" align="middle">
            <Col xs={24} sm={24} md={24} xl={18}>
                {screens.sm ? (
                    <Steps
                        current={currentStep - 1}
                        items={stepsConfig}
                        onChange={handleStepChange}
                        style={{ marginBottom: '40px' }}
                        direction='horizontal'
                    />
                ) : (
                    <Flex justify="center" align="center" style={{ marginBottom: '20px' }}>
                        <Typography.Text strong style={{ fontSize: '16px' }}>
                            Etapa {currentStep} de {stepsConfig.length}
                        </Typography.Text>
                    </Flex>
                )}

                <Card>
                    <Flex align="center" justify="center">
                        <Typography.Title level={3}>
                            {stepsConfig[currentStep - 1]?.title || 'Cadastro'}
                        </Typography.Title>
                    </Flex>
                    {renderStepContent()}
                </Card>
            </Col>
        </Row>
    );
}
