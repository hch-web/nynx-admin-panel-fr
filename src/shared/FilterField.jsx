import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import propTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from '@mui/icons-material';

function FilterField({ name, label, disabled, onChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [innerValue, setInnerValue] = useState('');
  const paramValue = useMemo(() => searchParams.get(name), [searchParams]);

  const handleDebounce = useDebouncedCallback(params => {
    setSearchParams(params);
  }, 500);

  useEffect(() => {
    if (paramValue !== null && paramValue !== undefined) {
      setInnerValue(paramValue);
    } else {
      setInnerValue('');
    }
  }, [paramValue]);

  const handleChange = useCallback(
    e => {
      const value = e.target?.value?.toLowerCase();

      if (value !== '') {
        handleDebounce({ ...searchParams, [name]: value, filters: true });
      } else {
        searchParams.delete(name);
        handleDebounce(searchParams);
      }

      if (onChange) onChange(value, name);
      setInnerValue(value);
    },
    [searchParams]
  );

  return (
    <TextField
      // xs={12}
      // md={5}
      // lg={4}
      // sx={{ minWidth: 300, maxWidth: 300 }}
      name={name}
      variant="outlined"
      InputProps={{
        sx: { borderRadius: 50, background: '#fff1e2' },
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      placeholder={label}
      value={innerValue}
      onChange={handleChange}
      disabled={disabled}
      type="text"
      size="small"
    />
  );
}

FilterField.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string,
  disabled: propTypes.bool,
  onChange: propTypes.func,
};

FilterField.defaultProps = {
  label: '',
  disabled: false,
  onChange: null,
};

export default FilterField;
