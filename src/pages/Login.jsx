import { useContext, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { Link } from "react-router-dom";
import {
  TextInput,
  Paper,
  Title,
  Container,
  Button,
  Stack,
  Text,
} from "@mantine/core";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, errorMessage } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = { username, password };
    await handleLogin(currentUser);
  };

  return (
    <Container
      size="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh"
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "5rem" }}>Login</h1>
      <Paper padding="lg" shadow="xs" style={{ width: "550px", padding:"50px" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing="lg">
            <TextInput
              required
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
              required
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth>
              Login
            </Button>
          </Stack>
        </form>

        {errorMessage && (
          <Text align="center" color="red" style={{ marginTop: "1rem" }}>
            {errorMessage}
          </Text>
        )}
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          Not a member?{" "}
          <Link
            to="/signup"
            style={{
              color: "#002147",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Create an account
          </Link>
        </div>
      </Paper>
    </Container>
  );
}

export default Login;
