import React from 'react';
import {
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
import { Link, useParams } from 'react-router-dom';

// COMPONENTS
import DialogBox from 'containers/common/components/DialogBox';
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import FeaturesTableHead from './components/FeatureTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function Features() {
  const { subId } = useParams();
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    feature,
    isFetching,
  } = useGetUtilsHandlers();
  return (
    <>
      <Typography variant="h5" mb={2}>
        Price & scope (Features)
      </Typography>
      <Paper className="p-3" sx={{ minHeight: '80vh' }}>
        <DialogBox
          isOpen={isDialogOpen}
          title="Are you sure to delete this Feature?"
          handleConfirm={handleDelete}
          handleClose={handleCloseDialog}
        />

        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Stack direction="row" spacing={2}>
            <FilterField label="Search Features" name="search" onChange={handleSearchChange} />

            <FilterResetBtn onClick={handleResetFilters} />
          </Stack>

          <Link to={subId ? `/features/${subId}/add` : '/feature/add'}>
            <Button color="primary" variant="contained">
              Add Feature
            </Button>
          </Link>
        </Stack>
        <Backdrop open={isFetching}>
          <CircularProgress size={80} color="yellow" />
        </Backdrop>
        <TableContainer component={Paper}>
          <Table>
            <FeaturesTableHead />

            {feature?.length > 0 ? (
              <TableBody>
                {feature?.map(val => (
                  <TableRow key={val.id} hover>
                    <TableCell>{val?.id ?? 'NA'}</TableCell>

                    <TableCell>{val?.field_name ?? 'NA'}</TableCell>
                    <TableCell>{val?.field_type ?? 'NA'}</TableCell>
                    <TableCell>
                      {val?.is_required ? (
                        <CheckCircleOutline color="success" />
                      ) : (
                        <HighlightOff color="error" />
                      )}
                    </TableCell>
                    <TableCell>{val?.subcategory ?? 'NA'}</TableCell>
                    <TableCell>
                      {val?.has_word_limit ? (
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
                          to={subId ? `/features/${subId}/${val?.id}` : `/feature/${val?.id}/`}
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

export default Features;
