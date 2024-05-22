import { EditIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFromStorage } from "../helpers/storage";
import { useAuth } from "../hooks/useAuth";

export const HeaderBlock: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogOut } = useAuth();
  const isAuthorized = useRef(!!getFromStorage("token")).current;

  const handleCreateQueue = useCallback(() => {
    navigate("/create-queue");
  }, [navigate]);

  const handleOpenAuth = useCallback(() => {
    navigate("/auth");
  }, [navigate]);

  return (
    <Flex
      color={useColorModeValue("gray.600", "white")}
      minH={"80px"}
      maxW="1200px"
      ml="auto"
      mr="auto"
      w="100%"
      px="2"
      py={{ base: 2 }}
      align={"center"}
    >
      <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
        <Link to="/">
          <Heading
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            size="lg"
            color={useColorModeValue("gray.800", "white")}
          >
            BANQ
          </Heading>
        </Link>
      </Flex>
      {isAuthorized ? (
        <IconButton
          aria-label="Вийти"
          variant="ghost"
          mr="10px"
          colorScheme="red"
          onClick={handleLogOut}
        >
          <NotAllowedIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="Адмін"
          variant="ghost"
          mr="10px"
          onClick={handleOpenAuth}
        >
          <EditIcon />
        </IconButton>
      )}
      <Button
        fontSize={"sm"}
        fontWeight={600}
        colorScheme="purple"
        onClick={handleCreateQueue}
      >
        Стати в чергу
      </Button>
    </Flex>
  );
};
