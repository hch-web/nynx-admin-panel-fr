import { useEffect, useState } from 'react';

const RefundToClientHistoryDetails = data => {
  const [RefundToClientData, setRefundToClientData] = useState([]);

  useEffect(() => {
    if (data) {
      const modifiedRefundToClientData = [
        {
          label: 'Dispute ID',
          value: data.dispute
        },
        {
          label: 'Status',
          value: data.status,
        },
        {
          label: 'Amount',
          value: data.amount,
        },
        {
          label: 'Reason',
          value: data.reason,
        },
      ];

      setRefundToClientData(modifiedRefundToClientData);
    }
  }, [data]);

  return RefundToClientData;
};

export default RefundToClientHistoryDetails;
