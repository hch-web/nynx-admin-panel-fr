import React from 'react';
import { Box, useTheme, Typography, Avatar, Stack, Button, Backdrop, CircularProgress } from '@mui/material';
import { Star } from '@mui/icons-material';
// styles
import { gigImageStyles, profileImageStyles } from 'styles/containers/proposal';
import { useDeleteJobOfferTaskMutation, useGetSubmittedProposalQuery } from 'services/private/freelancer';

// utilities
import { formatName, formatTimeline } from 'utilities/helpers';
import { PROJECT_BASED, FIXED, MONTHLY } from 'utilities/constants';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useParams } from 'react-router-dom';

function Proposal() {
  const theme = useTheme();
  const { id } = useParams();
  const { data: proposalList = [], isFetching } = useGetSubmittedProposalQuery(id, { skip: !id });

  const colors = theme.palette;
  const lightGrey = colors.grey.light;
  const darkGrey = colors.grey.dark;
  const lightOrange = colors.lightOrange.main;

  const [blockProposal, { error, isSuccess }] = useDeleteJobOfferTaskMutation();
  useHandleApiResponse(error, isSuccess, 'status updated successfully!', false);

  // constants

  const borderStyles = { border: `1px solid ${lightGrey}` };
  const handleBlock = body => {
    blockProposal(body);
  };
  return (
    <Box className="mt-4">
      {proposalList.length > 0 ? (
        proposalList?.map(proposal => {
          const firstName = proposal?.first_name;
          const lastName = proposal?.last_name;
          const userName = proposal?.username;
          const rating = proposal?.rating || 0;
          const reviewCount = proposal?.review_count || 0;

          const isAdhoc = proposal?.budget_type === PROJECT_BASED;
          const budgetType = isAdhoc ? FIXED : MONTHLY;
          return (
            <Box className="col-12 px-4">
              <Backdrop open={isFetching}>
                <CircularProgress size={80} color="yellow" />
              </Backdrop>
              <Box className="row common-border p-3 mb-2" sx={borderStyles}>
                <Stack direction="row" justifyContent="end">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleBlock({
                      id: proposal.id,
                      status: proposal?.job_offer_status === 'unblocked' ? 'blocked' : 'unblocked',
                    })}
                  >
                    {proposal?.job_offer_status === 'unblocked' ? 'Deactivate' : 'Activate'}
                  </Button>
                </Stack>
                <Box className="col-xl-2 col-lg-4 col-sm-4 col-xs-4">
                  <Box
                    sx={{
                      background: `url(${proposal?.gig_main_image}) center no-repeat`,
                      ...gigImageStyles,
                    }}
                  />
                </Box>
                <Box className="col-xl-9 col-lg-12">
                  <Typography variant="dashboardh3" className="mb-1 weight-600">
                    {proposal?.gig_title}
                  </Typography>

                  <Box className="my-1 d-flex align-items-center">
                    <Star sx={{ color: lightOrange }} />
                    <Typography variant="caption1" color={darkGrey}>
                      {rating} ( {reviewCount} Reviews )
                    </Typography>
                  </Box>

                  <Box className="d-flex flex-wrap justify-content-between align-items-center my-2 w-50">
                    <Box className="d-flex">
                      <Avatar
                        src={proposal?.client_image}
                        alt={formatName(firstName, lastName, userName)}
                        sx={profileImageStyles}
                      />
                      <Box className="d-flex flex-column  justify-content-center ms-1">
                        <Typography variant="body2" className="fw-bold">
                          {formatName(firstName, lastName, userName)}
                        </Typography>
                        <Typography variant="body2" color={darkGrey}>
                          Top rated
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" className="fw-bold">
                        $ {proposal?.rates}
                      </Typography>
                      <Typography variant="body2" color={darkGrey}>
                        {budgetType}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" className="fw-bold">
                        {formatTimeline(proposal?.timeline, proposal?.budget_type)}
                      </Typography>
                      <Typography variant="body2" color={darkGrey}>
                        Delivery
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" className="my-2 responsive-text" color={darkGrey}>
                    {proposal?.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography className="text-center" variant="body1">
          No Record Found!
        </Typography>
      )}
    </Box>
  );
}

export default Proposal;
