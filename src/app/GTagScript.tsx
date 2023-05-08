'use client';

import Script, { ScriptProps } from 'next/script';
import { useCallback } from 'react';

export default function GTagScript(props: ScriptProps) {
  const onReady = useCallback(() => {
    const { searchParams } = new URL(props.src!);
    const id = searchParams.get('id');
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      if (process.env.NODE_ENV !== 'production') {
        // @ts-ignore
        window.dataLayer.push(arguments);
      } else {
        console.log('gtag', arguments);
      }
    };
    window.gtag('js', new Date());
    window.gtag('config', id!);
  }, [props.src]);

  return <Script {...props} onReady={onReady} />;
}
