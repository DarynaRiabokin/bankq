declare type ProviderType<T = void> = T & {
  children: React.ReactNode;
};

declare type Key = string;
declare type List = Key[];
