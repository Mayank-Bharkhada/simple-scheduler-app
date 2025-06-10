import { Button, Grid, TextField, Typography, Paper, Box, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { useForm, Controller, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../stores/auth.store";
import { useSnackbarStore } from "../stores/snackbar.store";

const signUpSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUp = () => {
    const navigate = useNavigate();
    const { isLoading, signUp } = useAuthStore();
    const { setSnackbar } = useSnackbarStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpForm) => {
        try {
            const response = await signUp(data);
            if (response.success) {
                setSnackbar({
                    open: true,
                    message: response.message || "Sign Up Successful",
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
        <Grid
            alignItems="center"
            justifyContent="center"
        >
            <Grid size={{
                xs: 12,
                sm: 8,
                md: 6,
                lg: 4,
                xl: 3,
            }}>
                <Paper elevation={6} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                        <LockOutlined sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
                        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
                            Sign Up
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Create your account to get started.
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }: { field: ControllerRenderProps<SignUpForm, "name"> }) => (
                                <TextField
                                    label="Full Name"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    autoComplete="name"
                                    required
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    InputProps={{
                                        sx: { borderRadius: 2 },
                                    }}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }: { field: ControllerRenderProps<SignUpForm, "email"> }) => (
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
                            render={({ field }: { field: ControllerRenderProps<SignUpForm, "password"> }) => (
                                <TextField
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    margin="normal"
                                    autoComplete="new-password"
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
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }: { field: ControllerRenderProps<SignUpForm, "confirmPassword"> }) => (
                                <TextField
                                    label="Confirm Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    fullWidth
                                    margin="normal"
                                    autoComplete="new-password"
                                    required
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={() => setShowConfirmPassword((show) => !show)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                            disabled={isLoading}
                            sx={{
                                mt: 3,
                                borderRadius: 2,
                                boxShadow: "0 2px 8px rgba(103,58,183,0.15)",
                                fontWeight: 600,
                                letterSpacing: 1,
                            }}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Box mt={3} textAlign="center">
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{" "}
                            <Link
                                to="/auth/signIn"
                                style={{
                                    color: "#673ab7",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default SignUp;
