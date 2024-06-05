import * as yup from 'yup';

export const FeaturesInitValues = {
  field_name: '',
  field_type: '',
  max_characters: '',
  gig: '',
  has_word_limit: false,
  is_adhoc_feature: true,
  is_monthly: false,
  is_custom_field: false,
  is_required: true,
  placeholder: '',
  profile: '',
  select_options: [],
  subcategories: [],
};

export const editFeatureValSchema = yup.object({
  field_name: yup.string().max(100, 'Field is too long').required('Required'),
  field_type: yup.string().required('Required'),
  max_characters: yup.number(),
  gig: yup.string().nullable(),
  has_word_limit: yup.bool(),
  is_adhoc_feature: yup.bool(),
  is_monthly: yup.bool(),
  is_custom_field: yup.bool(),
  is_required: yup.bool(),
  placeholder: yup.string(),
  profile: yup.string().nullable(),
  select_options: yup.array(),
  subcategories: yup.string().required('Required'),

});

export const addFeatureValSchema = yup.object({
  field_name: yup.string().max(100, 'Field is too long').required('Required'),
  field_type: yup.string().required('Required'),
  max_characters: yup.number(),
  gig: yup.string().nullable(),
  has_word_limit: yup.bool(),
  is_adhoc_feature: yup.bool(),
  is_monthly: yup.bool(),
  is_custom_field: yup.bool(),
  is_required: yup.bool(),
  placeholder: yup.string(),
  profile: yup.string().nullable(),
  select_options: yup.array(),
  subcategories: yup.array().required('Required'),

});
