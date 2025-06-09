import type { FC, LazyExoticComponent, ReactNode } from "react";

export type LottieAnimationProps = {
    animationData: object;
    height?: number;
    width?: number;
    loop?: boolean; 
    autoplay?: boolean;
}

export type LoadableProps = {
    Component: LazyExoticComponent<FC>,
    FallBackLoader: ReactNode
}