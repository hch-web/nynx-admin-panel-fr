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
import { Link } from 'react-router-dom';

// COMPONENTS
import DialogBox from 'containers/common/components/DialogBox';
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';
import AttributeTableHead from './components/AttributeTableHead';

function Attribute() {
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    attribute,
    isFetching,
  } = useGetUtilsHandlers();
  return (
    <>
      <Typography variant="h5" mb={2}>
        Attribute
      </Typography>
      <Paper className="p-3" sx={{ minHeight: '80vh' }}>
        <DialogBox
          isOpen={isDialogOpen}
          title="Are you sure to delete this attribute?"
          handleConfirm={handleDelete}
          handleClose={handleCloseDialog}
        />

        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Stack direction="row" spacing={2}>
            <FilterField label="Search Attribute" name="search" onChange={handleSearchChange} />

            <FilterResetBtn onClick={handleResetFilters} />
          </Stack>

          <Link to="/attribute/add">
            <Button color="primary" variant="contained">
              Add Attribute
            </Button>
          </Link>
        </Stack>
        <Backdrop open={isFetching}>
          <CircularProgress size={80} color="yellow" />
        </Backdrop>
        <TableContainer component={Paper}>
          <Table>
            <AttributeTableHead />

            {attribute?.length > 0 ? (
              <TableBody>
                {attribute?.map(attr => (
                  <TableRow key={attr.id} hover>
                    <TableCell>{attr?.attribute_type ?? 'NA'}</TableCell>

                    <TableCell>{attr?.name ?? 'NA'}</TableCell>

                    <TableCell>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                        <Link
                          to={`/attribute/${attr?.id}/`}
                          state={{ attribute: attr?.name, attributeId: attr?.id }}
                        >
                          <Button variant="outlined" color="info">
                            View Detail
                          </Button>
                        </Link>

                        <Button variant="outlined" color="error" onClick={() => handleOpenDialog(attr.id)}>
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

export default Attribute;
