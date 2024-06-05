import React, { useRef } from 'react';
import { Box, Divider, Typography, useTheme, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import PrintIcon from '@mui/icons-material/Print';
// API HOOKS
import { useListTaskDetailsQuery } from 'services/private/task-details';
import { taskDetailsTabPanelTableBodyStyles } from 'styles/containers/workspace-styles';
import moment from 'moment';
import { PROJECT_BASED } from 'utilities/constants';
import { getLocaleDate } from 'utilities/helpers';
import { useReactToPrint } from 'react-to-print';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';

function TaskDetailTabPanel() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const theme = useTheme();
  const { taskId, taskVia } = useParams();

  // API HOOKS
  const {
    data: taskDetails,
    isLoading,
    isFetching,
  } = useListTaskDetailsQuery({ taskVia, taskId }, { skip: !(taskVia && taskId) });

  const handleInitialRate = (initialRate, specialOffer, refund) => initialRate - specialOffer + refund;

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // CONSTANTS
  const taskTotalBudget = taskDetails && taskDetails.sub_total + taskDetails.service_fee + taskDetails.tip - taskDetails.refund;
  const taskTimeline = taskDetails?.budget_type === PROJECT_BASED
    ? `${taskDetails?.initial_timeline} Days`
    : `${taskDetails?.initial_timeline} Months`;

  return (
    <Box className="bg-white mt-2" sx={{ borderRadius: '10px' }}>
      {/* HEADER */}
      <Box className="d-flex align-items-center justify-content-between px-4 py-3">
        <Typography variant="h6" color={darkPurple} className="fw-500">
          Details
        </Typography>
        <Button variant="success" startIcon={<PrintIcon />} onClick={handlePrint}>Print</Button>
      </Box>

      <Divider />

      {/* BODY */}
      {!(isLoading || isFetching) ? (
        <Box className="px-4 pt-3" ref={componentRef}>
          {/* BODY HEADER */}
          <Box className="d-flex align-items-center justify-content-between">
            <Box className="d-flex align-items-center justify-content-center gap-2">
              <Typography variant="body2" className="fw-500">
                Order Number
              </Typography>

              <Typography variant="body2" className="text-muted">
                {taskDetails?.order_number}
              </Typography>
            </Box>

            <Box className="d-flex align-items-center justify-content-center gap-2">
              <Typography variant="body2" className="fw-500">
                Your Order
              </Typography>

              <Typography variant="body2" className="text-muted">
                {moment(getLocaleDate(taskDetails?.hiring_date)).format('DD MMM, HH:MM')}
              </Typography>
            </Box>
          </Box>

          {/* TABLE DETAILS */}
          <Box className="pt-3" sx={{ overflowX: 'auto' }}>
            <Box sx={taskDetailsTabPanelTableBodyStyles}>
              {/* TABLE HEADER */}
              <Box className="d-flex align-items-center px-3 py-2" sx={{ background: '#ECE9EB' }}>
                <Box className="col-6 pe-2">
                  <Typography variant="body2" className="fw-500">
                    Items
                  </Typography>
                </Box>

                <Box className="col-2 px-2">
                  <Typography variant="body2" className="fw-500">
                    QTY.
                  </Typography>
                </Box>

                <Box className="col-2 px-2">
                  <Typography variant="body2" className="fw-500">
                    Duration
                  </Typography>
                </Box>

                <Box className="col-2 ps-2">
                  <Typography variant="body2" className="fw-500">
                    Price
                  </Typography>
                </Box>
              </Box>

              {/* TABLE BODY */}
              <Box>
                {/* TABLE ROW ITEMS */}
                <Box className="d-flex align-items-center px-3 py-2 mb-2">
                  <Box className="col-6 pe-2">
                    <Typography variant="body2" className="fw-500">
                      {taskDetails?.gig_title}
                    </Typography>
                  </Box>

                  <Box className="col-2 px-3">
                    <Typography variant="body2"> 1</Typography>
                  </Box>

                  <Box className="col-2 px-2">
                    <Typography variant="body2">{taskTimeline}</Typography>
                  </Box>

                  <Box className="col-2 ps-2">
                    <Typography variant="body2">
                      {`$${handleInitialRate(
                        taskDetails?.initial_rates,
                        taskDetails?.special_offer_rates,
                        taskDetails?.refund
                      )}`}
                    </Typography>
                  </Box>
                </Box>

                {/* SPECIAL OFFER ROW */}
                {(taskDetails?.special_offer_timeline || taskDetails?.special_offer_rates) && (
                  <Box>
                    <Divider light />

                    <Box className="d-flex align-items-center p-3">
                      <Box className="col-8">
                        <Typography variant="body2">Special Offer</Typography>
                      </Box>

                      <Box className="col-2">
                        <Typography variant="body2">{taskDetails?.special_offer_timeline || ''}</Typography>
                      </Box>

                      <Box className="col-2">
                        <Typography variant="body2">${taskDetails?.special_offer_rates}</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}

                <Divider light />

                {/* BILLING INFO BODY WRAPPER */}
                <Box>
                  {/* LABEL AND PRICE ROWS */}
                  <Box className="d-flex align-items-center my-3 px-3">
                    <Box className="col-10">
                      <Typography variant="body2">Subtotal</Typography>
                    </Box>

                    <Box className="col-2 mx-2">
                      <Typography variant="body2">${taskDetails?.sub_total}</Typography>
                    </Box>
                  </Box>

                  <Box className="d-flex align-items-center my-3 px-3">
                    <Box className="col-10">
                      <Typography variant="body2">Service fee</Typography>
                    </Box>

                    <Box className="col-2 mx-2">
                      <Typography variant="body2">${taskDetails?.service_fee}</Typography>
                    </Box>
                  </Box>

                  <Box className="d-flex align-items-center my-3 px-3">
                    <Box className="col-10">
                      <Typography variant="body2">Refund</Typography>
                    </Box>

                    <Box className="col-2 mx-2">
                      <Typography variant="body2">${taskDetails?.refund}</Typography>
                    </Box>
                  </Box>

                  {taskDetails?.tip && (
                    <Box className="d-flex align-items-center my-3 px-3">
                      <Box className="col-10">
                        <Typography variant="body2">Tip</Typography>
                      </Box>

                      <Box className="col-2 mx-2">
                        <Typography variant="body2">${taskDetails?.tip}</Typography>
                      </Box>
                    </Box>
                  )}

                  <Divider light />

                  <Box className="d-flex align-items-center my-3 px-3">
                    <Box className="col-10">
                      <Typography variant="body2" className="fw-600">
                        Total
                      </Typography>
                    </Box>

                    <Box className="col-2 mx-2">
                      <Typography variant="body2" className="fw-600">
                        {`$${taskTotalBudget}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="py-5">
          <GlobalLoader />
        </Box>
      )}
    </Box>
  );
}

export default TaskDetailTabPanel;
