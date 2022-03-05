import { ILoginParams, ILoginValidation, IRegisterParams } from '../../models/authModel';
import { validEmailRegex } from '../../utils';

const validateEmail = (email: string) => {

  if (!email) {
    return 'emailRequire'
  }

  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }

  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};

const validateRepeatPassword = (repeatPassword: string, password: string) => {
  if (!repeatPassword) {
    return 'repeatPasswordRequire';
  }

  if (repeatPassword !== password) {
    return 'repeatPasswordInvalid';
  }

  return '';
};

const validateField = (field: string, value: string) => {
  if (value) return '';
  let fieldRequire = '';
  switch (field) {
    case 'region':
      fieldRequire = "regionRequire";
      break;
    case 'state':
      fieldRequire = "stateRequire";
      break;
  }

  return fieldRequire
}

const validateName = (name: string) => {
  if (!name) {
    return 'nameRequire'
  }

  if (name.length < 2) {
    return 'nameInvalid'
  }

  return ''
}

const validateGender = (gender: string | number) => {
  if (gender !== '0' && gender !== '1') {
    return 'genderRequire';
  }

  return '';
};


export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password
}

export const validateRegister = (values: IRegisterParams): IRegisterParams => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    repeatPassword: validateRepeatPassword(values.repeatPassword, values.password),
    name: validateName(values.name),
    gender: validateGender(values.gender),
    region: validateField('region', values.region),
    state: validateField('state', values.state)
  }
}

export const validRegister = (values: IRegisterParams) => {
  return !values.email && !values.password && !values.repeatPassword && !values.name && !values.gender && !values.region && !values.state
}
