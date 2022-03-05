export interface ILoginParams {
  email: string,
  password: string,
  rememberMe: boolean
}

export interface ILoginValidation {
  email: string,
  password: string
}

export interface IRegisterParams {
  email: string,
  password: string,
  repeatPassword: string,
  name: string,
  gender: string | number,
  region: string,
  state: string
}

export interface ILocationParams {
  id: string | number,
  name: string,
  pid: number | null
}