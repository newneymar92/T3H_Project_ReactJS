import React, { useState, memo, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';
import '../../../scss/ListItem.scss'

interface Props {
  id: number,
  title: string,
  thumbnailUrl: string,
  prevTitle?: string,
  changed: boolean,
  onChange(values: string, id: number): void
}

const ListItem = (props: Props) => {
  const { id, title, thumbnailUrl, prevTitle } = props;
  const [titleState, setTitleState] = useState(title)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleState(e.target.value);
    setTimeout(() => {
      props.onChange(e.target.value, id)
    }, 500);
  }

  useEffect(() => {
    setTitleState(title)
  }, [title, prevTitle])

  return (
    <div className="card d-flex p-3 flex-row position-relative"
      style={{
        width: '100%',
        backgroundColor: id % 2 === 0 ? 'grey' : 'white'
      }}
    >
      <img src={thumbnailUrl} alt={title} style={{ width: "100px" }} />
      <div className="card-body">
        <input
          type="text"
          className="w-100 p-0 input-item"
          value={titleState}
          style={{
            backgroundColor: id % 2 === 0 ? 'grey' : 'white',
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleTitleChange(e)
          }}
        />
        <div>
          {Date.now()}
        </div>
      </div>

      <div className="position-absolute" style={{
        bottom: '10px',
        right: '10px'
      }}>
        <Link to={`${ROUTES.album}/${id}`}>Go to details </Link>
      </div>
    </div>
  )
}

export default memo(ListItem)