import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserByIdQuery } from 'services/private/user';
import { roleOptions } from 'utilities/selectOptions';
import { useSelector } from 'react-redux';
import { profileInitValues } from '../utilities/formUtils';

const useGetProfileData = isAdd => {
  const { id } = useParams();
  const { userInfo } = useSelector(state => state.auth);

  const [modifiedData, setModifiedData] = useState([]);
  const [initValues, setInitValues] = useState(profileInitValues);

  const { data: userProfile } = useGetUserByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: isAdd,
  });

  useEffect(() => {
    const data = [
      {
        label: 'First Name',
        fieldName: 'first_name',
        disabled: +id !== userInfo?.id && !isAdd,
      },
      {
        label: 'Last Name',
        fieldName: 'last_name',
        disabled: +id !== userInfo?.id && !isAdd,
      },
      {
        label: 'Username',
        fieldName: 'username',
        disabled: !isAdd,
      },
      {
        label: 'Email',
        fieldName: 'email',
        disabled: !isAdd,
      },
      {
        label: 'Role',
        fieldName: 'is_superuser',
        options: roleOptions,
        disabled: +id !== userInfo?.id && !isAdd,
        // disabled: +id === userProfile?.id,
      },

      {
        label: isAdd ? 'Password' : 'New Password',
        fieldName: 'password',
        type: 'password',
        disabled: +id !== userInfo?.id && !isAdd,
      },
      {
        label: 'Confirm Password',
        fieldName: 'confirmPassword',
        type: 'password',
        disabled: +id !== userInfo?.id && !isAdd,
      },
    ];

    setModifiedData(data);
    setInitValues(prevState => ({
      ...prevState,
      id: userProfile ? userProfile?.id : '',
      first_name: userProfile ? userProfile?.first_name : '',
      last_name: userProfile ? userProfile?.last_name : '',
      is_superuser: userProfile ? userProfile?.role : '',
      username: userProfile ? userProfile?.user.username : '',
      email: userProfile ? userProfile?.user.email : '',
      password: '',
      confirmPassword: '',
    }));
  }, [userProfile, isAdd]);
  return { modifiedData, initValues };
};

export default useGetProfileData;
