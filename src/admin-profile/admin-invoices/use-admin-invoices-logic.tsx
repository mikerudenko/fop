import { push } from 'connected-react-router';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { META_THUNK, ROUTES } from '../../app.constants';
import { AppPrintButton } from '../../components/app-button/app-print-button';
import { APP_CONFIRM } from '../../components/app-confirm';
import { useInvoicesConnect } from '../../store/invoices';
import { useModalConnect } from '../../store/modal';
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

  const invoices = useAutoMemo(() =>
    invoiceList ? Object.keys(invoiceList).map((key) => invoiceList[key]) : [],
  );

  const ResetDelete = useAutoCallback(() => {
    setIdToDelete(null);
    HideModal(APP_CONFIRM);
  });

  const onConfirmDelete = useAutoCallback(async () => {
    await DeleteInvoiceRequest(idToDelete, META_THUNK);
    ResetDelete();
  });

  const onEditClick = useAutoCallback((id: string) => {
    dispatch(push(ROUTES.admin + ROUTES.invoices + `/${id}`));
  });

  const onDeleteClick = useAutoCallback((id: string) => {
    setIdToDelete(id);
    ShowModal(APP_CONFIRM);
  });

  const onPrintCLick = useAutoCallback((id: string) => {
    dispatch(push(ROUTES.admin + ROUTES.printInvoice + `/${id}`));
  });

  const columns = useAutoMemo(() => [
    {
      dataField: 'id',
      label: 'Номер рахунку',
      formatter: (value: string) => value,
    },
    {
      dataField: 'actions',
      label: '',
      formatter: (value: string, values: any) => (
        <AdminTableActions
          additionalAction={
            <AppPrintButton id={values.id} onClick={onPrintCLick} />
          }
          id={values.id as string}
          {...{ onDeleteClick, onEditClick }}
        />
      ),
    },
  ]);

  const onAddClick = useAutoCallback(() => {
    dispatch(push(ROUTES.admin + ROUTES.createInvoice));
  });

  useAutoEffect(() => {
    if (!invoiceList) {
      GetInvoiceListRequest();
    }
  });

  return {
    invoices,
    networkStatus,
    onCancelDelete: ResetDelete,
    onConfirmDelete,
    columns,
    onAddClick,
  };
};
