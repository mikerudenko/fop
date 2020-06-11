import { FormFieldText } from '../form-field-text';
import { FormSelect } from '../form-select';
import { FormChips } from '../form-chips';
import { FormFieldNumber } from '../form-field-number';
import { FormFieldMask } from '../form-field-mask';

export type FormFieldType = string;

export const FormFields = {
  text: FormFieldText,
  email: FormFieldText,
  password: FormFieldText,
  select: FormSelect,
  chips: FormChips,
  number: FormFieldNumber,
  mask: FormFieldMask,
};
