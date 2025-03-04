import { KeyboardEvent } from 'react';

import { CircularProgress, TextField } from '@mui/material';

import { useDebounce } from 'hooks/useDebounce';

import classes from './Search.module.scss';
import { SearchProps } from './types';

export const Search = ({
  debounceTimer = 0,
  isLoading = false,
  label,
  onChange,
}: SearchProps) => {
  const inputValue = useDebounce(
    (value: string) => onChange?.(value),
    debounceTimer
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onChange) {
      onChange((e.target as HTMLInputElement).value);
    }
  };

  return (
    <TextField
      className={classes['search-field']}
      label={label}
      variant="outlined"
      onChange={(e) => inputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      slotProps={{
        input: {
          endAdornment: isLoading && (
            <CircularProgress
              className={classes['search-field__progress']}
              size={30}
            />
          ),
        },
      }}
    />
  );
};

export default Search;
