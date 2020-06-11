import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useCustomersConnect } from '../../store/customers';
import { useModalConnect } from '../../store/modal';
import { UPDATE_CUSTOMER_MODAL } from './admin-customers.constants';
import { APP_CONFIRM } from '../../components/app-confirm';
import { META_THUNK } from '../../app.constants';
import { AdminTableActions } from '../admin-table-actions';
import identity from 'lodash/identity';

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
  }, [ShowModal]);

  const ResetDelete = useCallback(() => {
    setIdToDelete(null);
    HideModal(APP_CONFIRM);
  }, [HideModal]);

  const onConfirmDelete = useCallback(async () => {
    await DeleteCustomerRequest(idToDelete, META_THUNK);
    ResetDelete();
  }, [DeleteCustomerRequest, idToDelete, ResetDelete]);

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
        formatter: identity,
      },
      {
        dataField: 'name',
        label: 'Найменування',
        formatter: identity,
      },
      {
        dataField: 'rr',
        label: 'РР',
        formatter: identity,
      },
      {
        dataField: 'address',
        label: 'Адреса',
        formatter: identity,
      },
      {
        dataField: 'phone',
        label: 'Телефон',
        formatter: identity,
      },
      {
        dataField: 'ipn',
        label: 'ІПН',
        formatter: identity,
      },
      {
        dataField: 'mfo',
        label: 'МФО',
        formatter: identity,
      },
      {
        dataField: 'id',
        label: '',
        formatter: (value: string) => (
          <AdminTableActions id={value} {...{ onEditClick, onDeleteClick }} />
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
