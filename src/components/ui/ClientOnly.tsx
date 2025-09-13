'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Loading } from './Loading';

interface ClientOnlyProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = <Loading /> }: ClientOnlyProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return fallback;
    }

    return <Fragment>{children}</Fragment>;
}