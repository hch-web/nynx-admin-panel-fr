import { useEffect, useState } from 'react';

import { ticketDialogFormInitValues } from '../utilities/formUtils';

const useGetPaymentData = data => {
  const [initValues, setInitValues] = useState(ticketDialogFormInitValues);

  useEffect(() => {
    setInitValues(prevState => ({
      ...prevState,
      reason: data?.reason ?? '',
      amount_for_freelancer: data?.amount_for_freelancer || 0,
      amount_for_client: data?.amount_for_client || 0,
    }));
  }, [data]);
  return { initValues };
};

export default useGetPaymentData;
