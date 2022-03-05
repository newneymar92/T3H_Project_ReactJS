import moment from "moment"
import { ITableData } from "../../models/tableModel";
import { FULFILLED_CODE, PENDING_CODE, PROCESSING_CODE, RECEIVED_CODE } from "../../utils/constants";

// Format time function
export const formatTime = (time: string) => {
  return moment(time).format('DD MMM YY');
}

export const convertToTime = (time: string) => {
  return moment(time).toDate().getTime()
}

// check status and color cho từng status
export const checkColor = (status: string) => {
  if (status === FULFILLED_CODE) {
    return '#11c054'
  }

  if (status === PROCESSING_CODE) {
    return '#f1ee12'
  }

  if (status === RECEIVED_CODE) {
    return '#328ecc'
  }

  return '#788b92'
}

export const checkStatus = (process: string | null, fulfill: string | null, receive: string | null) => {
  if (fulfill) {
    return FULFILLED_CODE
  }

  if (process) {
    return PROCESSING_CODE
  }

  if (receive) {
    return RECEIVED_CODE
  }

  return PENDING_CODE
}

// fillter Function
export interface IFilters {
  [key: string]: (value: any) => boolean;
}
export interface TInput {
  [key: string]: any
}

export const filterArray = (array: TInput[], filters: IFilters): TInput[] => {
  const filterKeys = Object.keys(filters);

  return array.filter((item) => {
    // validates all filter criteria
    return filterKeys.every((key) => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  })
}

// validate function
const validateField = (field: string, value: string) => {
  if (value) return '';
  let fieldRequire = '';
  switch (field) {
    case 'currency':
      fieldRequire = "currencyRequire";
      break;
    case 'clientID':
      fieldRequire = 'clientRequire'
      break;
  }

  return fieldRequire
}

const validateTotal = (values: string) => {
  if (parseFloat(values)) {
    return ''
  }
  return 'totalNotValid'
}

const validateDate = (values: string) => {
  if (!values) {
    return "dateRequire"
  }

  if (!moment(values, 'DD MMM YY', true).isValid()) {
    return "dateNotValid"
  }

  return ''
}

export const validateTable = (values: ITableData): ITableData => {
  return {
    date: validateDate(values.date),
    total: validateTotal(values.total),
    currency: validateField('currency', values.currency),
    invoice: values.invoice,
    clientID: validateField('clientID', values.clientID),
    status: values.status
  }
}

export const validTable = (values: ITableData) => {
  return !values.date && !values.clientID && !values.currency && !values.total
}
