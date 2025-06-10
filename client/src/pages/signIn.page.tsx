import { Button, Grid, TextField, Typography, Paper, Box, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { useForm, Controller, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../stores/auth.store";
import { useSnackbarStore } from "../stores/snackbar.store";
import type { ApiResponse } from "../types/api.type";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

const SignIn = () => {
    const navigate = useNavigate();
    const { isLoading, signIn } = useAuthStore();
    const { setSnackbar } = useSnackbarStore();
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInForm>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInForm) => {
        try {
            const response = await signIn(data);
            if (response.success) {
                setSnackbar({
                    open: true,
                    message: response.message || "Sign In Successful",
                    severity: "success",
                });
                navigate("/");
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
        <Grid justifyContent="center" alignItems="center">
            <Grid size={{
                xs: 12,
                sm: 8,
                md: 6,
                lg: 4,
                xl: 3,
            }}>
                <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                        <LockOutlined sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
                        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
                            Sign In
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Welcome back! Please enter your credentials.
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }: { field: ControllerRenderProps<SignInForm, "email"> }) => (
                                <TextField
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    autoComplete="email"
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    InputProps={{
                                        sx: { borderRadius: 2 },
                                    }}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }: { field: ControllerRenderProps<SignInForm, "password"> }) => (
                                <TextField
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    margin="normal"
                                    autoComplete="current-password"
                                    required
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword((show) => !show)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 2 },
                                    }}
                                    {...field}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            loading={isLoading}
                            sx={{
                                mt: 3,
                                borderRadius: 2,
                                boxShadow: "0 2px 8px rgba(103,58,183,0.15)",
                                fontWeight: 600,
                                letterSpacing: 1,
                            }}
                        >
                            Sign In
                        </Button>
                    </form>
                    <Box mt={3} textAlign="center">
                        <Typography variant="body2" color="text.secondary">
                            Don't have an account?{" "}
                            <Link
                                to="/auth/signUp"
                                style={{
                                    color: "primary.main",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default SignIn;