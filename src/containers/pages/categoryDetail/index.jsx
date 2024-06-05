import React, { useMemo, useState, useRef } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useAddCategoryMutation, useUpdateCategoryMutation } from 'services/private/category';
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
import useGetCategoryData from './customHooks/useGetProfileData';
import { addCategoryValSchema, editCategoryValSchema } from './utilities/formUtils';

function CategoryDetail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const inputRef = useRef(null);
  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const backToCategory = () => {
    navigate('/categories');
  };
  const { enqueueSnackbar } = useSnackbar();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const isAdd = useMemo(() => pathname.includes('add'), [pathname]);
  const [updateCategory, { error: updateError, isSuccess: isUpdateSuccess }] = useUpdateCategoryMutation();
  const [addCategory, { error: addError, isSuccess: isAddSuccess }] = useAddCategoryMutation();
  const { initValues, modifiedData } = useGetCategoryData(isAdd);
  useHandleApiResponse(addError, isAddSuccess, 'Category added successfully!', '/categories');
  useHandleApiResponse(updateError, isUpdateSuccess, 'Category updated successfully!', '/categories');
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

  return (
    <>
      <Box className="d-flex align-items-center" onClick={backToCategory} sx={{ cursor: 'pointer' }} mb={1}>
        <ArrowBackIos sx={{ fontSize: '16px' }} />
        <Typography variant="body1" color={darkPurple}>
          Back to Categories
        </Typography>
      </Box>
      <Paper className="p-2 px-4">
        <Formik
          enableReinitialize
          initialValues={initValues}
          validationSchema={isAdd ? addCategoryValSchema : editCategoryValSchema}
          onSubmit={async values => {
            const formData = new FormData();
            if (croppedImage) {
              const convertedFile = await convertURLToFile(croppedImage);
              formData.append('image', convertedFile);
            }
            formData.append('name', values.name);
            if (!isAdd) {
              await updateCategory({ payload: formData, id: values.id });
            }
            await addCategory(formData);
          }}
        >
          {() => (
            <Form>
              <Stack direction="row" justifyContent="space-between" mb={3} mt={2}>
                <Stack direction="row" spacing={2}>
                  <Typography mb={4} variant="h5">
                    Category Detail
                  </Typography>
                </Stack>
                {!isAdd ? (
                  <Link to={`/category/${id}/subcategory`}>
                    <Button color="primary" variant="contained">
                      view SubCategories
                    </Button>
                  </Link>
                ) : null}
              </Stack>
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
                                croppedImage || item.value || categoryDummyImg
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
                </Stack>
              ))}
              <Stack direction="row" spacing={1} mt={2} mb={2}>
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

export default CategoryDetail;
