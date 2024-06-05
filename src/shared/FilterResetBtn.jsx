import React, { useMemo } from 'react';
import { Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import propTypes from 'prop-types';

import { getSearchParamsObj } from 'utilities/helpers';

function FilterResetBtn({ onClick }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleResetFilters = () => {
    // const searchParamsObj = getSearchParamsObj(searchParams);
    // setSearchParams({ ...searchParamsObj, reset: true });
    setSearchParams();

    if (onClick) onClick(searchParams, setSearchParams);
  };

  const hasParams = useMemo(() => getSearchParamsObj(searchParams)?.filters, [searchParams]);

  // const hasParams = useMemo(
  //   () => Object.values(getSearchParamsObj(searchParams))?.length > 0,
  //   [searchParams]
  // );

  return (
    hasParams && (
      <Button variant="contained" onClick={handleResetFilters} size="small">
        Reset
      </Button>
    )
  );
}

FilterResetBtn.propTypes = {
  onClick: propTypes.func,
};

FilterResetBtn.defaultProps = {
  onClick: null,
};

export default FilterResetBtn;
