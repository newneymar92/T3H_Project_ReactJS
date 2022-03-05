import React, { memo } from 'react'
import { FormattedMessage } from 'react-intl'
import { ITableData } from '../../../models/tableModel'
import { CSVLink } from "react-csv";
import Filter from './Filter'
interface Props {
  updatedFilter(type: string, values?: string, dateFrom?: number, dateTo?: number): void,
  resetData(): void,
  valueTable: ITableData[]
}

const TableHeader = (props: Props) => {

  return (
    <div>
      {/* Title and export csv */}
      <div className="d-flex align-items-center justify-content-between">
        <h2 style={{ color: '#29506f' }}>
          <FormattedMessage id="payrollList" />
        </h2>
        {/* có thể dowload file CSV */}
        <CSVLink
          data={props.valueTable}
          className="d-block text-decoration-none"
          style={{
            padding: '0.5rem 0.75rem 0.5rem 0.75rem',
            borderRadius: '5px',
            backgroundColor: '#1da9df',
            color: '#fff',
          }}
        >
          <FormattedMessage id="dowloadcsv" />
        </CSVLink>
      </div>

      {/* filter */}
      <div>
        <Filter updatedFilter={props.updatedFilter} resetData={props.resetData} />
      </div>

    </div>
  )
}

export default memo(TableHeader)