import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import { IAlbum } from '../../../models/albumModel'
import { AppState } from '../../../redux/reducer'
type Props = {}

const AlbumDetails = () => {
  const params: { id: string } = useParams();

  const state = useSelector((state: AppState) => state.album.albums)
  const [detailsAlbum, setDetailsAlbum] = useState<IAlbum>()

  const fetchDetailAlbum = () => {
    if (params.id) {

      const details = state.find(item => item.id === parseInt(params.id))
      console.log(details);

      if (details) {
        setDetailsAlbum(details)
      }
    }
  }

  useEffect(() => {
    fetchDetailAlbum();
  }, [])

  return (
    <div className="container mx-auto mt-5 d-flex flex-column" style={{ maxWidth: '600px' }}>
      {detailsAlbum && (
        <div className="card d-flex p-3 flex-row position-relative"
          style={{
            width: '100%',
          }}
        >
          <img src={detailsAlbum.thumbnailUrl} alt={detailsAlbum.title} style={{ width: "100px" }} />
          <div className="card-body">
            <p>{detailsAlbum.title}</p>
          </div>

          <div className="position-absolute" style={{
            bottom: '10px',
            right: '10px'
          }}>
            <Link to={`${ROUTES.album}`}>Back to album page </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlbumDetails