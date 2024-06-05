import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { FileUpload } from '@mui/icons-material';
import { v4 } from 'uuid';

// COMPONENTS & UTILS
import FileAttachments from 'containers/common/components/FileAttachments';
import { isValidDocOrImage } from 'utilities/helpers';
import { acceptedFileTypes } from 'utilities/constants';
import {
  useDeleteFileMutation,
  useUploadFileMutation,
} from 'services/private/ticketAndSupport';

function FormikFileAttachments({ name, onChange, isMultiple, isDisabled }) {
  const [innerValue, setInnerValue] = useState([]);
  const inputRef = useRef(null);
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { error, touched } = meta;
  const { setValue, setError, setTouched } = helpers;
  const [uploading, setUploading] = useState(false);
  const [uploadFile] = useUploadFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const { isSubmitting, setSubmitting } = useFormikContext();

  const isLoading = isSubmitting || uploading;
  const maxFiles = 5;

  useEffect(() => {
    if (value !== undefined || value !== null) {
      setInnerValue(value);
    } else {
      setInnerValue([]);
    }
  }, [value]);

  const handleChange = useCallback(
    async e => {
      const files = [...(e?.target?.files || [])]
        .slice(0, maxFiles)
        .map(file => ({ uuid: v4(), file, url: '', id: '' }));

      if (files?.length > 0) {
        let valid = true;
        files.forEach(item => {
          const isValid = isValidDocOrImage(item?.file?.type);
          if (!isValid) {
            valid = false;
          }
        });

        if (!valid) {
          setTouched(true);

          setTimeout(() => {
            setError(
              'Only .doc, .docx, .pdf, .ppt, .xls, xlsx, .txt and images are allowed!'
            );
          }, 200);

          return;
        }

        setValue([...(value || []), ...files]);
        setUploading(true);
        setSubmitting(true);

        const updatedFormFiles = [];
        const promises = files.map(item => ({ handler: uploadFile, item }));

        const resHandler = (result, item) => {
          if (result?.data) {
            updatedFormFiles.push({
              ...item,
              url: result.data?.image,
              id: result.data?.id,
            });
          }
          return result;
        };

        await Promise.all(
          promises.map(({ handler, item }) => handler(item.file).then(res => resHandler(res, item)))
        );

        setValue([...(value || []), ...updatedFormFiles]);
        setSubmitting(false);
        setUploading(false);
      }

      if (onChange) onChange(files, name, e);
    },
    [value]
  );

  const handleClearFile = useCallback(
    index => {
      const updated = innerValue.filter((item, idx) => index !== idx);
      setInnerValue(updated);
      setValue(updated);

      if (innerValue[index]?.id) {
        deleteFile(innerValue[index]?.id);
      }
    },
    [innerValue]
  );

  return (
    <Box width={1}>
      <input
        value=""
        ref={inputRef}
        name={name}
        accept={acceptedFileTypes}
        type="file"
        onChange={handleChange}
        hidden
        multiple={isMultiple}
      />

      <Stack direction="row" alignItems="center" gap={1}>
        <IconButton
          title={`Upload files (upto ${maxFiles})`}
          size="small"
          disabled={isLoading || isDisabled}
          onClick={() => inputRef.current?.click()}
        >
          <FileUpload />
        </IconButton>
      </Stack>

      {error && touched && <Typography variant="error">{error}</Typography>}

      <FileAttachments data={innerValue} onClear={isLoading ? null : handleClearFile} />
    </Box>
  );
}

FormikFileAttachments.propTypes = {
  name: propTypes.string.isRequired,
  onChange: propTypes.func,
  isMultiple: propTypes.bool,
  isDisabled: propTypes.bool,
};

FormikFileAttachments.defaultProps = {
  onChange: () => {},
  isMultiple: false,
  isDisabled: false,
};

export default FormikFileAttachments;
