import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useQueues } from "../providers/queues/queues.provider";
import { useWindows } from "../providers/windows/windows.provider";
import { useFetch } from "../hooks/useFetch";
import { useCallback, useRef } from "react";
import { getFromStorage } from "../helpers/storage";
import { CheckIcon } from "@chakra-ui/icons";

type PropsType = {
  selectedDepartmentId: Key | null;
};

export const QueueBlock: React.FC<PropsType> = ({ selectedDepartmentId }) => {
  const { queues, queuesList, loadQueues, deleteQueue } = useQueues();
  const { windows, windowsList, loadWindows } = useWindows();

  const [isLoading, setLoading] = useBoolean();

  const isAuthorized = useRef(!!getFromStorage("token")).current;

  const isWindowsLoading = useFetch(loadWindows);
  const isQueuesLoading = useFetch(loadQueues, {
    interval: 3000,
  });

  const handleDelete = useCallback(
    async (queueId: Key) => {
      if (!isAuthorized) return;
      setLoading.on();
      await deleteQueue(queueId);
      setLoading.off();
    },
    [deleteQueue, isAuthorized, setLoading]
  );

  return (
    <Box w="100%" minH="100%" bg="gray.50">
      <Box minH="100%" maxW="1200px" marginInline="auto" p={{ base: 0, lg: 8 }}>
        {isQueuesLoading || isWindowsLoading ? (
          <Flex justify="center" align="center" width="100%" py="200px">
            <Spinner />
          </Flex>
        ) : (
          <Flex
            w="100%"
            gap={{ base: '10px', lg: '8' }}
            justify="space-between"
            overflowX="auto"
            p={{ base: '10px', lg: 0 }}
            sx={{
              '&::-webkit-scrollbar': {
                backgroundColor: 'transparent'
              }
            }}
          >
            {windows &&
              windowsList.map((windowId) => {
                const window = windows[windowId];

                if (
                  selectedDepartmentId &&
                  !window.departments.includes(selectedDepartmentId)
                )
                  return null;

                return (
                  <Stack
                    gap={{ base: '10px', lg: '24px' }}
                    w="100%"
                    minW={{ base: "200px", lg: "auto" }}
                    key={window.id}
                  >
                    <Flex
                      bg="white"
                      w="100%"
                      borderRadius="16px"
                      shadow="sm"
                      justifyContent="center"
                      p="4"
                      zIndex={10}
                      position={{ base: 'relative', lg: 'sticky' }}
                      top={{ base: 0, lg: '24px' }}
                    >
                      <Heading size="md">{window.name}</Heading>
                    </Flex>
                    {queues &&
                      queuesList.map((queueId) => {
                        const queue = queues[queueId];

                        if (queue.windowId !== window.id) return null;

                        return (
                          <Box
                            key={queueId}
                            bg="white"
                            w="100%"
                            borderRadius="16px"
                            shadow="sm"
                            p="4"
                          >
                            <Text>
                              <strong>№{queue.queueId}</strong> {queue.userName}
                            </Text>
                            {isAuthorized ? (
                              <IconButton
                                mt="10px"
                                width="100%"
                                aria-label="Закрити"
                                onClick={() => handleDelete(queueId)}
                                isLoading={isLoading}
                                size="sm"
                              >
                                <CheckIcon />
                              </IconButton>
                            ) : null}
                          </Box>
                        );
                      })}
                  </Stack>
                );
              })}
          </Flex>
        )}
      </Box>
    </Box>
  );
};
