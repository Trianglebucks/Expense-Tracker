import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, CardContent } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import { AlertComponent } from "../../components";

const Profile = () => {
  const { user, showAlert, displayAlert, isLoading, updateUser } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email) {
      displayAlert();
      return;
    }
    updateUser({ name, email });
  };

  return (
    <Box>
      <Typography sx={{ marginBottom: 2 }} variant="h5">
        Profile
      </Typography>
      <Card>
        <CardContent>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 5
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                {showAlert && <AlertComponent />}

                {/* name input */}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoFocus
                  value={name}
                  onChange={e => setName(e.target.value)}
                />

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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                {/* button submit */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
                >
                  {isLoading ? "Please wait" : "Save Changes"}
                </Button>
              </Box>
            </Box>
          </Container>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Profile;
