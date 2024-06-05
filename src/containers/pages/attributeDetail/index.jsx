import React, { useMemo } from 'react';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useAddAttributeMutation, useUpdateAttributeMutation } from 'services/private/attribute';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import ResetBtn from 'shared/ResetBtn';
import { ArrowBackIos } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import FormikSelectField from 'shared/FormikSelectField';
import useGetAttributeData from './customHooks/useGetProfileData';
import { addAttributeValSchema, editAttributeValSchema } from './utilities/formUtils';

function AttributeDetail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const backToAttribute = () => {
    navigate('/attributes');
  };
  const isAdd = useMemo(() => pathname.includes('add'), [pathname]);

  const [updateAttribute, { error: updateError, isSuccess: isUpdateSuccess }] = useUpdateAttributeMutation();
  const [addAttribute, { error: addError, isSuccess: isAddSuccess }] = useAddAttributeMutation();
  const { initValues, modifiedData } = useGetAttributeData(isAdd);
  useHandleApiResponse(addError, isAddSuccess, 'Attribute added successfully!', '/categories');
  useHandleApiResponse(updateError, isUpdateSuccess, 'Attribute updated successfully!', '/categories');

  return (
    <>
      <Box className="d-flex align-items-center" onClick={backToAttribute} sx={{ cursor: 'pointer' }} mb={1}>
        <ArrowBackIos sx={{ fontSize: '16px' }} />
        <Typography variant="body1" color={darkPurple}>
          Back to Attributes
        </Typography>
      </Box>
      <Paper className="p-2 px-4">
        <Formik
          enableReinitialize
          initialValues={initValues}
          validationSchema={isAdd ? addAttributeValSchema : editAttributeValSchema}
          onSubmit={async values => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('attribute_type', values.attribute_type);

            if (!isAdd) {
              await updateAttribute({ payload: values, id: values.id });
              return;
            }

            await addAttribute(values);
          }}
        >
          {() => (
            <Form>
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Stack direction="row" spacing={2}>
                  <Typography mb={4} variant="h5">
                    Attribute Detail
                  </Typography>
                </Stack>
              </Stack>
              <Grid container alignItems="center" mb={4} columnSpacing={3} rowGap={3}>
                {modifiedData?.map(item => (
                  <Grid key={item.label} item xs={12} md={6} lg={6}>
                    {item?.options ? (
                      <FormikSelectField
                        label={item.label}
                        disabled={item.disabled ?? false}
                        name={item.fieldName}
                        variant="outlined"
                        options={item?.options}
                      />
                    ) : (
                      <FormikField
                        label={item.label}
                        disabled={item.disabled ?? false}
                        name={item.fieldName}
                        variant="outlined"
                        type={item.type || 'text'}
                      />
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
