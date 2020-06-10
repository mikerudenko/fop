import { Dictionary } from '../helper-service/helper-service.constants';
import Joi from '@hapi/joi';
import { validationMessages } from './validation-service.constants';

export const createValidationResolver = (validationSchema: any) => (
  data: Dictionary<any>,
  validationContext?: object,
) => {
  const { error, value: values } = Joi.object(validationSchema).validate(data);

  return {
    values: error ? {} : values,
    errors: error
      ? error.details.reduce((previous: any, currentError: any) => {
          return {
            ...previous,
            [currentError.path[0]]:
              validationMessages[currentError.type as string],
          };
        }, {})
      : {},
  };
};
