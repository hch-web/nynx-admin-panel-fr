import { createContext, useContext } from 'react';

export const TicketSupportContext = createContext({
  ticketId: null,
  generatedBy: null,
  ticketDetails: null,
  status: null,
});

export const useTicketSupportContext = () => {
  const context = useContext(TicketSupportContext);

  return context;
};
