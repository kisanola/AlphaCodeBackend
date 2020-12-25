import { Joi, celebrate } from 'celebrate';

const validTypes = ['integer', 'float', 'number', 'object'];

export const createOne = celebrate({
  body: Joi.object().keys({
    functionName: Joi.string().required(),
    params: Joi.array()
      .items(
        Joi.object().keys({
          type: Joi.string()
            .valid(...validTypes)
            .required(),
          name: Joi.string().required(),
        }),
      )
      .required(),
    returnType: Joi.string().valid(...validTypes),
  }),
});
