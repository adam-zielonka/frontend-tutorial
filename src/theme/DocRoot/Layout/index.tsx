import React from 'react';
import type {Props} from '@theme/DocRoot/Layout';

export default function DocRootLayout(props: Props) {
  return <div className="lesson-root">{props.children}</div>;
}
