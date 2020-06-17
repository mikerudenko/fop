import { useAutoEffect } from 'hooks.macro';
import { useParams } from 'react-router-dom';
import { useInvoicesConnect } from './use-incoices-connect';

export const useGetCurrentInvoice = () => {
  const { id } = useParams();
  const { currentInvoice, GetInvoiceListRequest } = useInvoicesConnect(id);

  useAutoEffect(() => {
    if (!currentInvoice) {
      GetInvoiceListRequest();
    }
  });

  return currentInvoice;
};
