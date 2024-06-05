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
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import { ADHOC, MONTHLY, PROJECT_BASED } from 'utilities/constants';
import SkillsTableHead from './components/SkillsTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function Skills() {
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    skills,
    isFetching,
  } = useGetUtilsHandlers();
  return (
    <>
      <Typography variant="h5" mb={2}>
        Job Skills
      </Typography>
      <Paper className="p-3" sx={{ minHeight: '80vh' }}>
        <DialogBox
          isOpen={isDialogOpen}
          title="Are you sure to delete this job skill?"
          handleConfirm={handleDelete}
          handleClose={handleCloseDialog}
        />

        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Stack direction="row" spacing={2}>
            <FilterField label="Search Skills" name="search" onChange={handleSearchChange} />

            <FilterResetBtn onClick={handleResetFilters} />
          </Stack>
        </Stack>
        <Backdrop open={isFetching}>
          <CircularProgress size={80} color="yellow" />
        </Backdrop>
        <TableContainer component={Paper}>
          <Table>
            <SkillsTableHead />

            {skills?.length > 0 ? (
              <TableBody>
                {skills?.map(val => (
                  <TableRow key={val.id} hover>
                    <TableCell>{val?.id ?? 'NA'}</TableCell>

                    <TableCell>{val?.title ?? 'NA'}</TableCell>
                    <TableCell>{val?.budget_type === PROJECT_BASED ? ADHOC : MONTHLY}</TableCell>
                    <TableCell>{val?.budget_amount ?? 'NA'}</TableCell>
                    <TableCell>{val?.category ?? 'NA'}</TableCell>
                    <TableCell>{val?.sub_category ?? 'NA'}</TableCell>
                    <TableCell>
                      {val?.is_hired ? (
                        <CheckCircleOutline color="success" />
                      ) : (
                        <HighlightOff color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      {val?.is_closed ? (
                        <CheckCircleOutline color="success" />
                      ) : (
                        <HighlightOff color="error" />
                      )}
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                        <Link className="noWrap" style={{ color: '#422438' }} to={`/skill/${val?.id}/`}>
                          <Button variant="outlined" color="info" style={{ color: '#422438' }}>
                            View Detail
                          </Button>
                        </Link>

                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpenDialog({
                            id: val.id,
                            status: val.skill_status === 'blocked' ? 'unblocked' : 'blocked',
                          })}
                        >
                          {val.skill_status === 'blocked' ? 'Activate' : 'Deactivate'}
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

export default Skills;
