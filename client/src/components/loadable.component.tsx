import { type JSX, Suspense } from 'react';
import type { LoadableProps } from '../types/lottie.type';

const Loadable = (
  {Component, FallBackLoader} : LoadableProps
) => (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={FallBackLoader}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
