import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounced = debounce(() => {
      setDebouncedValue(value);
    }, delay);
    debounced();

    return () => debounced?.cancel();
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
