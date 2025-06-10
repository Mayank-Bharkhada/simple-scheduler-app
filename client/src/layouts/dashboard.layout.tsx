import { type FC, useMemo, useRef, useState } from 'react';

// MUI
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import {
    DashboardCustomize as DashboardCustomizeIcon,
    AccountCircle as AccountCircleIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
} from '@mui/icons-material';

// Toolpad
import { DashboardLayout as ToolpadDashboardLayout, type Navigation, } from '@toolpad/core';
import { ReactRouterAppProvider, } from '@toolpad/core/react-router';

// Router
import { Outlet } from 'react-router';
import { useThemeStore } from '../stores/theme.store';
import { getTheme } from '../theme';
import { useAuthStore } from '../stores/auth.store';
import { useSnackbarStore } from '../stores/snackbar.store';
import { signIn } from '../services/auth.service';



const NAVIGATION: Navigation = [
    {
        kind: "page",
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardCustomizeIcon />,
    }
];

const DashboardLayout: FC = () => {
    const { themeMode, toggleThemeMode } = useThemeStore();
    const { setSnackbar } = useSnackbarStore();
    const { signOut } = useAuthStore();
    const theme = useMemo(() => getTheme(themeMode), [themeMode]);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpenMenu(false);
    };

    const handleSignOut = async () => {
        try {
            const response = await signOut();
            if (response.success) {
                setSnackbar({
                    open: true,
                    message: response.message || "Sign Out Successful",
                    severity: "success",
                });
                setOpenMenu(false);
            }
        } catch (error: unknown) {
            setSnackbar({
                open: true,
                message: (error as Error)?.message ?? "An unexpected error occurred",
                severity: "error",
            });
        }
    };

    return (
        <ReactRouterAppProvider navigation={NAVIGATION} theme={theme} >
            <ToolpadDashboardLayout
                branding={{
                    // logo: "",
                    title: '',
                    homeUrl: '/',
                }}

                slots={{
                    toolbarAccount: () => (
                        <Grid container direction="row" >
                            <Tooltip title="Dark Mode">
                                <IconButton onClick={toggleThemeMode}>
                                    {themeMode === "light" ? <LightModeIcon color='action' /> : <DarkModeIcon color="action" />}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Profile">
                                <IconButton
                                    ref={anchorRef}
                                    onClick={() => setOpenMenu(true)}
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    ),
                }}>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                    <Outlet />
                </Box>
                <Menu
                    elevation={0}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    anchorEl={anchorRef.current}
                    open={Boolean(openMenu)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
            </ToolpadDashboardLayout>
        </ReactRouterAppProvider>
    );
};

export default DashboardLayout;