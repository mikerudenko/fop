import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../../../api';
import { useCustomersConnect } from '../../../store/customers';
import { META_THUNK } from '../../../app.constants';
import { useModalConnect } from '../../../store/modal';
import { UPDATE_CUSTOMER_MODAL } from '../admin-customers.constants';

const getNewCustomer = () => ({
  id: uuidv4(),
  name: '',
  code: '',
  rr: '',
  phone: '',
  address: '',
  ipn: '',
  mfo: '',
});

export const useUpdateCustomerModalLogic = (idToUpdate: null | string) => {
  const { UpdateCustomerRequest, currentCustomer } = useCustomersConnect(
    idToUpdate,
  );
  const { modalStatus, HideModal } = useModalConnect(UPDATE_CUSTOMER_MODAL);
  const title = idToUpdate ? 'Редагування споживача' : 'Створення споживача';
  const initialValues = idToUpdate ? currentCustomer : getNewCustomer();

  const onSubmit = useCallback(
    async (payload: Customer) => {
      debugger;
      await UpdateCustomerRequest(payload, META_THUNK);
      HideModal(UPDATE_CUSTOMER_MODAL);
    },
    [UpdateCustomerRequest, HideModal],
  );

  return {
    onSubmit,
    modalStatus,
    title,
    initialValues,
  };
};
