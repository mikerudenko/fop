import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useInvoicesConnect } from '../../store/invoices';
import { useModalConnect } from '../../store/modal';
import { APP_CONFIRM } from '../../components/app-confirm';
import { META_THUNK, ROUTES } from '../../app.constants';
import { Invoice } from '../../api';
import { AppLink } from '../../components/app-link';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { AdminTableActions } from '../admin-table-actions';

export const useAdminInvoicesLogic = () => {
  const {
    GetInvoiceListRequest,
    DeleteInvoiceRequest,
    invoiceList,
    networkStatus,
  } = useInvoicesConnect();
  const { ShowModal, HideModal } = useModalConnect();
  const [idToDelete, setIdToDelete] = useState<null | string>(null);
  const dispatch = useDispatch();

  const invoices = useMemo(
    () =>
      invoiceList
        ? Object.keys(invoiceList).map((key) => invoiceList[key])
        : [],
    [invoiceList],
  );

  const ResetDelete = useCallback(() => {
    setIdToDelete(null);
    HideModal(APP_CONFIRM);
  }, [HideModal]);

  const onConfirmDelete = useCallback(async () => {
    await DeleteInvoiceRequest(idToDelete, META_THUNK);
    ResetDelete();
  }, [DeleteInvoiceRequest, idToDelete, ResetDelete]);

  const onEditClick = useCallback(
    (id: string) => {
      dispatch(push(ROUTES.admin + ROUTES.invoices + `/${id}`));
    },
    [dispatch],
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
        dataField: 'id',
        label: 'Номер рахунку',
        formatter: (value: string) => value,
      },
      {
        dataField: 'name',
        label: 'Найменування',
        formatter: (value: string, { id }: Invoice) => (
          <AppLink
            to={`${ROUTES.admin}${ROUTES.invoices}/${id}`}
            variant='body2'
            text={value}
          />
        ),
      },
      {
        dataField: 'actions',
        label: '',
        formatter: (value: string) => (
          <AdminTableActions id={value} {...{ onDeleteClick, onEditClick }} />
        ),
      },
    ],
    [onDeleteClick, onEditClick],
  );

  const onAddClick = useCallback(() => {
    dispatch(push(ROUTES.admin + ROUTES.createInvoice));
  }, [dispatch]);

  useEffect(() => {
    if (!invoiceList) {
      GetInvoiceListRequest();
    }
  }, [GetInvoiceListRequest, invoiceList]);

  return {
    invoices,
    networkStatus,
    onCancelDelete: ResetDelete,
    onConfirmDelete,
    columns,
    onAddClick,
  };
};
