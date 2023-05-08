/// <reference types="next-images" />

import { ExternalProvider } from '@ethersproject/providers';
import { SVGProps } from 'react';

declare global {
  interface Window {
    ethereum: ExternalProvider | undefined;
    dataLayer: any;
    gtag: any;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NAME: string;
      NEXT_PUBLIC_VERSION: string;
      NEXT_PUBLIC_DESCRIPTION: string;
      NEXT_PUBLIC_NETWORK: string;
    }
  }
  module '*.svg' {
    export const ReactComponent: React.FC<
      SVGProps<SVGSVGElement> & { title?: string }
    >;

    const src: string;
    export default src;
  }
}
