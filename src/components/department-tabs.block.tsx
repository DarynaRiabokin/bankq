import { Box, Tab, TabList, Tabs, useColorModeValue } from "@chakra-ui/react";
import { useDepartments } from "../providers/departments/departments.provider";
import { useCallback, useMemo } from "react";

type PropsType = {
  selectedDepartmentId: Key | null;
  setSelectedDepartmentId: React.Dispatch<React.SetStateAction<Key | null>>;
};

export const DepartmentTabsBlock: React.FC<PropsType> = ({
  selectedDepartmentId,
  setSelectedDepartmentId,
}) => {
  const { departments, departmentsList } = useDepartments();

  const selectedIndex = useMemo(
    () => departmentsList.findIndex((id) => id === selectedDepartmentId) + 1,
    [departmentsList, selectedDepartmentId]
  );

  const handleChange = useCallback(
    (index: number) => {
      setSelectedDepartmentId(index === 0 ? null : departmentsList[index - 1]);
    },
    [departmentsList, setSelectedDepartmentId]
  );

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
      minH={"60px"}
			mb="24px"
      maxW="1200px"
      ml="auto"
      mr="auto"
      w="100%"
      py={{ base: 2 }}
      alignItems={"center"}
    >
      <Tabs
        defaultIndex={selectedIndex}
        onChange={handleChange}
        variant="soft-rounded"
        colorScheme="purple"
      >
        <TabList flexWrap="wrap" justifyContent="center">
          <Tab>Всі</Tab>
          {departments &&
            departmentsList.map((id) => {
              const department = departments[id];

              return <Tab key={id}>{department.name}</Tab>;
            })}
        </TabList>
      </Tabs>
    </Box>
  );
};
