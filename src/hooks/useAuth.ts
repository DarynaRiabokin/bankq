import { useBoolean } from "@chakra-ui/react";
import axios from "axios";
import { useCallback } from "react";
import { API_URL } from "../constants/env";
import zod from "zod";
import { setToStorage } from "../helpers/storage";

export const authResponseSchema = zod.object({
  token: zod.string(),
});

export function useAuth() {
  const [isError, setError] = useBoolean();
  const [isLoading, setLoading] = useBoolean();

  const handleLogin = useCallback(
    async (login: string, password: string) => {
      try {
        setLoading.on();
        const response = await axios.post(`${API_URL}/login`, {
          login,
          password,
        });

        const data = authResponseSchema.parse(response.data);

        setToStorage("token", data.token);
        window.location.href = "/";
      } catch (error) {
        setError.on();
      } finally {
        setLoading.off();
      }
    },
    [setError, setLoading]
  );

  const handleLogOut = useCallback(() => {
    setToStorage("token", "");
    window.location.href = "/";
  }, []);

  return {
    isError,
    isLoading,
    handleLogOut,
    handleLogin,
  };
}
