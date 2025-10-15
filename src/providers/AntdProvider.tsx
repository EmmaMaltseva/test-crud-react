'use client';
import '@ant-design/v5-patch-for-react-19';
import { ReactNode } from "react";
import { AntdRegistry } from '@ant-design/nextjs-registry';

export function AntdProvider({ children }: { children: ReactNode }) {
  return <AntdRegistry>{children}</AntdRegistry>;
}