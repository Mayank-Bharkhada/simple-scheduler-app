import type { FC } from 'react';

// MUI
import { Box } from '@mui/material';

// Router
import { Outlet } from 'react-router';

const DashboardLayout: FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto', height: '100vh', width: '100vw' }}>
            <Outlet />
        </Box>
    );
};

export default DashboardLayout;