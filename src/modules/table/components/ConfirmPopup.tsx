import React, { memo } from 'react'
import { Modal } from 'react-bootstrap'
import { ITableData } from '../../../models/tableModel'
import Button from '../../common/components/Button'

type Props = {
  payload: { id: string, data: ITableData }
  show: boolean,
  children: string | JSX.Element,
  handleClose(): void,
  handleConfirm(id: string, values?: ITableData): void
}

const ConfirmPopup = (props: Props) => {
  const { payload, show, children, handleClose, handleConfirm } = props;
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          Confirm Dialog
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button content="Close" handleClick={handleClose} styles={{ color: '#b80e52', borderColor: "#b80e52" }} />
        <Button content="Confirm" styles={{ color: '#29506f', borderColor: "#29506f" }} handleClick={() => {
          handleConfirm(payload.id, payload.data)
        }} />
      </Modal.Footer>
    </Modal>
  )
}

export default memo(ConfirmPopup)