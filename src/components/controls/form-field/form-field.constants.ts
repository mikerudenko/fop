import { FormChips } from '../form-chips';
import { FormFieldAutocomplete } from '../form-field-autocomplete';
import { FormFieldDate } from '../form-field-date';
import { FormFieldFile } from '../form-field-file';
import { FormFieldMask } from '../form-field-mask';
import { FormFieldNumber } from '../form-field-number';
import { FormFieldText } from '../form-field-text';
import { FormSelect } from '../form-select';

export type FormFieldType = string;

export const FormFields = {
  text: FormFieldText,
  email: FormFieldText,
  password: FormFieldText,
  select: FormSelect,
  chips: FormChips,
  number: FormFieldNumber,
  mask: FormFieldMask,
  date: FormFieldDate,
  autocomplete: FormFieldAutocomplete,
  file: FormFieldFile,
};
