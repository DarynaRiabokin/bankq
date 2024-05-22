import {
  Flex,
  Heading,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, redirect } from "react-router-dom";
import { AuthFormBlock } from "../components/auth-form.block";
import { useRef } from "react";
import { getFromStorage } from "../helpers/storage";

export const AuthPage: React.FC = () => {
  const isAuthorized = useRef(!!getFromStorage("token")).current;

  if (isAuthorized) {
    redirect("/");
  }

  return (
    <Flex
      w="100%"
      height="100%"
      justify="center"
      alignItems="center"
      flexWrap="wrap"
      bg="gray.50"
    >
      <Flex
        position="absolute"
        top="0"
        left="50%"
        transform="translateX(-50%)"
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
      </Flex>
      <AuthFormBlock />
    </Flex>
  );
};
