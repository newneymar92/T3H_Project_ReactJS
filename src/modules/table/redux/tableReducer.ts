import { ITableData } from './../../../models/tableModel';
import { createCustomAction, ActionType, getType } from 'typesafe-actions';
import { create } from 'lodash';

export interface TableState {
  data: ITableData[]
}

export const setTableData = createCustomAction('table/setTableData', (data: ITableData[]) => {
  return {
    data
  }
})

const actions = { setTableData };

type Action = ActionType<typeof actions>;

export default function reducer(state: TableState = {
  data: []
}, action: Action) {
  switch (action.type) {
    case getType(setTableData): {
      return {
        ...state,
        data: action.data
      }
    }
    default:
      return state
  }
}