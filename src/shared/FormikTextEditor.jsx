import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useField } from 'formik';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import propTypes from 'prop-types';

// UTILITIES & STYLES
import { defaultConfig } from './utilities/ckEditor';

function FormikTextEditor({
  name,
  disabled,
  config,
  onEnterPress,
  borderless,
  placeholder,
}) {
  const [innerValue, setInnerValue] = useState('');
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  useEffect(() => {
    if (value !== null || value !== undefined) {
      setInnerValue(value);
    }
  }, [value]);

  const handleChange = useCallback(
    (e, editor) => {
      const data = editor?.data?.get();
      setValue(data);
    },
    [value]
  );

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, [value]);

  return (
    <Box width={1} className={borderless ? 'borderless' : ''}>
      <CKEditor
        editor={ClassicEditor}
        config={{ ...config, placeholder }}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        data={innerValue}
        onReady={editor => {
          if (onEnterPress) {
            editor.keystrokes.set('Enter', onEnterPress);
          }
        }}
      />

      {error && touched && (
        <Typography variant="caption" className="text-danger">
          {error}
        </Typography>
      )}
    </Box>
  );
}

FormikTextEditor.propTypes = {
  name: propTypes.string.isRequired,
  disabled: propTypes.bool,
  borderless: propTypes.bool,
  placeholder: propTypes.string,
  config: propTypes.object,
  onEnterPress: propTypes.func,
};

FormikTextEditor.defaultProps = {
  onEnterPress: null,
  config: defaultConfig,
  disabled: false,
  borderless: false,
  placeholder: '',
};

export default FormikTextEditor;
