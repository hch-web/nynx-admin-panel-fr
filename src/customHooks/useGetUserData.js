import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetUserData = () => {
  const user = useSelector(state => state?.auth.userInfo);
  const userId = useMemo(() => user?.id, [user]);
  const username = useMemo(() => user?.user.username, [user]);
  const email = useMemo(() => user?.user.email, [user]);
  const group = useMemo(() => user?.user.is_superuser, [user]);
  const firstName = useMemo(() => user?.first_name, [user]);
  const lastName = useMemo(() => user?.last_name, [user]);
  const isSuperUser = useMemo(() => user?.user.is_superuser, [user]);

  return { userId, username, email, group, firstName, lastName, isSuperUser };
};

export default useGetUserData;
