import { Outlet } from "react-router-dom";
import { HeaderBlock } from "../components/header.block";
import { Box } from "@chakra-ui/react";

export const MainLayout: React.FC = () => {
  return (
    <Box h="100%">
      <HeaderBlock />
      <Outlet />
    </Box>
  );
};
