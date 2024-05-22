import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Root: React.FC = () => {
  return (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  );
};
