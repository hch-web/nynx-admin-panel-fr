import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetCategoryByIdQuery } from 'services/private/category';
import { categoryInitValues } from '../utilities/formUtils';

const useGetCategoryData = isAdd => {
  const { id } = useParams();
  const [modifiedData, setModifiedData] = useState([]);
  const [initValues, setInitValues] = useState(categoryInitValues);

  const { data: categoryDetail } = useGetCategoryByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: isAdd,
  });

  useEffect(() => {
    const data = [
      {
        label: 'Image',
        fieldName: 'image',
        value: categoryDetail?.image,
      },
      {
        label: 'Name',
        fieldName: 'name',
      },
    ];
    setModifiedData(data);
    setInitValues(prevState => ({
      ...prevState,
      id: categoryDetail ? categoryDetail?.id : undefined,
      name: categoryDetail ? categoryDetail?.name : '',
      image: categoryDetail ? categoryDetail?.image : undefined,
    }));
  }, [categoryDetail, isAdd]);
  return { modifiedData, initValues };
};

export default useGetCategoryData;
