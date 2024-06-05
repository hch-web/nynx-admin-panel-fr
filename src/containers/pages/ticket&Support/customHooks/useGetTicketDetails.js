import { useEffect, useState } from 'react';

const useGetTicketDetails = data => {
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    if (data) {
      const modifiedData = [
        {
          label: 'Dispute ID',
          value: data.id,
        },
        {
          label: 'Status',
          value: data.dispute_status,
        },
        {
          label: 'Requested  by',
          value: `${data.created_by_first_name} ${data.created_by_last_name}`,
        },
        {
          label: 'Subject',
          value: data.subject,
        },
        {
          label: 'Reason',
          type: 'textArea',
          value: data.reason,
        },
        {
          label: 'Attachments',
          value: data.dispute_attachments,
        },
      ];

      setTicketData(modifiedData);
    }
  }, [data]);

  return ticketData;
};

export default useGetTicketDetails;
