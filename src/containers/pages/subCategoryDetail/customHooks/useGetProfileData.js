import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetSubCategoryDetailByIdQuery } from 'services/private/category';
import { categoryInitValues } from '../utilities/formUtils';

const useGetSubCategoryData = isAdd => {
  const { subId } = useParams();

  const [modifiedData, setModifiedData] = useState([]);
  const [initValues, setInitValues] = useState(categoryInitValues);

  const { data: subCategoryDetail } = useGetSubCategoryDetailByIdQuery(subId, {
    refetchOnMountOrArgChange: true,
    skip: isAdd,
  });

  useEffect(() => {
    const data = [
      {
        label: 'Image',
        fieldName: 'image',
        value: subCategoryDetail?.image,
      },
      {
        label: 'Name',
        fieldName: 'name',
      },
      {
        label: ' Number of Gigs',
        fieldName: 'number_of_freelancers',
      },
    ];
    setModifiedData(data);
    setInitValues(prevState => ({
      ...prevState,
      id: subCategoryDetail ? subCategoryDetail?.id : '',
      // category: categoryDetail ? categoryDetail?.name : '',
      name: subCategoryDetail ? subCategoryDetail?.name : '',
      image: subCategoryDetail ? subCategoryDetail?.image : '',
      number_of_freelancers: subCategoryDetail ? subCategoryDetail?.number_of_freelancers : 0,
    }));
  }, [subCategoryDetail, isAdd]);
  return { modifiedData, initValues };
};

export default useGetSubCategoryData;
