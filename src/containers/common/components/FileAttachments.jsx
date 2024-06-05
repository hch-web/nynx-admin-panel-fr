import React from 'react';
import { Chip, Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';

function FileAttachments({ data, onClear }) {
  return (
    <Stack direction="row" gap={1} flexWrap="wrap">
      {data?.map((item, i) => (
        <Stack alignItems="center" key={item?.uuid} maxWidth={110} width={1}>
          <Chip
            {...(onClear ? { onDelete: () => onClear(i) } : {})}
            size="small"
            label={(
              <Typography variant="subtitle2" textAlign="center" className="singleLine">
                {item?.file?.name}
              </Typography>
            )}
          />
        </Stack>
      ))}
    </Stack>
  );
}

FileAttachments.propTypes = {
  data: propTypes.array,
  onClear: propTypes.func,
};

FileAttachments.defaultProps = {
  data: [],
  onClear: null,
};

export default FileAttachments;
