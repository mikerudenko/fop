import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useCustomersConnect } from '../../store/customers';
import { useModalConnect } from '../../store/modal';
import { UPDATE_CUSTOMER_MODAL } from './admin-customers.constants';
import { APP_CONFIRM } from '../../components/app-confirm';
import { AdminCustomersTableActions } from './admin-customers-table-actions';
import { META_THUNK } from '../../app.constants';

export const useAdminCustomersLogic = () => {
  const {
    GetCustomerListRequest,
    DeleteCustomerRequest,
    customerList,
    networkStatus,
  } = useCustomersConnect();
  const { ShowModal, HideModal } = useModalConnect();

  const [idToUpdate, setIdToUpdate] = useState<null | string>(null);
  const [idToDelete, setIdToDelete] = useState<null | string>(null);

  const customers = useMemo(
    () =>
    customerList
        ? Object.keys(customerList).map((key) => customerList[key])
        : [],
    [customerList],
  );

  const onAddClick = useCallback(() => {
    setIdToUpdate(null);
    ShowModal(UPDATE_CUSTOMER_MODAL);
    GetCustomerListRequest();
  }, [ShowModal, GetCustomerListRequest]);

  const ResetDelete = useCallback(() => {
    setIdToDelete(null);
    HideModal(APP_CONFIRM);
  }, [HideModal]);

  const onConfirmDelete = useCallback(async () => {
    await DeleteCustomerRequest(idToDelete, META_THUNK);
    ResetDelete();
    GetCustomerListRequest();
  }, [DeleteCustomerRequest, idToDelete, GetCustomerListRequest, ResetDelete]);

  const onEditClick = useCallback(
    (id: string) => {
      setIdToUpdate(id);
      ShowModal(UPDATE_CUSTOMER_MODAL);
    },
    [ShowModal],
  );

  const onDeleteClick = useCallback(
    (id: string) => {
      setIdToDelete(id);
      ShowModal(APP_CONFIRM);
    },
    [ShowModal],
  );

  const columns = useMemo(
    () => [
      {
        dataField: 'code',
        label: 'Код ЄДРОПУ',
        formatter: (value: string) => value,
      },
      {
        dataField: 'name',
        label: 'Найменування',
        formatter: (value: string) => value,
      },
      {
        dataField: 'rr',
        label: 'РР',
        formatter: (value: string) => value,
      },
      {
        dataField: 'id',
        label: '',
        formatter: (value: string) => (
          <AdminCustomersTableActions
            id={value}
            {...{ onEditClick, onDeleteClick }}
          />
        ),
      },
    ],
    [onDeleteClick, onEditClick],
  );

  useEffect(() => {
    if (!customerList) {
      GetCustomerListRequest();
    }
  }, [GetCustomerListRequest, customerList]);

  return {
    customers,
    onAddClick,
    idToUpdate,
    networkStatus,
    onCancelDelete: ResetDelete,
    onConfirmDelete,
    columns,
  };
};
