import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetAttributeByIdQuery } from 'services/private/attribute';
import { useAttributeTypeListQuery } from 'services/private/attributeType';
import { attributeInitValues } from '../utilities/formUtils';

const useGetAttributeData = isAdd => {
  const { id } = useParams();
  const [modifiedData, setModifiedData] = useState([]);
  const [initValues, setInitValues] = useState(attributeInitValues);
  const { data: attributeTypeList } = useAttributeTypeListQuery();
  const { data: attributeDetail } = useGetAttributeByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: isAdd,
  });

  useEffect(() => {
    const data = [
      {
        label: 'Name',
        fieldName: 'name',
      },
      {
        label: 'Attribute Type',
        fieldName: 'attribute_type',
        options: attributeTypeList,
      },
    ];
    setModifiedData(data);
    setInitValues(prevState => ({
      ...prevState,
      id: attributeDetail ? attributeDetail?.id : '',
      name: attributeDetail ? attributeDetail?.name : '',
      attribute_type: attributeDetail ? attributeDetail?.attribute_type : '',
    }));
  }, [attributeDetail, isAdd]);
  return { modifiedData, initValues };
};

export default useGetAttributeData;
