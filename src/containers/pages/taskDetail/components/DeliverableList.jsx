import React, { useEffect } from 'react';
import { Box, Button, Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import { saveAs } from 'file-saver';

// Styles
import styles from 'styles/mui/containers/workspace-general.module.scss';

// Utilities
import { convertMillisecondsToDuration, getLocaleDate, setIconByFileType } from 'utilities/helpers';
import { checkTimeDifference, formatDate, formatTime } from 'utilities/utility-functions';
// Components
import {
  useDeleteWorkspaceDeliverableMutation,
  useListDeliverablesQuery,
  useReleasePaymentMutation,
} from 'services/private/task-details';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useParams } from 'react-router-dom';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import { CLIENT_ORDER, DIRECT_HIRE, JOB_OFFER } from 'utilities/constants';
import DeliveryDelayTime from './DeliveryDelayTime';

function DeliverableList() {
  const theme = useTheme();
  const { taskId, taskVia } = useParams();

  const {
    data: taskDeliverables,
    isFetching,
    refetch,
  } = useListDeliverablesQuery({ taskVia, taskId }, { skip: !(taskVia && taskId) });
  const [deleteDeliverable, { error, isSuccess }] = useDeleteWorkspaceDeliverableMutation();
  useHandleApiResponse(error, isSuccess, 'Status updated successfully!', false);
  const [releasePayment, { error: isError, isSuccess: success }] = useReleasePaymentMutation();
  useHandleApiResponse(isError, success, 'Payment Release successfully!', false);

  // COLORS
  const colors = theme.palette;
  const border = colors.border.main;
  const lightOrange = colors.lightOrange.main;
  const handleBlock = async body => {
    await deleteDeliverable(body);
  };
  const handleReleasePayment = async body => {
    await releasePayment(body);
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, []);

  const deliveryVia = taskVia === DIRECT_HIRE ? CLIENT_ORDER : JOB_OFFER;
  const deliveryDeadlineTime = taskDeliverables?.[deliveryVia]?.delivery_date;
  // REDUX STATE

  const handleSaveFile = file => {
    saveAs(file);
  };

  return (
    <Box className="px-2">
      {!isFetching ? (
        <ol>
          {taskDeliverables?.deliverables.map(item => {
            const deliveryCreatedTime = getLocaleDate(item?.created_at);
            const deliveryTimeDifference = checkTimeDifference(deliveryDeadlineTime, deliveryCreatedTime);
            const isDeliveryTimeInDelay = deliveryTimeDifference < 0;
            const duration = convertMillisecondsToDuration(deliveryTimeDifference);

            return (
              <li key={item.id}>
                <Stack direction="row" justifyContent="space-between" mb={3}>
                  <Box className="d-flex align-items-center gap-3">
                    <Box className="d-flex align-items-center">
                      <Typography variant="body1" className="me-2 fw-500">
                        Delivery
                      </Typography>

                      <Typography variant="body1" className="text-muted">
                        {formatDate(item.created_at)}
                      </Typography>
                    </Box>
                    {isDeliveryTimeInDelay ? (
                      <DeliveryDelayTime
                        days={duration?.days}
                        hours={duration?.hours}
                        minutes={duration?.minutes}
                        seconds={duration?.seconds}
                      />
                    ) : (
                      <Typography variant="body1" className="me-2">
                        {formatTime(deliveryCreatedTime)}
                      </Typography>
                    )}
                  </Box>
                  <Box className="d-flex gap-2">
                    {item.status === 'pending' && (
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleReleasePayment({
                          id: item.id,
                          offer_type: taskVia
                        })}
                      >
                        Release Payment
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleBlock({
                        id: item.id,
                        task_deliverable_status:
                            item.task_deliverable_status === 'blocked' ? 'unblocked' : 'blocked',
                      })}
                    >
                      {item.task_deliverable_status === 'unblocked' ? 'Inactivate' : 'Activate'}{' '}
                    </Button>
                  </Box>
                </Stack>

                {/* FILES CONTAINER */}
                <Box className="d-flex align-items-center my-3 gap-4">
                  {item.attachments?.map(fileObj => (
                    <Card
                      className="pointer"
                      onClick={() => handleSaveFile(fileObj.file)}
                      key={fileObj?.id}
                      sx={{ borderColor: border }}
                    >
                      <CardContent className="text-center py-3 px-2">
                        <img src={setIconByFileType(fileObj?.file_type)} alt="file-Icon" />

                        <Box className="mt-2">
                          <Typography variant="body2" className="fw-500" sx={{ fontSize: '12px' }}>
                            {`${fileObj?.file_name?.slice(0, 12)}...`}
                          </Typography>

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
                        {item.remarks}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>

                {/* REVISIONS BOX */}
                <Box className={`${styles.listItems} py-3`}>
                  <ol className="ps-1">
                    {item?.deliverable_revisions?.map(revision => {
                      const revisionCreatedTime = getLocaleDate(revision?.created_at);
                      const revisionTimeDifference = checkTimeDifference(
                        deliveryDeadlineTime,
                        revisionCreatedTime
                      );
                      const isRevisionTimeInDelay = deliveryTimeDifference < 0;
                      const revisionDuration = convertMillisecondsToDuration(revisionTimeDifference);
                      return (
                        <li className="mb-3" key={revision?.id}>
                          <Box className="d-flex align-items-center gap-3">
                            <Typography variant="body1" className="me-2 fw-500">
                              Revision
                            </Typography>

                            <Typography variant="body1" className="text-muted">
                              {formatDate(revision?.created_at)}
                            </Typography>

                            {isRevisionTimeInDelay ? (
                              <DeliveryDelayTime
                                days={revisionDuration?.days}
                                hours={revisionDuration?.hours}
                                minutes={revisionDuration?.minutes}
                                seconds={revisionDuration?.seconds}
                              />
                            ) : (
                              <Typography variant="body1" className="me-2">
                                {formatTime(revisionCreatedTime)}
                              </Typography>
                            )}
                          </Box>
                          {/* FILES CONTAINER */}
                          <Box className="d-flex align-items-center my-3 gap-4">
                            {revision?.attachments?.map(revisionFile => (
                              <Card
                                className="pointer"
                                key={revisionFile?.id}
                                sx={{ borderColor: border }}
                                onClick={() => handleSaveFile(revisionFile?.file)}
                              >
                                <CardContent className="text-center py-3 px-2">
                                  <img src={setIconByFileType(revisionFile?.file_type)} alt="file-Icon" />

                                  <Box className="mt-2">
                                    <Typography variant="body2" className="fw-500" sx={{ fontSize: '12px' }}>
                                      {`${revisionFile?.file_name?.slice(0, 12)}...`}
                                    </Typography>

                                    <Typography
                                      variant="body2"
                                      sx={{ fontSize: '10px' }}
                                      className="text-muted"
                                    >
                                      {moment(revisionFile?.created_at)?.fromNow()}
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
                                  {revision?.remarks}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Box>
                        </li>
                      );
                    })}
                  </ol>
                </Box>
              </li>
            );
          })}
        </ol>
      ) : (
        <Box className="my-5 py-5">
          <GlobalLoader />
        </Box>
      )}
    </Box>
  );
}

export default DeliverableList;
