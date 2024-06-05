/* eslint-disable */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { getSearchParamsObj } from 'utilities/helpers';

function FilterDateField({ name, label, disabled, disableFuture, disablePast }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [innerValue, setInnerValue] = useState(null);
  const paramValue = useMemo(() => searchParams.get(name), [searchParams]);

  useEffect(() => {
    if (!paramValue && innerValue !== null) {
      setInnerValue(null);
    }
  }, [paramValue]);

  useEffect(() => {
    const value = searchParams.get(name);
    const searchParamsObj = getSearchParamsObj(searchParams);
    delete searchParamsObj.page;

    if (innerValue !== '' && innerValue !== null) {
      setSearchParams({ ...searchParamsObj, [name]: innerValue.format('YYYY-MM-DD'), filters: true });
    } else if (value !== null && value !== undefined) {
      setSearchParams({ ...searchParamsObj, [name]: moment(value), filters: true });
      setInnerValue(moment(value));
    }
  }, [innerValue]);

  const handleChange = useCallback(
    newValue => {
      setInnerValue(newValue);
    },
    [searchParams]
  );

  return (
    <Box sx={{ minWidth: 140, maxWidth: 160 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          value={innerValue}
          label={label}
          onChange={handleChange}
          disabled={disabled}
          disableFuture={disableFuture}
          disablePast={disablePast}
          slotProps={{ textField: { size: 'small' } }}
        />
      </LocalizationProvider>
    </Box>
  );
}

FilterDateField.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string,
  disabled: propTypes.bool,
  disableFuture: propTypes.bool,
  disablePast: propTypes.bool,
};

FilterDateField.defaultProps = {
  label: '',
  disabled: false,
  disableFuture: false,
  disablePast: false,
};

export default memo(FilterDateField);
