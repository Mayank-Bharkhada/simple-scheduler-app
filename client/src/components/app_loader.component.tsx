// MUI
import { Grid } from '@mui/material';

// Components
import LottieAnimation from './lottie_animation.component';

// Assets
import Loader from '../assets/json/AppLoader.json';

// TSX Component
const AppLoader = () => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100%', width: '100%' }}
        >
            <Grid >
                <LottieAnimation animationData={Loader} height={100} width={100} autoplay={true} loop={true} />
            </Grid>
        </Grid>
    );
};

export default AppLoader;
