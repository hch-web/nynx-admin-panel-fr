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
import CategoryTableHead from './components/CategoryTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function Category() {
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    category,
    isFetching,
  } = useGetUtilsHandlers();
  return (
    <>
      <Typography variant="h5" mb={2}>
        Categories
      </Typography>
      <Paper className="p-3" sx={{ minHeight: '80vh' }}>
        <DialogBox
          isOpen={isDialogOpen}
          title="Are you sure to delete this Category?"
          handleConfirm={handleDelete}
          handleClose={handleCloseDialog}
        />

        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Stack direction="row" spacing={2}>
            <FilterField label="Search Category" name="search" onChange={handleSearchChange} />

            <FilterResetBtn onClick={handleResetFilters} />
          </Stack>

          <Link to="/category/add">
            <Button color="primary" variant="contained">
              Add Category
            </Button>
          </Link>
        </Stack>
        <Backdrop open={isFetching}>
          <CircularProgress size={80} color="yellow" />
        </Backdrop>
        <TableContainer component={Paper}>
          <Table>
            <CategoryTableHead />

            {category?.length > 0 ? (
              <TableBody>
                {category?.map(cat => (
                  <TableRow key={cat.id} hover>
                    <TableCell>{cat?.id ?? 'NA'}</TableCell>

                    <TableCell>{cat?.name ?? 'NA'}</TableCell>

                    <TableCell>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                        <Link
                          className="noWrap"
                          style={{ color: '#422438' }}
                          to={`/category/${cat?.id}/`}
                          state={{ category: cat?.name, categoryId: cat?.id }}
                        >
                          <Button variant="outlined" color="info" style={{ color: '#422438' }}>
                            View Detail
                          </Button>
                        </Link>

                        <Button variant="outlined" color="error" onClick={() => handleOpenDialog(cat.id)}>
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

export default Category;
