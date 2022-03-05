import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { ILocationParams, IRegisterParams } from '../../../models/authModel'
import { validateRegister, validRegister } from '../utils'

interface Props {
  loading: boolean,
  errorMessage: string,
  regions?: ILocationParams[],
  states?: ILocationParams[],
  onRegister(values: IRegisterParams): void,
  getLocations(id?: string): void
}

const RegisterForm = (props: Props) => {
  const intl = useIntl();
  const [formValues, setFormValues] = useState<IRegisterParams>({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    gender: '',
    region: '',
    state: ''
  });
  const [validate, setValidate] = useState<IRegisterParams>({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    gender: '',
    region: '',
    state: ''
  });

  // const renderLocations = (location?: ILocationParams[], type?: string) => {
  //   const arrLocation: JSX.Element[] = [
  //   ]

  //   location?.map((location: ILocationParams, index: number) => {
  //     arrLocation.push(
  //       <option value={location.id} key={index}>
  //         {location.name}
  //       </option>,
  //     )
  //   })
  //   console.log(arrLocation);

  //   return arrLocation
  // }

  const resetValidateField = (field: string) => {
    setValidate((prev: IRegisterParams) => ({
      ...prev,
      [`${field}`]: '',
    }))
  }

  const registerHandler = (values: IRegisterParams) => {
    const validatedValue = validateRegister(values)
    setValidate(validatedValue)

    if (!validRegister(validatedValue)) {
      return
    }

    props.onRegister(values)
  }

  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      className="row g-3 needs-validation"
      onSubmit={(e) => {
        e.preventDefault();
        registerHandler(formValues)
      }}
    >
      {!!props.errorMessage && (
        <div role="alert" style={{ width: '100%' }} className="alert alert-danger">
          {props.errorMessage}
        </div>
      )}

      <div className="col-md-12">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="email" />
        </label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          placeholder={intl.formatMessage({ id: "emailPlaceHolder" })}
          onChange={(e) => {
            setFormValues((prev: IRegisterParams) => ({
              ...prev,
              email: e.target.value
            }))
          }}
          onClick={(e) => {
            resetValidateField('email');
          }}
        />
        {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
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
          placeholder={intl.formatMessage({ id: "passwordPlaceHolder" })}
          onChange={(e) => {
            setFormValues((prev: IRegisterParams) => ({
              ...prev,
              password: e.target.value
            }))
          }}
          onClick={(e) => {
            resetValidateField('password');
          }}
        />
        {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputRepeatPassword" className="form-label">
          <FormattedMessage id="repeatPassword" />
        </label>
        <input
          type="password"
          className="form-control"
          id="inputRepeatPassword"
          placeholder={intl.formatMessage({ id: "repeatPasswordPlaceHolder" })}
          onChange={(e) => {
            setFormValues((prev: IRegisterParams) => ({
              ...prev,
              repeatPassword: e.target.value
            }))
          }}

          onClick={(e) => {
            resetValidateField('repeatPassword');
          }}
        />
        {!!validate?.repeatPassword && (
          <small className="text-danger">
            <FormattedMessage id={validate?.repeatPassword} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputName" className="form-label">
          <FormattedMessage id="name" />
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          placeholder={intl.formatMessage({ id: "namePlaceHolder" })}
          onChange={(e) => {
            setFormValues((prev: IRegisterParams) => ({
              ...prev,
              name: e.target.value
            }))
          }}
          onClick={(e) => {
            resetValidateField('name');
          }}
        />
        {!!validate?.name && (
          <small className="text-danger">
            <FormattedMessage id={validate?.name} />
          </small>
        )}
      </div>

      <div className="col-md-12 d-flex">
        <div className="col-md-4 form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="male"
            value={1}
            onChange={(e) => {
              setFormValues((prev: IRegisterParams) => ({
                ...prev,
                gender: e.target.value
              }))
            }}
          />
          <label className="form-check-label" htmlFor="male">
            <FormattedMessage id="male" />
          </label>
        </div>
        <div className=" col-md-4 form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="female"
            value={0}
            onChange={(e) => {
              setFormValues((prev: IRegisterParams) => ({
                ...prev,
                gender: e.target.value
              }))
            }}
          />
          <label className="form-check-label" htmlFor="female">
            <FormattedMessage id="female" />
          </label>
        </div>
      </div>

      <div className="col-md-12">
        <label htmlFor="inputName" className="form-label">
          <FormattedMessage id="region" />
        </label>
        <select
          className="form-select"
          aria-label="region selection"
          onChange={(e) => {
            setFormValues((prev: IRegisterParams) => ({
              ...prev,
              region: e.target.value,
              state: ''
            }))
            props.getLocations(e.target.value)
          }}
          onClick={(e) => {
            resetValidateField('region');
          }}
        >
          <option value={''}>
            --Select your region--
          </option>,
          {props.regions?.map((region, index) => (
            <option value={region.id} key={index}>
              {region.name}
            </option>
          ))}
        </select>
        {!!validate?.region && (
          <small className="text-danger">
            <FormattedMessage id={validate?.region} />
          </small>
        )}
      </div>

      {formValues.region && (
        <div className="col-md-12">
          <label htmlFor="inputName" className="form-label">
            <FormattedMessage id="state" />
          </label>
          <select
            className="form-select"
            aria-label="state selection"
            onChange={(e) => {
              setFormValues((prev: IRegisterParams) => ({
                ...prev,
                state: e.target.value
              }))
            }}
            onClick={(e) => {
              resetValidateField('state');
            }}
          >
            <option selected={formValues.state.length !== 0 ? false : true} value={''} >
              --Select your state--
            </option>,
            {props.states?.map((state, index) => (
              <option value={state.id} key={index}>
                {state.name}
              </option>
            ))}
          </select>
          {!!validate?.state && (
            <small className="text-danger">
              <FormattedMessage id={validate?.state} />
            </small>
          )}
        </div>
      )}

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            type="submit"
            disabled={props.loading}
            style={{ minWidth: '160px' }}
          >
            <FormattedMessage id="register" />
          </button>
        </div>
      </div>

    </form>
  )
}

export default RegisterForm