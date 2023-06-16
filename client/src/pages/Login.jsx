import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AlertComponent, LogoBlack } from "../components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true
};

const Login = () => {
  const navigate = useNavigate();
  //local state
  const [values, setValues] = useState(initialState);
  //global state
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  // checks whether user wants to login or signup
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  // submit form
  const handleSubmit = e => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login successful! Redirecting..."
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User created! Redirecting..."
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  //captures input
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 8
        }}
      >
        <LogoBlack />
        <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 1 }}>
          {values.isMember ? "Sign In" : "Sign Up"}
        </Typography>
        {showAlert && <AlertComponent />}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* name input */}
          {!values.isMember && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              onChange={handleChange}
            />
          )}

          {/* email input */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          {/* password input */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {/* button submit */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {values.isMember ? "Sign In" : "Sign Up"}
          </Button>

          <Button fullWidth variant="outlined" onClick={toggleMember}>
            {values.isMember
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;
