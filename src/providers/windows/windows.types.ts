import zod from 'zod';
import { windowsSchema } from './windows.schema';
import { WindowsProvider } from './windows.provider';

export type WindowsType = zod.infer<typeof windowsSchema>;
export type WindowType = WindowsType['windows'][number];

export type ContextType = {
	windowsList: List;
	windows: Record<Key, WindowType> | null;
	loadWindows: InstanceType<typeof WindowsProvider>['loadWindows'];
};
