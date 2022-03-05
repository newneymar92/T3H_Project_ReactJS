import React, { memo } from 'react'
import { ITableData } from '../../../models/tableModel'
import Button from '../../common/components/Button'
import { checkColor } from '../utils'
import CurrencyFormat from 'react-currency-format';
import { FormattedNumber, useIntl } from 'react-intl';

type Props = {
  item: ITableData,
  onDelete(values: {
    show: boolean,
    content: string,
    payload: {
      id: string,
      data: ITableData
    }
  }): void,
  onEdit(obj: {
    show: boolean,
    title: string,
    id: string
  }): void
}

const DataRow = (props: Props) => {
  const intl = useIntl();
  const { item, onDelete, onEdit } = props
  return (
    <tr className="table-row" key={item.invoice} >
      <td style={{
        color: checkColor(item.status)
      }}>
        <p className="my-auto">
          {intl.formatMessage({
            id: item.status.toLowerCase()
          })}
        </p>
      </td>
      <td>{item.date}</td>
      <td>{item.clientID}</td>
      <td>{item.currency}</td>
      <td>
        <FormattedNumber value={+item.total} minimumFractionDigits={2} />
      </td>
      <td>{item.invoice} {Date.now()}</td>
      <td>
        <Button
          styles={{
            borderRadius: '30px',
            borderColor: "#29506f",
            color: "#29506f",
          }}
          content={intl.formatMessage({ id: "viewDetails" })}
          handleClick={() => {
            onEdit({
              show: true,
              title: 'Chi tiết giao dịch',
              id: item.invoice
            })
          }}
        />
      </td>
      <td>
        <Button
          styles={{
            borderRadius: '30px',
            borderColor: "#b80e52",
            color: "#b80e52"
          }} content={intl.formatMessage({ id: "delete" })} handleClick={() => {
            onDelete({
              show: true,
              content: 'Are you sure to delete this information?',
              payload: {
                id: item.invoice,
                data: {
                  date: '',
                  total: '',
                  currency: '',
                  invoice: '',
                  clientID: '',
                  status: ''
                }
              }
            })
          }} />
      </td>
    </tr>
  )
}

export default memo(DataRow)