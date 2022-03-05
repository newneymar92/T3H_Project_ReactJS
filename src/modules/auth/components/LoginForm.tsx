import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../models/authModel';
import { validateLogin, validLogin } from '../utils';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {

  const [formValues, setFormValues] = useState<ILoginParams>({
    email: '',
    password: '',
    rememberMe: false
  })
  const [validate, setValidate] = useState<ILoginValidation>({
    email: '',
    password: ''
  })

  const resetValidate = (field: string) => {
    setValidate((prev: ILoginValidation) => ({
      ...prev,
      [`${field}`]: ''
    }))
  }

  const handleSubmit = () => {
    const validObj = validateLogin(formValues);
    setValidate(validObj)

    if (!validLogin(validObj)) {
      return;
    }

    props.onLogin(formValues);
  }

  return <form
    style={{ maxWidth: '560px', width: '100%', maxHeight: "900px" }}
    noValidate
    onSubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }}
    className="row g-3 needs-validation mt-3"
  >
    <div className="col-md-12">
      <label htmlFor="inputEmail" className="form-label text-capitalize">
        <FormattedMessage id="email" />
      </label>
      <input
        type="text"
        className="form-control"
        id="inputEmail"
        value={formValues.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, email: e.target.value })}
        onClick={() => {
          resetValidate('email')
        }}
      />

      {!!validate?.email && (
        <small className="text-danger">
          <FormattedMessage id={validate.email} />
        </small>
      )}
    </div>

    <div className="col-md-12">
      <label htmlFor="inputPassword" className="form-label">
        <FormattedMessage id="password" />
      </label>
      <input
        type="password"
        className="form-control"
        id="inputPassword"
        value={formValues.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, password: e.target.value })}
        onClick={() => {
          resetValidate('password')
        }}
      />
      {!!validate?.password && (
        <small className="text-danger">
          <FormattedMessage id={validate.password} />
        </small>
      )}
    </div>

    <div className="col-12">
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="invalidCheck"
          checked={formValues.rememberMe}
          onChange={(e) => {
            setFormValues({ ...formValues, rememberMe: !formValues.rememberMe })
          }}
        />
        <label htmlFor="invalidCheck" className="form-check-label">
          <FormattedMessage id="rememberMe" />
        </label>
      </div>
    </div>

    <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
      <div className="col-md-auto">
        <button className="btn btn-primary" type="submit" style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FormattedMessage id="signIn" />
        </button>
      </div>
    </div>

  </form>;
};

export default LoginForm;
