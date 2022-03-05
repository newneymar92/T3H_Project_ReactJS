import React, { memo } from 'react'
import { Dropdown } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { ITableData, sortingProps } from '../../../models/tableModel'
import '../../../scss/table/table.scss'
import DataRow from './DataRow'

type Props = {
  data?: ITableData[],
  currentPage: number,
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
  }): void,
  onSorting(type: string, key: string): void
}

const CustomToggle = React.forwardRef(function customToggle(props: any, ref: any) {
  return (
    <>
      <p
        {...props}
        href="#_"
        ref={ref}
        className="m-0 text-decoration-none"
        style={{ color: '#29506f' }}
      >
        {props.children}
      </p>
      <i className="fa-solid fa-caret-down d-flex align-items-center ms-2"></i>
    </>
  )
});

const TableContent = (props: Props) => {

  const { data, onDelete, onEdit, currentPage, onSorting } = props;

  return (
    <div className="mt-3">
      <table className="table table-borderless" style={{ borderCollapse: "separate", borderSpacing: '0 15px' }}>
        <thead>
          <tr style={{ border: 'none' }}>
            <th className="text-center" scope="col" style={{ color: "#29506f" }}>
              <FormattedMessage id="status" />
            </th>
            <th scope="col" style={{ color: "#29506f" }} className="d-flex align-items-center justify-content-center text-center">
              <Dropdown className="d-flex" style={{ cursor: 'pointer' }}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown">
                  <FormattedMessage id="date" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="ascending"
                    onClick={() => {
                      // ấn thì thay đổi state sorting 
                      onSorting('ascending', 'date')
                    }}
                  >
                    <FormattedMessage id="ascending" />
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="descending"
                    onClick={() => {
                      // ấn thì thay đổi state sorting 
                      onSorting('descending', 'date')
                    }}>
                    <FormattedMessage id="descending" />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th className="text-center" scope="col" style={{ color: "#29506f" }}>
              <FormattedMessage id="client" />
            </th>
            <th className="text-center" scope="col" style={{ color: "#29506f" }}>
              <FormattedMessage id="currency" />
            </th>
            <th scope="col" style={{ color: "#29506f" }} className="d-flex align-items-center justify-content-center text-center">
              <Dropdown className="d-flex" style={{ cursor: 'pointer' }}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown" className="text-center">
                  <FormattedMessage id="total" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="ascending"
                    onClick={() => {
                      onSorting('ascending', 'total')
                    }}>
                    <FormattedMessage id="ascending" />
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="descending"
                    onClick={() => {
                      onSorting('descending', 'total')
                    }}>
                    <FormattedMessage id="descending" />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th className="text-center" scope="col" style={{ color: "#29506f" }}>
              <FormattedMessage id="invoice" /> #</th>
          </tr>
        </thead>
        <tbody className="gap-3" style={{ overflow: 'hidden' }}>
          {data?.map((item, index) => {
            if (index >= (currentPage - 1) * 10 && index < currentPage * 10) {
              return (
                <DataRow key={item.invoice} item={item} onEdit={onEdit} onDelete={onDelete} />
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

export default memo(TableContent)