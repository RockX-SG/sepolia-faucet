'use client';

import importAsync from '@/utils/importAsync';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const PageHeader = dynamic(() => importAsync('shared', './PageHeader'), {
  ssr: false,
  loading(loadingProps) {
    return <div className={classNames('bg-[#101A3D] h-16')}>&nbsp;</div>;
  },
});
const PageFooter = dynamic(() => importAsync('shared', './PageFooter'), {
  ssr: false,
  loading(loadingProps) {
    return <div className={classNames('bg-[#101A3D] h-80')}>&nbsp;</div>;
  },
});

export { PageHeader, PageFooter };
