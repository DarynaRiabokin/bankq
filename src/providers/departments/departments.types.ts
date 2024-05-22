import zod from 'zod';
import { departmentsSchema } from './departments.schema';
import { DepartmentsProvider } from './departments.provider';

export type DepartmentsType = zod.infer<typeof departmentsSchema>;
export type DepartmentType = DepartmentsType['departments'][number];

export type ContextType = {
	departmentsList: List;
	departments: Record<Key, DepartmentType> | null;
	loadDepartments: InstanceType<typeof DepartmentsProvider>['loadDepartments'];
};
