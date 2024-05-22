export function getFromStorage<T>(key: string): T | null {
	try {
		const serializedState = localStorage.getItem(key);
		return serializedState === null ? null : JSON.parse(serializedState);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function setToStorage<T>(key: string, value: T): boolean {
	try {
		const serializedState = JSON.stringify(value);
		localStorage.setItem(key, serializedState);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}
