import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState, memo } from 'react'
import { Pagination } from 'react-bootstrap'
import '../../../scss/table/table.scss'

type Props = {
  numberOfData: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number
}

const TableFooter = (props: Props) => {
  const { numberOfData, setCurrentPage, currentPage } = props;
  const [pageItems, setPageItems] = useState<JSX.Element[]>();

  const showingData = useCallback(() => {
    const numberOfPage = Math.ceil(numberOfData / 10);
    // phần còn lại của page cuối cùng
    const remainer = numberOfData % 10;

    // nếu số page lớn hơn 1 
    if (numberOfPage > 1) {
      // nếu current page là page cuối thì show remainer của Data
      if (currentPage === Math.ceil(numberOfData / 10)) {
        return `Showing ${remainer} from ${numberOfData}`
      }
      // nếu không thì show 10
      return `Showing 10 from ${numberOfData}`
    }
    // nếu số pages = 1 thì show luôn số data
    return `Showing ${numberOfData} from ${numberOfData}`
  }, [numberOfData, currentPage])

  const loadPages = useCallback(() => {
    const items = [
      <Pagination.Item key="first" onClick={() => { setCurrentPage(1) }}>
        <p className="m-0">
          {'<<'}
        </p>
      </Pagination.Item>
    ];

    // Math.ceil(numberOfData/10) là số trang
    // check nếu số trang lớn hơn 5 
    if (Math.ceil(numberOfData / 10) > 5) {
      // nếu current page = 1 hoặc 2 thì hiển thị 5 nút trang đầu tiên
      if (currentPage === 1 || currentPage === 2) {
        for (let i = 0; i < 5; i++) {
          items.push(
            <Pagination.Item key={i + 1} active={currentPage === i + 1} onClick={() => { setCurrentPage(i + 1) }}>
              {i + 1}
            </Pagination.Item>
          )
        }
      } else if (currentPage >= 3 && currentPage < Math.ceil(numberOfData / 10) - 1) {
        // nếu currentPage lớn hơn 3 và nhỏ hơn trang cuối cùng 2 đơn vị  thì hiển thị 5 cái 1 ví dụ current =3 thì hiển thị 12345 bằng 4 thì là 23456 
        for (let i = (currentPage - 3); i < (currentPage + 2); i++) {
          items.push(
            <Pagination.Item key={i + 1} active={currentPage === i + 1} onClick={() => { setCurrentPage(i + 1) }}>
              {i + 1}
            </Pagination.Item>
          )
        }
      } else if (currentPage === Math.ceil(numberOfData / 10) - 1 || currentPage === Math.ceil(numberOfData / 10)) {
        // nếu current page = 2 trang cuối thì hiển thị 5 trang cuối cùng
        for (let i = Math.ceil(numberOfData / 10) - 5; i < Math.ceil(numberOfData / 10); i++) {
          items.push(
            <Pagination.Item key={i + 1} active={currentPage === i + 1} onClick={() => { setCurrentPage(i + 1) }}>
              {i + 1}
            </Pagination.Item>
          )
        }
      }
    } else {
      // nếu số page <5 thì hiển thị tất cả các page 
      for (let i = 0; i < Math.ceil(numberOfData / 10); i++) {
        items.push(
          <Pagination.Item key={i + 1} active={currentPage === i + 1} onClick={() => { setCurrentPage(i + 1) }}>
            {i + 1}
          </Pagination.Item>
        )
      }
    }

    items.push(
      <Pagination.Item key="last" onClick={() => { setCurrentPage(Math.ceil(numberOfData / 10)) }}>
        <p className="m-0">
          {'>>'}
        </p>
      </Pagination.Item>
    )

    setPageItems(items)

  }, [numberOfData, currentPage, setCurrentPage])

  useEffect(() => {
    // load lại pagination mỗi khi số tragn thay đổi hoặc currentpage thay đổi 
    loadPages();
  }, [loadPages])

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div>
        <p className="my-auto" style={{ color: '#29506f', fontWeight: '600' }}>{showingData()}</p>
      </div>
      <div>
        <Pagination className="d-flex align-items-center justify-content-end mb-0 gap-3 pagination-custom">
          {pageItems}
        </Pagination>
      </div>
    </div>
  )
}

export default memo(TableFooter)