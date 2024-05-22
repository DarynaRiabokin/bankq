import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDepartments } from "../providers/departments/departments.provider";
import { useQueues } from "../providers/queues/queues.provider";
import { FormEvent, useCallback, useState } from "react";
import { QueueType } from "../providers/queues/queues.types";
import { useWindows } from "../providers/windows/windows.provider";
import { useNavigate } from "react-router-dom";

export const CreateFormBlock: React.FC = () => {
  const navigate = useNavigate();
  const { departments, departmentsList } = useDepartments();
  const { windows } = useWindows();
  const { saveQueue } = useQueues();
  const [isLoading, setLoading] = useBoolean();
  const [createdQueue, setCreatedQueue] = useState<QueueType | null>(null);
  const [userName, setUserName] = useState("");
  const [departmentId, setDepartmentId] = useState<Key | null>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (departmentId === null || createdQueue) return;
      setLoading.on();
      const data = await saveQueue({
        userName,
        departmentId,
      });
      setLoading.off();

      if (data?.queue) {
        setCreatedQueue(data.queue);
      }
    },
    [createdQueue, departmentId, saveQueue, setLoading, userName]
  );

  const handleGoToQueue = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Flex h={"100%"} align={"center"} justify={"center"}>
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
        {createdQueue ? (
          <>
            <Heading
              textAlign="center"
              lineHeight={1.1}
              fontSize={{ base: "2xl", md: "3xl" }}
            >
              Ви успішно стали в чергу
            </Heading>
            <Flex
              py="24px"
              gap="24px"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="large" display="block">
                <strong>№{createdQueue.queueId}</strong> {createdQueue.userName}
              </Text>
              {windows && (
                <Text fontSize="medium" display="block">
                  Вікно: {windows[createdQueue.windowId].name}
                </Text>
              )}
            </Flex>
            <Button onClick={handleGoToQueue} colorScheme="purple">
              Перейти до черги
            </Button>
          </>
        ) : (
          <>
            <Heading
              textAlign="center"
              lineHeight={1.1}
              fontSize={{ base: "2xl", md: "3xl" }}
            >
              Стати в чергу
            </Heading>
            <FormControl id="name" isRequired>
              <FormLabel>Імʼя</FormLabel>
              <Input
                placeholder="Петро Щур"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="department" isRequired>
              <FormLabel>Послуга</FormLabel>
              <Select
                placeholder="Виберіть послугу"
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                {departments &&
                  departmentsList.map((id) => {
                    const department = departments[id];

                    return (
                      <option key={id} value={department.id}>
                        {department.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={"purple.400"}
                type="submit"
                color={"white"}
                isLoading={isLoading}
                _hover={{
                  bg: "purple.500",
                }}
              >
                Створити
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Flex>
  );
};
