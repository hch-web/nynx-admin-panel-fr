import React, { useMemo, useState, useRef } from 'react';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useAddSocialMediaMutation, useUpdateSocialMediaMutation } from 'services/private/socialMedial';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { basicInfoModalAvatarStyles } from 'styles/containers/profile';
import ResetBtn from 'shared/ResetBtn';
import { useSnackbar } from 'notistack';
import categoryDummyImg from 'assets/dummy-gig-Image.jpg';
import { ArrowBackIos } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import FormikCheckBox from 'shared/FormikCheckBox';
import { getUploadedImage } from 'utilities/utility-functions';
import useGetCategoryData from './customHooks/useGetProfileData';
import { addSocialMediaValSchema, editSocialMediaValSchema } from './utilities/formUtils';

function SocialDetail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const inputRef = useRef(null);
  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const backToSocialMedia = () => {
    navigate('/social-media');
  };
  const { enqueueSnackbar } = useSnackbar();
  const [uploadedImage, setUploadedImage] = useState(null);
  // const [croppedImage, setCroppedImage] = useState(null);
  const isAdd = useMemo(() => pathname.includes('add'), [pathname]);

  const [updateSocialMedia, { error: updateError, isSuccess: isUpdateSuccess }] =
    useUpdateSocialMediaMutation();
  const [addSocialMedia, { error: addError, isSuccess: isAddSuccess }] = useAddSocialMediaMutation();
  const { initValues, modifiedData } = useGetCategoryData(isAdd);
  useHandleApiResponse(addError, isAddSuccess, 'Social Media added successfully!', '/social-media');
  useHandleApiResponse(updateError, isUpdateSuccess, 'Social Media updated successfully!', '/social-media');

  const handleChange = e => {
    const file = e.target.files[0];

    if (file?.size > 1024 * 1024) {
      enqueueSnackbar("Image size shouldn't be more than 1MB", { variant: 'error' });
    } else {
      if (!file.type.includes('image')) {
        enqueueSnackbar('Unsupported Format. Please upload image file!', { variant: 'error' });
        setUploadedImage(null);
        return;
      }
      setUploadedImage(file);
    }
  };

  return (
    <>
      <Box
        className="d-flex align-items-center"
        onClick={backToSocialMedia}
        sx={{ cursor: 'pointer' }}
        mb={1}
      >
        <ArrowBackIos sx={{ fontSize: '16px' }} />
        <Typography variant="body1" color={darkPurple}>
          Back to Social Media
        </Typography>
      </Box>
      <Paper className="p-2 px-4">
        <Formik
          enableReinitialize
          initialValues={initValues}
          validationSchema={isAdd ? addSocialMediaValSchema : editSocialMediaValSchema}
          onSubmit={async values => {
            const formData = new FormData();
            if (uploadedImage) {
              formData.append('icon', uploadedImage);
            }
            formData.append('name', values.name);
            formData.append('is_connected', values.is_connected);
            formData.append('tag_line', values.tag_line);

            if (!isAdd) {
              await updateSocialMedia({ payload: formData, id: values.id });
              return;
            }

            await addSocialMedia(formData);
          }}
        >
          {() => (
            <Form>
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Stack direction="row" spacing={2}>
                  <Typography mb={4} variant="h5">
                    Social Media Detail
                  </Typography>
                </Stack>
              </Stack>
              {/* <Grid container alignItems="center" mb={4} columnSpacing={3} rowGap={3}> */}
              {modifiedData?.map(item => (
                <Stack direction="row" className="px-3" spacing={2} mb={4} key={item?.label}>
                  <Box>
                    {item?.fieldName === 'icon' && (
                      <>
                        <input
                          name="image"
                          hidden
                          ref={inputRef}
                          type="file"
                          accept="image/*"
                          onChange={e => handleChange(e)}
                        />
                        <Box className="text-center px-4">
                          <Box className="d-flex justify-content-start">
                            <Box
                              sx={{
                                background: `url(${
                                  getUploadedImage(uploadedImage) || item.value || categoryDummyImg
                                }) center no-repeat`,
                                ...basicInfoModalAvatarStyles,
                              }}
                              onClick={() => {
                                inputRef?.current.click();
                              }}
                            />
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>

                  {item?.fieldName !== 'icon' && item?.type !== 'checkbox' && (
                    <Grid item lg={12} md={12} sm={12} className="pt-0 px-0 d-flex align-items-center ">
                      <FormikField
                        label={item.label}
                        disabled={item.disabled ?? false}
                        name={item.fieldName}
                        variant="outlined"
                        type={item.type || 'text'}
                      />
                    </Grid>
                  )}
                  {item?.fieldName !== 'icon' && item?.type === 'checkbox' && item?.type !== 'text' && (
                    <Grid item lg={12} md={12} sm={12} className="pt-0 px-0 d-flex align-items-center ">
                      <FormikCheckBox name={item.fieldName} />
                      <Typography className="weight-500">{item.label}</Typography>
                    </Grid>
                  )}
                </Stack>
              ))}

              {/* </Grid> */}
              <Stack direction="row" spacing={1} mt={2} mb={3}>
                <ResetBtn />

                <SubmitBtn btnSize="large" />
              </Stack>
            </Form>
          )}
        </Formik>
        {/* <ImageCropperModal
          isOpenImageCropperModal={isImageCropperModalOpen}
          imageToCrop={uploadedImage}
          toggleImageCroperModal={toggleImageCroperModal}
          setCroppedImage={setCroppedImage}
        /> */}
      </Paper>
    </>
  );
}

export default SocialDetail;
