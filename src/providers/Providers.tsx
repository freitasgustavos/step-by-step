'use client';

import { ConfigProvider, App } from "antd";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import AntdRegistry from "@/lib/AntdRegistry";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <AntdRegistry>
            <ConfigProvider>
                <App>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </App>
            </ConfigProvider>
        </AntdRegistry>
    );
}