import type { FC } from 'react';

// MUI
import { Box } from '@mui/material';

// Router
import { Outlet } from 'react-router';

const DashboardLayout: FC = () => {
    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <Outlet />
        </Box>
    );
};

export default DashboardLayout;