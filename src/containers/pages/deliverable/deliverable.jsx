import React, { useEffect } from 'react';
import { Card, Typography, CardContent, Box, Button, Backdrop, CircularProgress, Stack } from '@mui/material';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { useGetDeliverablesQuery, useDeleteDeliverableMutation } from 'services/private/client';

// styles

// utilities
import { setIconByFileType } from 'utilities/helpers';
import { useTheme } from '@emotion/react';
import { formatDate } from 'utilities/utility-functions';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useParams } from 'react-router-dom';

function Deliverable() {
  const { id } = useParams();
  const { data: deliverables, isFetching, refetch } = useGetDeliverablesQuery(id, { skip: !id });

  const [deleteDeliverable, { error, isSuccess }] = useDeleteDeliverableMutation();
  useHandleApiResponse(error, isSuccess, 'Status updated successfully!', false);

  const theme = useTheme();
  // COLORS
  const colors = theme.palette;
  const border = colors.border.main;
  const lightOrange = colors.lightOrange.main;
  const lightGrey = colors.grey.light;

  const borderStyles = { border: `1px solid ${lightGrey}` };

  const handleSaveFile = file => {
    saveAs(file);
  };
  const handleBlock = body => {
    deleteDeliverable(body);
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, []);
  return (
    <Box className="bg-white common-border">
      {/* HEADER */}
      <Box className="py-3 px-4">
        <Typography variant="h6" className="fw-600">
          Deliverable
        </Typography>
      </Box>

      {/* BODY */}
      <Box className="py-3 px-4">
        <ol>
          <Backdrop open={isFetching}>
            <CircularProgress size={80} color="yellow" />
          </Backdrop>
          {deliverables?.length ? (
            deliverables?.map(attachment => (
              <Box sx={borderStyles} className="px-4 p-4 mb-2">
                <li key={attachment.id}>
                  <Stack direction="row" justifyContent="space-between" mb={3}>
                    <Box className="d-flex align-items-center">
                      <Box className="d-flex align-items-center">
                        <Typography variant="body1" className="me-2 fw-500">
                          Delivery
                        </Typography>

                        <Typography variant="body1" className="text-muted">
                          {formatDate(attachment.created_at)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleBlock({
                          id: attachment.id,
                          task_deliverable_status:
                              attachment.task_deliverable_status === 'blocked' ? 'unblocked' : 'blocked',
                        })}
                      >
                        {attachment.task_deliverable_status === 'unblocked' ? 'Inactivate' : 'Activate'}{' '}
                      </Button>
                    </Box>
                  </Stack>

                  {/* FILES CONTAINER */}
                  <Box className="d-flex align-items-center my-3 gap-4">
                    {attachment.task_deliverable_attachments?.map(fileObj => (
                      <Card
                        className="pointer"
                        onClick={() => handleSaveFile(fileObj.file)}
                        key={fileObj?.id}
                        sx={{ borderColor: border }}
                      >
                        <CardContent className="text-center py-3 px-2">
                          <img src={setIconByFileType(fileObj?.file)} alt="file-Icon" />

                          <Box className="mt-2">
                            <Typography variant="body2" sx={{ fontSize: '10px' }} className="text-muted">
                              {moment(fileObj?.created_at)?.fromNow()}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>

                  {/* REMARKS CONTAINER */}
                  <Box>
                    <Typography variant="body1" className="mb-2 fw-500">
                      Remarks
                    </Typography>

                    <Card sx={{ borderColor: lightOrange }}>
                      <CardContent>
                        <Typography variant="body2" className="text-muted">
                          {attachment.remarks}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </li>
              </Box>
            ))
          ) : (
            <Typography className="text-center" variant="body1">
              No Record Found!
            </Typography>
          )}
        </ol>
      </Box>
    </Box>
  );
}

export default Deliverable;
