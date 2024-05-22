import { useBoolean } from "@chakra-ui/react";
import { useEffect } from "react";

type OptionsType = {
  interval?: number;
};

export function useFetch<T>(callback: () => Promise<T>, options?: OptionsType) {
  const { interval = undefined } = options ?? {};

  const [isLoading, setLoading] = useBoolean();

  useEffect(() => {
    const load = async () => {
      setLoading.on();
      await callback();
      setLoading.off();
    };

    if (typeof interval === "number") {
      load();

      const intervalId = setInterval(() => {
        callback();
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    } else {
      load();
    }
  }, []);

  return isLoading;
}
