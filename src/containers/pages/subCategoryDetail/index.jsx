import React, { useMemo, useState, useRef } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useAddSubCategoryMutation, useUpdateSubCategoryMutation } from 'services/private/category';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { convertURLToFile } from 'utilities/helpers';
import { basicInfoModalAvatarStyles } from 'styles/containers/profile';
// import avatarImgURL from 'assets/profile-image-2.png';
import ResetBtn from 'shared/ResetBtn';
import { useSnackbar } from 'notistack';
import categoryDummyImg from 'assets/dummy-gig-Image.jpg';
import { ArrowBackIos } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import ImageCropperModal from '../common/ImageCropperModal';
import useGetSubCategoryData from './customHooks/useGetProfileData';
import { addSubCategoryValSchema, editSubCategoryValSchema } from './utilities/formUtils';

function SubCategoryDetail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { subId } = useParams();
  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const { pathname } = useLocation();
  const inputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const isAdd = useMemo(() => pathname.includes('add'), [pathname]);
  const { id } = useParams();
  const [updateSubCategory, { error: updateError, isSuccess: isUpdateSuccess }] =
    useUpdateSubCategoryMutation();
  const [addSubcategory, { error: addError, isSuccess: isAddSuccess }] = useAddSubCategoryMutation();
  const { initValues, modifiedData } = useGetSubCategoryData(isAdd);
  useHandleApiResponse(
    addError,
    isAddSuccess,
    'Sub category added successfully!',
    `/category/${id}/subcategory`
  );
  useHandleApiResponse(
    updateError,
    isUpdateSuccess,
    'Sub category updated successfully!',
    `/category/${id}/subcategory`
  );
  const [isImageCropperModalOpen, setIsImageCropperModalOpen] = useState(false);
  const toggleImageCroperModal = () => {
    setIsImageCropperModalOpen(!isImageCropperModalOpen);
  };
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
      const createImgUrl = URL.createObjectURL(file);
      setUploadedImage(createImgUrl);
      setIsImageCropperModalOpen(true);
    }
  };
  const backToSubCategory = () => {
    navigate(`/category/${id}/subcategory`);
  };
  return (
    <>
      <Box
        className="d-flex align-items-center"
        onClick={backToSubCategory}
        sx={{ cursor: 'pointer' }}
        mb={1}
      >
        <ArrowBackIos sx={{ fontSize: '16px' }} />
        <Typography variant="body1" color={darkPurple}>
          Back to Sub Categories
        </Typography>
      </Box>
      <Paper className="p-2 px-4">
        <Formik
          enableReinitialize
          initialValues={initValues}
          validationSchema={isAdd ? addSubCategoryValSchema : editSubCategoryValSchema}
          onSubmit={async values => {
            const formData = new FormData();
            if (croppedImage) {
              const convertedFile = await convertURLToFile(croppedImage);
              formData.append('image', convertedFile);
            }
            formData.append('name', values.name);
            formData.append('number_of_freelancers', values.number_of_freelancers);
            formData.append('category', id);
            if (!isAdd) {
              // await updateSubCategory({ name: values.name, id: values.id, category: id });
              await updateSubCategory({ payload: formData, id: values.id });
              return;
            }

            await addSubcategory(formData);
          }}
        >
          {() => (
            <Form>
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Stack direction="row" spacing={2}>
                  <Typography mb={4} variant="h5">
                    Sub Category Detail
                  </Typography>
                </Stack>
                <Link to={`/features/${subId}`}>
                  <Button color="primary" variant="contained">
                    View Price and Scope
                  </Button>
                </Link>
              </Stack>

              {/* <Grid container alignItems="center" mb={4} columnSpacing={3} rowGap={3}> */}
              {modifiedData?.map(item => (
                <Stack direction="row" className="px-3" spacing={2} mb={4} key={item?.label}>
                  {item?.fieldName !== 'image' ? (
                    <FormikField
                      label={item.label}
                      disabled={item.disabled ?? false}
                      name={item.fieldName}
                      variant="outlined"
                      type={item.type || 'text'}
                    />
                  ) : (
                    <>
                      <input
                        name="image"
                        hidden
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={e => handleChange(e)}
                      />
                      <Box className="text-center">
                        <Box className="d-flex align-items-start justify-content-start">
                          <Box
                            sx={{
                              background: `url(${
                                item.value || croppedImage || categoryDummyImg
                              }) center no-repeat`,
                              ...basicInfoModalAvatarStyles,
                            }}
                            onClick={() => {
                              inputRef?.current.click();
                            }}
                          />
                        </Box>
                        {/* {errors.image && touched.image && (
              <Typography variant="body1" className="text-danger">
                {errors.image}
              </Typography>
            )} */}
                      </Box>
                    </>
                  )}
                </Stack>
              ))}
              {/* </Grid> */}

              <Stack direction="row" spacing={1}>
                <ResetBtn />

                <SubmitBtn btnSize="large" />
              </Stack>
            </Form>
          )}
        </Formik>
        <ImageCropperModal
          isOpenImageCropperModal={isImageCropperModalOpen}
          imageToCrop={uploadedImage}
          toggleImageCroperModal={toggleImageCroperModal}
          setCroppedImage={setCroppedImage}
        />
      </Paper>
    </>
  );
}

export default SubCategoryDetail;
