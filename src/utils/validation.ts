import Joi from "joi";

export const RegistrationValidation = (data: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "co", "black"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  return schema.validate(data);
};

export const LoginValidation = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "co", "black"] },
    }),
    password: Joi.string().min(2).required(),
  });

  return schema.validate(data);
};
