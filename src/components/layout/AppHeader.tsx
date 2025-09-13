'use client';

import { Grid, Layout, Typography, theme } from 'antd';
import Link from 'next/link';

const { Header } = Layout;

export function AppHeader() {
    const screens = Grid.useBreakpoint();
    const { token } = theme.useToken();

    return (
        <Header style={{
            display: 'flex',
            justifyContent: screens.md ? 'flex-start' : 'center',
            alignItems: 'center',
            background: '#fff',
            borderBottom: '1px solid #f0f0f0'
        }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <Typography.Title
                    level={4}
                    style={{ margin: 0, color: token.colorPrimary }}
                >
                    Sistema de Cadastro
                </Typography.Title>
            </Link>
        </Header>
    );
}