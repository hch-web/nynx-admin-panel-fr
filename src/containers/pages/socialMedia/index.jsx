import React from 'react';
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

// COMPONENTS
import DialogBox from 'containers/common/components/DialogBox';
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import SocialMediaTableHead from './components/SocialMediaTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function SocialMedia() {
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    socialMedia,
    isFetching,
  } = useGetUtilsHandlers();
  return (
    <>
      <Typography variant="h5" mb={2}>
        Social Media
      </Typography>
      <Paper className="p-3" sx={{ minHeight: '80vh' }}>
        <DialogBox
          isOpen={isDialogOpen}
          title="Are you sure to delete this Social media?"
          handleConfirm={handleDelete}
          handleClose={handleCloseDialog}
        />

        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Stack direction="row" spacing={2}>
            <FilterField label="Search social media" name="search" onChange={handleSearchChange} />

            <FilterResetBtn onClick={handleResetFilters} />
          </Stack>

          <Link to="/social-media/add">
            <Button color="primary" variant="contained">
              Add Social media
            </Button>
          </Link>
        </Stack>
        <Backdrop open={isFetching}>
          <CircularProgress size={80} color="yellow" />
        </Backdrop>
        <TableContainer component={Paper}>
          <Table>
            <SocialMediaTableHead />

            {socialMedia?.length > 0 ? (
              <TableBody>
                {socialMedia?.map(val => (
                  <TableRow key={val.id} hover>
                    <TableCell>{val?.id ?? 'NA'}</TableCell>
                    <TableCell>{val?.name ?? 'NA'}</TableCell>
                    <TableCell>
                      <Avatar src={val?.icon} sx={{ marginLeft: '19px' }} />
                    </TableCell>
                    <TableCell>{val?.tag_line ?? 'NA'}</TableCell>
                    <TableCell>
                      {val?.is_connected ? (
                        <CheckCircleOutline color="success" />
                      ) : (
                        <HighlightOff color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                        <Link
                          className="noWrap"
                          style={{ color: '#422438' }}
                          to={`/social-media/${val?.id}/`}
                        >
                          <Button variant="outlined" color="info" style={{ color: '#422438' }}>
                            View Detail
                          </Button>
                        </Link>

                        <Button variant="outlined" color="error" onClick={() => handleOpenDialog(val.id)}>
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    No Record Found
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default SocialMedia;
