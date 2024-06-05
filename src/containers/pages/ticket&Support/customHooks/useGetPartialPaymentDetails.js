import { useEffect, useState } from 'react';

const useGetPartialPaymentDetails = data => {
  const [partialPaymentData, setpartialPaymentData] = useState([]);

  useEffect(() => {
    if (data) {
      const modifiedpartialPaymentDataData = [
        {
          label: 'Dispute ID',
          value: data.dispute,
        },
        {
          label: 'Status',
          value: data.status,
        },
        {
          label: 'Amount For Client',
          value: data.amount_for_client,
        },
        {
          label: 'Amount For Freelancer',
          value: data.amount_for_freelancer,
        },
        {
          label: 'Reason',
          value: data.reason,
        },
      ];

      setpartialPaymentData(modifiedpartialPaymentDataData);
    }
  }, [data]);

  return partialPaymentData;
};

export default useGetPartialPaymentDetails;
