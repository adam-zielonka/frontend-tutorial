import React from 'react';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
import OriginalNavbar from '@theme-original/Navbar';

export default function Navbar() {
  const {activeDoc} = useActiveDocContext(undefined);
  return activeDoc ? null : <OriginalNavbar />;
}
