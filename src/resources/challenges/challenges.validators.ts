import { Joi, celebrate } from 'celebrate';

const validTypes = ['integer', 'float', 'number', 'string'];

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
      .required()
      .unique(),
    returnType: Joi.string().valid(...validTypes),
  }),
});

export const addTestCase = celebrate({
  body: Joi.object().keys({
    inputs: Joi.array()
      .items(Joi.alternatives().try(Joi.string(), Joi.number()))
      .min(1)
      .required(),
    output: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .required(),
  }),
});
