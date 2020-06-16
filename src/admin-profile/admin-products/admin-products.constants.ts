import { ProductType } from '../../api';
import { AppSelectOptionType } from '../../components/controls/app-select';

export const UPDATE_PRODUCT_MODAL = 'UPDATE_PRODUCT_MODAL';

export const PRODUCT_TYPE_SELECT_LIST: AppSelectOptionType[] = [
  {
    value: ProductType.build,
    label: 'Будівельні матеріали',
  },
  {
    value: ProductType.chemistry,
    label: 'Побутова хімія',
  },
  {
    value: ProductType.linens,
    label: 'Білизна',
  },
  {
    value: ProductType.tableware,
    label: 'Посуд',
  },
];
