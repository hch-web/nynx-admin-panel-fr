import React from 'react';
import { Stack } from '@mui/material';

import FilterDateField from 'shared/FilterDateField';
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import FilterSelectField from 'shared/FilterSelectField';
import { ticketStatusOptions } from 'utilities/selectOptions';

function Filters() {
  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      <FilterField name="search" label="Search" />

      <FilterSelectField name="status" label="Status" options={ticketStatusOptions} />

      <FilterDateField name="created_at" label="Date" />

      <FilterResetBtn />
    </Stack>
  );
}

export default Filters;
