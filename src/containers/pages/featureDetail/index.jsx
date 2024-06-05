import React, { useMemo } from 'react';
import { Backdrop, Box, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useAddFeaturesMutation, useUpdateFeaturesMutation } from 'services/private/features';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import ResetBtn from 'shared/ResetBtn';
import { ArrowBackIos } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import FormikSelectField from 'shared/FormikSelectField';
import FormikCheckBox from 'shared/FormikCheckBox';
import styles from 'styles/mui/containers/feature.module.scss';
import useGetFeatureData from './customHooks/useGetFeatureData';
import { addFeatureValSchema, editFeatureValSchema } from './utilities/formUtils';

function AttributeDetail() {
  const theme = useTheme();
  const { subId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const backToFeatures = () => {
    navigate(subId ? `/features/${subId}` : '/features');
  };
  const isAdd = useMemo(() => pathname.includes('add'), [pathname]);

  const [updateFeatures, { error: updateError, isSuccess: isUpdateSuccess }] = useUpdateFeaturesMutation();
  const [addFeatures, { error: addError, isSuccess: isAddSuccess }] = useAddFeaturesMutation();
  const { initValues, modifiedData, isGigFetching, isSubCategoryFetching, isUserFetching, isFetching } =
    useGetFeatureData(isAdd);
  useHandleApiResponse(
    addError,
    isAddSuccess,
    'Features added successfully!',
    subId ? `/features/${subId}` : '/features'
  );
  useHandleApiResponse(
    updateError,
    isUpdateSuccess,
    'Features updated successfully!',
    subId ? `/features/${subId}` : '/features'
  );
  const handleAddTags = (e, formValues, setValue) => {
    const options = [...formValues, e.target.value];
    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        e.preventDefault();
        setValue('select_options', options);
        e.target.value = '';
      }
    }
  };
  const handleRemoveTage = (values, e, setValue, index) => {
    const newTags = values?.filter((item, i) => i !== index);
    setValue('select_options', newTags);
  };
  return (
    <>
      <Box className="d-flex align-items-center" onClick={backToFeatures} sx={{ cursor: 'pointer' }} mb={1}>
        <ArrowBackIos sx={{ fontSize: '16px' }} />
        <Typography variant="body1" color={darkPurple}>
          Back to Features
        </Typography>
      </Box>
      <Paper className="p-2 px-4">
        <Backdrop open={isGigFetching || isSubCategoryFetching || isUserFetching || isFetching}>
          <CircularProgress size={80} color="yellow" />
        </Backdrop>
        <Formik
          enableReinitialize
          initialValues={initValues}
          validationSchema={isAdd ? addFeatureValSchema : editFeatureValSchema}
          onSubmit={async values => {
            console.log('values', values);
            if (!isAdd) {
              const updatedValues = {
                ...values,
                subcategory: values.subcategories.toString(),
                subcategories: undefined
              };
              await updateFeatures({ payload: updatedValues, id: values.id });
              return;
            }
            await addFeatures(values);
          }}
        >
          {({ setFieldValue: setCurrentFieldValue, values: formValues }) => (
            <Form>
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Stack direction="row" spacing={2}>
                  <Typography mb={4} variant="h5">
                    Feature Detail
                  </Typography>
                </Stack>
              </Stack>
              <Grid container alignItems="center" mb={4} columnSpacing={3} rowGap={3}>
                {modifiedData?.map(item => (
                  <Grid key={item.label} item xs={12} md={6} lg={6}>
                    {item?.options ? (
                      <FormikSelectField
                        label={item.label}
                        multiple={item.fieldName === 'subcategories' && isAdd}
                        disabled={item.disabled ?? false}
                        name={item.fieldName}
                        variant="outlined"
                        options={
                          !isGigFetching || !isSubCategoryFetching || !isUserFetching ? item?.options : []
                        }
                      />
                    ) : (
                      <Box>
                        {item?.type !== 'checkbox' && item.fieldName !== 'select_options' && (
                          <FormikField
                            label={item.label}
                            disabled={item.disabled ?? false}
                            name={item.fieldName}
                            variant="outlined"
                            type={item.type || 'text'}
                          />
                        )}
                      </Box>
                    )}
                    {item?.type === 'checkbox' && (
                      <Grid item lg={12} md={12} sm={12} className="pt-0 px-0 d-flex align-items-center ">
                        <FormikCheckBox name={item.fieldName} />
                        <Typography className="weight-500">{item.label}</Typography>
                      </Grid>
                    )}
                    {item.fieldName === 'select_options' && (
                      <Grid item lg={12} md={12} sm={12} className="d-flex align-items-center mt-4 ">
                        <Grid item lg={12} md={12} sm={12} className="d-flex flex-column align-items-start">
                          <Typography className="weight-500" mb={1}>
                            Select Options
                          </Typography>
                          <input
                            type="text"
                            className={styles.customTextField}
                            onKeyDown={e => handleAddTags(e, formValues.select_options, setCurrentFieldValue)}
                          />
                          <Box className="d-flex align-items-start flex-wrap my-3 gap-2">
                            {formValues.select_options?.map((val, index) => (
                              <Chip
                                key={index}
                                label={val}
                                variant="outlined"
                                onDelete={e => {
                                  handleRemoveTage(formValues.select_options, e, setCurrentFieldValue, index);
                                }}
                              />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                ))}
              </Grid>
              <Stack direction="row" spacing={1}>
                <ResetBtn />

                <SubmitBtn btnSize="large" />
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
}

export default AttributeDetail;
