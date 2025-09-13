"use client";

import { Layout } from "antd";
import { AppHeader } from "./AppHeader";
import { ClientOnly } from "../ui/ClientOnly";

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
            </Layout>
        </ClientOnly>
    );
}