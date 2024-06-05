import React from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import propTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router';

// API HOOKS
import { useClientRequirementsListQuery } from 'services/private/requirements';

// STYLES
import styles from 'styles/mui/containers/workspace-general.module.scss';

// UTILITIES & COMPONENTS
import { formatFileSize, setIconByFileType } from 'utilities/helpers';
import { CLIENT_ORDER, DIRECT_HIRE, JOB_OFFER } from 'utilities/constants';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';

function TaskDetailsRequirementsTabPanel({ gigId }) {
  const theme = useTheme();
  const { taskVia, taskId } = useParams();

  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const orderVia = taskVia === DIRECT_HIRE ? CLIENT_ORDER : JOB_OFFER;

  // API HOOKS
  const {
    data: clientRequirementsData,
    isLoading,
    isFetching,
  } = useClientRequirementsListQuery({ gigId, orderVia, taskId }, { skip: !(gigId && orderVia && taskId) });

  return (
    <Box className="bg-white mt-2" sx={{ borderRadius: '10px' }}>
      {/* HEADER */}
      <Box className="px-4 py-3">
        <Typography variant="h6" color={darkPurple} className="fw-500">
          Requirements
        </Typography>
      </Box>

      <Divider light />

      {/* LIST ITEM */}
      <Box className={`px-3 pt-2 ${styles.listItems}`}>
        {!(isFetching || isLoading) ? (
          <ol>
            {clientRequirementsData?.length > 0 ? (
              clientRequirementsData?.map((item, idx, { length }) => (
                <li key={item.id} className="breakAll">
                  <Box className="d-flex align-items-center justify-content-between">
                    <Typography variant="body1" className="fw-500" color={darkPurple}>
                      {item?.requirement_description}
                    </Typography>
                  </Box>

                  <Typography variant="body1" className="text-muted">
                    {item.description || 'No Description Added!'}
                  </Typography>

                  <Box className="d-flex flex-wrap align-items-center mt-3 gap-4">
                    {item?.attachments?.map(file => (
                      <Box
                        className="col-auto d-flex align-items-center pointer"
                        key={file?.id}
                        onClick={() => saveAs(file?.attachment)}
                      >
                        <img
                          className={styles.fileIcon}
                          src={setIconByFileType(file?.attachment || '')}
                          alt="icon"
                        />

                        <Box>
                          <Typography variant="body2" className="fw-500">
                            {`${file?.file_name?.slice(0, 10)}`}
                          </Typography>

                          <Typography variant="body2" className="text-muted">
                            {formatFileSize(file?.file_size || 0)}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {idx + 1 !== length && <Divider className="my-2" light />}
                </li>
              ))
            ) : (
              <Box>No Record Found!</Box>
            )}
          </ol>
        ) : (
          <Box>
            <GlobalLoader />
          </Box>
        )}
      </Box>
    </Box>
  );
}

TaskDetailsRequirementsTabPanel.propTypes = {
  gigId: propTypes.number,
};

TaskDetailsRequirementsTabPanel.defaultProps = {
  gigId: null,
};

export default TaskDetailsRequirementsTabPanel;
