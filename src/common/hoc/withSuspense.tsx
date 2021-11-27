import React from "react";
import { Spin } from "antd";

export const CenteredSpin = <Spin className="centered z-10000" size="large" />;

export function withSuspense<P>(Component: React.ComponentType<P>) {
  return (props: P) => <React.Suspense fallback={CenteredSpin}><Component {...props} /></React.Suspense>;
}