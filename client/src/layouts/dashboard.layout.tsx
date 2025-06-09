import { type FC, useMemo } from 'react';
// MUI
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import {
    DashboardCustomize as DashboardCustomizeIcon,
    Insights as InsightsIcon,
    Campaign as CampaignIcon,
    Widgets as WidgetsIcon,
    Layers as LayersIcon,
    CloudSync as CloudSyncIcon,
    AccountCircle as AccountCircleIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    AddCircleOutlineOutlined as AddIcon,
    Palette as ThemeIcon,
    AccountTree as StructureIcon,
    Brush as DesignIcon,
    // AdsClick as DisplayConditionsIcon,
    // IntegrationInstructions as IntegrationIcon
} from '@mui/icons-material';

// Toolpad
import { DashboardLayout as ToolpadDashboardLayout, type Navigation, } from '@toolpad/core';
import { ReactRouterAppProvider, } from '@toolpad/core/react-router';

// Router
import { Outlet, useLocation } from 'react-router';
import { useThemeStore } from '../stores/theme.store';
import { getTheme } from '../theme';

// Stores   

// THEME

const NAVIGATION: Navigation = [
    {
        kind: "page",
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardCustomizeIcon />,
    },
    {
        kind: "page",
        segment: 'analytic',
        title: 'Analytics',
        icon: <InsightsIcon />,
    },
    {
        kind: "page",
        segment: 'campaign',
        title: 'Campaigns',
        icon: <CampaignIcon />,
    },
    {
        kind: "page",
        segment: 'widget',
        title: 'Widgets',
        icon: <WidgetsIcon />,
    },
    {
        kind: "page",
        segment: 'integration',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
    {
        kind: "page",
        segment: 'plateform',
        title: 'Plateforms',
        icon: <CloudSyncIcon />,
    }

];

const EDITOR_NAVIGATION: Navigation = [
    {
        kind: "page",
        segment: 'editor',
        title: 'Design',
        icon: <DesignIcon />,
    },
    {
        kind: "page",
        segment: 'editor/add',
        title: 'Add',
        icon: <AddIcon />,
    },
    {
        kind: "page",
        segment: 'editor/theme',
        title: 'Theme',
        icon: <ThemeIcon />,
    },
    {
        kind: "page",
        segment: 'editor/structure',
        title: 'Structure',
        icon: <StructureIcon />,
    },

];

const getNavigation = (path: string) => {
    console.log(path)
    if (path.includes('/editor')) {
        return EDITOR_NAVIGATION;
    }
    return NAVIGATION;
}

const DashboardLayout: FC = () => {
    const { themeMode, toggleThemeMode } = useThemeStore();
    const theme = useMemo(() => getTheme(themeMode), [themeMode]);
    const location = useLocation()
    const navigation = useMemo(() => getNavigation(location.pathname), [location.pathname]);

    return (
        <ReactRouterAppProvider navigation={navigation} theme={theme} >
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
                                <IconButton>
                                    <AccountCircleIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    ),
                }}>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                    <Outlet />
                </Box>
            </ToolpadDashboardLayout>
        </ReactRouterAppProvider>
    );
};

export default DashboardLayout;