import * as React from "react";
import { useHistory } from "react-router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MenuItem } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { signUpRequest } from "../../redux/actions/userActions";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="/">
                Lookup
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

const ROLES = [
    { value: "USER", label: "User" },
    { value: "ADMIN", label: "Admin" },
];

export default function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [role, setRole] = React.useState("USER");
    const userState = useSelector((state) => state.user);
    const [fieldsState, setFieldsState] = React.useState({
        firstNameHelperText: "",
        firstNameError: false,
        lastNameHelperText: "",
        lastNameError: false,
        emailHelperText: "",
        emailError: false,
        passwordHelperText: "",
        passwordError: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
        if (data.get("firstName") === "") {
            setFieldsState({
                ...fieldsState,
                firstNameError: true,
                firstNameHelperText: "Please enter your first name",
            });
            return;
        }
        if (data.get("lastName") === "") {
            setFieldsState({
                ...fieldsState,
                lastNameError: true,
                lastNameHelperText: "Please enter your last name",
            });
            return;
        }
        if (data.get("email") === "") {
            setFieldsState({
                ...fieldsState,
                emailError: true,
                emailHelperText: "Please enter your email",
            });
            return;
        }
        if (data.get("password") === "") {
            setFieldsState({
                ...fieldsState,
                passwordError: true,
                passwordHelperText: "Please enter your password",
            });
            return;
        }
        dispatch(
            signUpRequest({
                firstName: data.get("firstName"),
                lastName: data.get("lastName"),
                email: data.get("email"),
                password: data.get("password"),
                role: data.get("role"),
            })
        );
    };

    React.useEffect(() => {
        if (
            !userState.isFetching &&
            Object.keys(userState.userDetails).length > 0
        ) {
            history.push("/");
        }
    }, [userState]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    error={fieldsState.firstNameError}
                                    helperText={fieldsState.firstNameHelperText}
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    error={fieldsState.lastNameError}
                                    helperText={fieldsState.lastNameHelperText}
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={fieldsState.emailError}
                                    helperText={fieldsState.emailHelperText}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={fieldsState.passwordError}
                                    helperText={fieldsState.passwordHelperText}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="role"
                                    select
                                    label="Role"
                                    name="role"
                                    onChange={(e) => setRole(e.target.value)}
                                    value={role}
                                    fullWidth
                                >
                                    {ROLES.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
