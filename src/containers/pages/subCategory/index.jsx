import React from 'react';
import {
  Backdrop,
  Box,
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
import { Link, useNavigate, useParams } from 'react-router-dom';

// COMPONENTS
import DialogBox from 'containers/common/components/DialogBox';
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import { useTheme } from '@emotion/react';
import { ArrowBackIos } from '@mui/icons-material';
import SubCategoryTableHead from './components/subCategoryTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function SubCategories() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    subCategory,
    isFetching,
  } = useGetUtilsHandlers();
  const backToCategory = () => {
    navigate(`/category/${id}`);
  };
  return (
    <>
      <Box className="d-flex align-items-center" onClick={backToCategory} sx={{ cursor: 'pointer' }} mb={1}>
        <ArrowBackIos sx={{ fontSize: '16px' }} />
        <Typography variant="body1" color={darkPurple}>
          Back to Category
        </Typography>
      </Box>
      <Paper className="p-3" sx={{ minHeight: '80vh' }}>
        <DialogBox
          isOpen={isDialogOpen}
          title="Are you sure to delete this sub category?"
          handleConfirm={handleDelete}
          handleClose={handleCloseDialog}
        />
        <Typography variant="h5" mb={3}>
          Sub Categories
        </Typography>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Stack direction="row" spacing={2}>
            <FilterField label="Search sub category" name="search" onChange={handleSearchChange} />

            <FilterResetBtn onClick={handleResetFilters} />
          </Stack>

          <Link to={`/category/${id}/subcategory/add`}>
            <Button color="primary" variant="contained">
              Add sub category
            </Button>
          </Link>
        </Stack>
        <Backdrop open={isFetching}>
          <CircularProgress size={80} color="yellow" />
        </Backdrop>
        <TableContainer component={Paper}>
          <Table>
            <SubCategoryTableHead />

            {subCategory?.length > 0 ? (
              <TableBody>
                {subCategory?.map(val => (
                  <TableRow key={val.id} hover>
                    {/* <TableCell>{index + 1}</TableCell> */}

                    <TableCell>{val?.id ?? 'NA'}</TableCell>

                    <TableCell>{id ?? 'NA'}</TableCell>

                    <TableCell>{val?.name ?? 'NA'}</TableCell>

                    <TableCell>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                        <Link
                          className="noWrap"
                          style={{ color: '#422438' }}
                          to={`/category/${id}/subcategory/${val.id}`}
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

export default SubCategories;
