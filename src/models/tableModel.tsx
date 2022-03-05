export interface ITableData {
  date: string,
  total: string,
  currency: string,
  invoice: string,
  clientID: string,
  status: string
}

export interface filterProps {
  active: boolean,
  filters: {
    // status?: (value: any) => boolean,
    // client?: (value: any) => boolean,
  },
}

export interface sortingProps {
  active: boolean,
  type: string,
  key: string
}