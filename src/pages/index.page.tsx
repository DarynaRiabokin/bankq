import { Box } from "@chakra-ui/react";
import { QueueBlock } from "../components/queue.block";
import { DepartmentTabsBlock } from "../components/department-tabs.block";
import { useDepartments } from "../providers/departments/departments.provider";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";

export const IndexPage: React.FC = () => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<Key | null>(
    null
  );
  const { loadDepartments } = useDepartments();

  useFetch(loadDepartments);

  return (
    <Box h="100%">
      <DepartmentTabsBlock
        selectedDepartmentId={selectedDepartmentId}
        setSelectedDepartmentId={setSelectedDepartmentId}
      />
      <QueueBlock selectedDepartmentId={selectedDepartmentId} />
    </Box>
  );
};
