export function normalizeData<T extends { id: Key }>(data: T[]) {
  return data.reduce<[Record<Key, T>, List]>(
    (acc, item) => {
      acc[0][item.id] = item;
      acc[1].push(item.id);

      return acc;
    },
    [{}, []]
  );
}
