// MUI
import { Button, Grid } from "@mui/material"

// ROUTER
import { useNavigate } from "react-router";

const Home = () => {

    const navigate = useNavigate();

    return (
        <Grid container gap={2} justifyContent="center" alignItems={"center"}>
            <Grid>

                <Button variant="contained" onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                </Button>
            </Grid>
            <Grid>
                <Button variant="contained" onClick={() => navigate('/campaign')}>
                    Go to Campaign
                </Button>
            </Grid>
        </Grid>
    )
}

export default Home;