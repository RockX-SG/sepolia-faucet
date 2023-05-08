'use client';

import { ConfigProvider } from '@arco-design/web-react';
import { ComponentConfig } from '@arco-design/web-react/es/ConfigProvider/interface';
import enUS from '@arco-design/web-react/lib/locale/en-US';
import consolev from 'consolev';
import { ReactNode, useEffect, useMemo } from 'react';
import Script from 'next/script';

export default function Provider({ children }: { children: ReactNode }) {
  useEffect(() => {
    consolev(
      `${process.env.NEXT_PUBLIC_NAME}@${process.env.NEXT_PUBLIC_VERSION}`,
      process.env.NEXT_PUBLIC_SHA
    );
  }, []);
  const componentConfig = useMemo<ComponentConfig>(
    () => ({
      Tooltip: {
        className: '[&_.arco-tooltip-content]:rounded-lg',
      },
      Popover: {
        className:
          '[&_.arco-popover-content]:rounded-lg [&_.arco-popover-content]:border-transparent max-w-none',
      },
    }),
    []
  );
  return (
    <ConfigProvider locale={enUS} componentConfig={componentConfig}>
      {children}
    </ConfigProvider>
  );
}
