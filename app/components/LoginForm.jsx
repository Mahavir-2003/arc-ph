import { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import { useToast } from "../hooks/useToast";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        showToast("Login successful", "success");
        localStorage.setItem("isLoggedIn", "true");
        onLoginSuccess();
      } else {
        showToast("Invalid credentials", "error");
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast("An error occurred during login", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="text"
          label="Username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          variant="bordered"
          color="primary"
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="bordered"
          color="primary"
        />
        <Button
          type="submit"
          color="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;