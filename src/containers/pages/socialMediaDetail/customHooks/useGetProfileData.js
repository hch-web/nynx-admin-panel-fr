import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetSocialMediaByIdQuery } from 'services/private/socialMedial';
import { socialMediaInitValues } from '../utilities/formUtils';

const useGetCategoryData = isAdd => {
  const { id } = useParams();
  const [modifiedData, setModifiedData] = useState([]);
  const [initValues, setInitValues] = useState(socialMediaInitValues);

  const { data: socialMediaDetail } = useGetSocialMediaByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: isAdd,
  });

  useEffect(() => {
    const data = [
      {
        label: 'Icon',
        fieldName: 'icon',
        value: socialMediaDetail?.icon
      },
      {
        label: 'Name',
        fieldName: 'name',
        type: 'text'
      },
      {
        label: 'Tag Line',
        fieldName: 'tag_line',
        type: 'text'
      },
      {
        label: 'Is Connected',
        fieldName: 'is_connected',
        type: 'checkbox'
      }

    ];
    setModifiedData(data);
    setInitValues(prevState => ({
      ...prevState,
      id: socialMediaDetail?.id ? socialMediaDetail?.id : undefined,
      name: socialMediaDetail?.name ? socialMediaDetail?.name : '',
      tag_line: socialMediaDetail?.tag_line ? socialMediaDetail?.tag_line : '',
      icon: socialMediaDetail?.icon,
      is_connected: socialMediaDetail?.is_connected ? socialMediaDetail?.is_connected : false,

    }));
  }, [socialMediaDetail, isAdd]);
  return { modifiedData, initValues };
};

export default useGetCategoryData;
