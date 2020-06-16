import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInvoicesConnect } from './use-incoices-connect';

export const useGetCurrentInvoice = () => {
  const { id } = useParams();
  const { currentInvoice, GetInvoiceListRequest } = useInvoicesConnect(id);

  useEffect(() => {
    if (!currentInvoice) {
      GetInvoiceListRequest();
    }
  }, [GetInvoiceListRequest, currentInvoice]);

  return currentInvoice;
};
