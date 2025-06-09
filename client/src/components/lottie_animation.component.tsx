import React from 'react';

// MUI
import {  Grid } from '@mui/material';

// Lottie
import Lottie from "lottie-react";

// Types
import type { LottieAnimationProps } from '../types/lottie.type';


const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData, height = 100, width = 100, loop = true, autoplay = true }) => {
    return (
        <Grid container >
            <Grid sx={{ height, width }} >
                <Lottie
                    animationData={animationData}
                    loop={loop}
                    autoplay={autoplay}
                    rendererSettings={{
                        preserveAspectRatio: 'xMidYMid slice'
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default LottieAnimation;
