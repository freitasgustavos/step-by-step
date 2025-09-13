"use client";

import { Flex, Layout } from "antd";
import { GithubOutlined } from '@ant-design/icons';
import { AppHeader } from "./AppHeader";
import { ClientOnly } from "../ui/ClientOnly";
import Link from "next/link";

interface AppLayoutProps {
    children: React.ReactNode;
}

const { Content } = Layout;

export const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <ClientOnly>
            <Layout style={{ minHeight: '100vh' }}>
                <AppHeader />
                <Content style={{ padding: 24 }}>
                    {children}
                </Content>
                <Layout.Footer style={{ padding: 16 }}>
                    <Flex justify="center" align="center" gap={8}>
                        © {new Date().getFullYear()} By Gustavo Freitas
                        <Link href="https://github.com/freitasgustavos/step-by-step" target="_blank">
                            <GithubOutlined style={{ fontSize: 18 }} />
                        </Link>
                    </Flex>
                </Layout.Footer>
            </Layout>
        </ClientOnly>
    );
}