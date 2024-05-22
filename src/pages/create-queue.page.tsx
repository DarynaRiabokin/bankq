import {
  Flex,
  Heading,
  Spinner,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDepartments } from "../providers/departments/departments.provider";
import { useFetch } from "../hooks/useFetch";
import { CreateFormBlock } from "../components/create-form.block";
import { Link } from "react-router-dom";
import { useWindows } from "../providers/windows/windows.provider";

export const CreateQueuePage: React.FC = () => {
  const { loadDepartments } = useDepartments();
  const { loadWindows } = useWindows();

  const isLoading = useFetch(loadDepartments);
  useFetch(loadWindows);

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
      {isLoading ? <Spinner /> : <CreateFormBlock />}
    </Flex>
  );
};
