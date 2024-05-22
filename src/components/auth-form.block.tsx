import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useCallback, useState } from "react";

export const AuthFormBlock: React.FC = () => {
  const { handleLogin, isLoading, isError } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleLogin(userName, password);
    },
    [handleLogin, password, userName]
  );

  return (
    <Flex
      minH="100%"
      w="100%"
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        as="form"
        onSubmit={handleSubmit}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Вхід
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Логін</FormLabel>
          <Input
            required
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Пароль</FormLabel>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Text color="red.500">{isError && "Невірний логін або пароль"}</Text>
        <Stack spacing={6}>
          <Button
            type="submit"
            bg={"purple.400"}
            color={"white"}
            isLoading={isLoading}
            _hover={{
              bg: "purple.500",
            }}
          >
            Увійти
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
