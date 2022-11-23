import { useState } from "react";

interface UseLocalStorageProps {
  key: string;
  defaultValue: Record<string, unknown>[];
}

export const useLocalStorage = ({
  key,
  defaultValue,
}: UseLocalStorageProps) => {
  const [storedValue, setStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      }

      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue: Record<string, unknown>) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
    setStorageValue(newValue);
  };

  return [storedValue, setValue];
};
