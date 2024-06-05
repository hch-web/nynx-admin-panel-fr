import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import propTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import { getSearchParamsObj } from 'utilities/helpers';

function FilterSelectField({ label, options, name }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [innerValue, setInnerValue] = useState('');
  const paramValue = useMemo(() => searchParams.get(name), [searchParams]);

  useEffect(() => {
    if (!paramValue && innerValue !== null) {
      setInnerValue('');
    }
  }, [paramValue]);

  useEffect(() => {
    const value = searchParams.get(name);
    const searchParamsObj = getSearchParamsObj(searchParams);

    if (innerValue !== '') {
      setSearchParams({ ...searchParamsObj, [name]: innerValue, filters: true });
    } else if (value !== null && value !== undefined) {
      setSearchParams({ ...searchParamsObj, [name]: value, filters: true });
      setInnerValue(value);
    }
  }, [innerValue]);

  const handleChange = useCallback(
    e => {
      const { value } = e.target;

      setInnerValue(value);
    },
    [searchParams]
  );

  return (
    <Box sx={{ minWidth: 140, maxWidth: 160 }}>
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>

        <Select label={label} name={name} value={innerValue} onChange={handleChange}>
          {options?.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

FilterSelectField.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  options: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.oneOfType([propTypes.string, propTypes.number]),
      label: propTypes.string,
    })
  ).isRequired,
};

export default FilterSelectField;
