import React from 'react';
import type {Props} from '@theme/DocRoot/Layout';

export default function DocRootLayout(props: Props) {
  return <main className="lesson-root" id="__docusaurus_skipToContent_fallback">{props.children}</main>;
}
