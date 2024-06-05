import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetFeatureByIdQuery } from 'services/private/features';
import { fieldType } from 'utilities/selectOptions';
import { useGetSubCategoryQuery } from 'services/private/category';
import { useFreelancerListQuery, useGetGigAllListQuery } from 'services/private/freelancer';
import { FeaturesInitValues } from '../utilities/formUtils';

const useGetFeatureData = isAdd => {
  const { data: userList, isFetching: isUserFetching } = useFreelancerListQuery();
  const { data: subCategoryList, isFetching: isSubCategoryFetching } = useGetSubCategoryQuery();
  const { data: gigList, isFetching: isGigFetching } = useGetGigAllListQuery();
  const { id } = useParams();
  const { subId } = useParams();
  const [modifiedData, setModifiedData] = useState([]);
  const [initValues, setInitValues] = useState(FeaturesInitValues);

  const { data: featureDetail, isFetching } = useGetFeatureByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: isAdd,
  });

  useEffect(() => {
    const data = [
      {
        label: 'Field Name',
        fieldName: 'field_name',
      },
      {
        label: 'Field Type',
        fieldName: 'field_type',
        options: fieldType,
      },
      {
        label: 'Maximum Characters',
        fieldName: 'max_characters',
        type: 'number',
      },
      {
        label: 'Placeholder',
        fieldName: 'placeholder',
        type: 'text',
      },
      {
        label: 'Select Options',
        fieldName: 'select_options',
      },
      {
        label: 'SubCategory',
        fieldName: 'subcategories',
        options: subCategoryList?.map(val => ({
          label: val.name,
          value: val.id,
        })) ?? [],
      },
      {
        label: 'Gigs',
        fieldName: 'gig',
        options: gigList?.results?.map(val => ({
          label: val.title,
          value: val.id,
        })) ?? [],
      },
      {
        label: 'Profile',
        fieldName: 'profile',
        options: userList?.map(val => ({
          label: val.user.username,
          value: val.id,
        })) ?? [],
      },
      {
        label: 'Is Required',
        fieldName: 'is_required',
        type: 'checkbox',
      },
      {
        label: 'Text Limitation',
        fieldName: 'has_word_limit',
        type: 'checkbox',
      },
      {
        label: 'is Adhoc Feature',
        fieldName: 'is_adhoc_feature',
        type: 'checkbox',
      },
      {
        label: 'is Monthly Feature',
        fieldName: 'is_monthly',
        type: 'checkbox',
      },
      {
        label: 'is Custom Field',
        fieldName: 'is_custom_field',
        type: 'checkbox',
      },
    ];
    setModifiedData(data);
    setInitValues(prevState => ({
      ...prevState,
      id: featureDetail?.id ?? undefined,
      field_name: featureDetail?.field_name ?? '',
      field_type: featureDetail?.field_type ?? '',
      gig: !isGigFetching && featureDetail ? featureDetail?.gig : '',
      has_word_limit: featureDetail?.has_word_limit ?? false,
      is_adhoc_feature: featureDetail?.is_adhoc_feature ?? false,
      is_monthly: featureDetail?.is_adhoc_feature === false,
      is_custom_field: featureDetail?.is_custom_field ?? false,
      is_required: featureDetail?.is_required ?? false,
      max_characters: featureDetail?.max_characters ?? 0,
      placeholder: featureDetail?.placeholder ?? '',
      profile: !isUserFetching && featureDetail ? featureDetail?.profile : '',
      select_options: featureDetail?.select_options ?? [],
      subcategories: featureDetail?.subcategory || subId ? [featureDetail?.subcategory || subId] : [],
    }));
  }, [featureDetail, subCategoryList, gigList, userList, isAdd]);
  return { modifiedData, initValues, isGigFetching, isSubCategoryFetching, isUserFetching, isFetching };
};

export default useGetFeatureData;
