import { push } from 'connected-react-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'typesafe-actions'
import { API_PATHS } from '../../../config/api'
import { ROUTES } from '../../../config/routes'
import { IAlbum } from '../../../models/albumModel'
import { AppState } from '../../../redux/reducer'
import ListItem from '../components/ListItem'
import { setAlbum, updateAlbum } from '../redux/albumReducer'

const AlbumPage = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { albums } = useSelector((state: AppState) => state.album);
  const [albumsState, setAlbumsState] = useState<IAlbum[]>(albums);
  const [changed, setChanged] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState(10);

  const fetchAlbum = useCallback(
    async (amount: number) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(async (dispatch, getState) => {
        const { album } = getState();

        const res = await fetch(`${API_PATHS.album}?_start=${amount - 10 === 0 ? amount - 10 : amount - 1}&_end=${amount}`);

        const resData = await res.json();

        return { resData, albums: album.albums }
      });

      setLoading(false);

      // check nếu state hiện tại chưa có albums thì lưu data mới 
      if (json.resData?.length > 0 && json.albums.length === 0) {
        // lưu data trả về vào store theo 1 format mới có title và prevTitle

        dispatch(setAlbum(json.resData))
        setAlbumsState(json.resData)
        return;
      }
      // nếu đã có album thì nối thêm mảng mới load vào mảng trong store
      else if (json.albums.length !== 0) {
        dispatch(updateAlbum(json.resData));
        setAlbumsState((prev) => ([
          ...prev,
          ...json.resData
        ]))
      }
    }
    , [dispatch]);

  const checkChanged = (newList: IAlbum[], oldList: IAlbum[]) => {
    let check = false
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].title !== oldList[i].title) {
        check = true;
      }
    }

    setChanged(check);
  }

  const onChange = useCallback((title: string, id: number) => {
    // mỗi thi value của 1 input thay đổi sẽ set lại state albums 
    setAlbumsState((prev: IAlbum[]) => {
      const newArr = [...prev]
      const indexDesired = newArr.findIndex(item => item.id === id);
      // tạo 1 object reference mới để thay đổi cho cái cũ 
      const newObj = {
        ...newArr[indexDesired],
        title: title
      }
      newArr[indexDesired] = newObj;
      return newArr
    })

  }, []);


  const onConfirm = (list: IAlbum[]) => {
    //dispatch lên redux albumsState là cái state mới 
    dispatch(setAlbum(list))
    setChanged(false)
  }

  const onReset = (list: IAlbum[]) => {
    // dispatch lên redux cái state cũ lấy từ redux đó là albums
    setAlbumsState(list);
    setChanged(false)
  }

  const isBottom = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) {
      return false
    }
    return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
  }

  useEffect(() => {
    fetchAlbum(amount);
  }, [amount])

  useEffect(() => {
    // check button mỗi khi có sự thay đổi ở 2 mảng 
    checkChanged(albumsState, albums);
  }, [albumsState, albums])

  useEffect(() => {

    const onScroll = () => {
      if (isBottom(contentRef)) {
        // khi xác định được trạng thái ở bottom thì load thêm
        setAmount(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      // sau khi useEffect gọi DomEvent thì clean
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div ref={contentRef} className="container mx-auto mt-5 d-flex flex-column" style={{ maxWidth: '600px' }}>
      <div className="d-flex justify-content-end mb-3" style={{ columnGap: '20px' }}>
        <button type="button" className="btn btn-secondary" onClick={() => fetchAlbum(20)}>Refresh</button>
        <button type="button" className="btn btn-secondary" onClick={() => {
          dispatch(push(ROUTES.home))
        }}>
          <FormattedMessage id="backTohome" />
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            onConfirm(albumsState)
          }}
          ref={buttonRef}
          disabled={changed ? false : true}
        >
          <FormattedMessage id="confirm" />
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            onReset(albums)
          }}
        >
          <FormattedMessage id="reset" />
        </button>
      </div>
      <div className="d-flex flex-column gap-3">
        {loading && <div>Loading....</div>}
        {errorMessage && <div>{errorMessage}</div>}
        {albumsState.length > 0 && (
          albumsState.map((album, index) => (
            <ListItem
              key={index}
              id={album.id}
              title={album.title}
              prevTitle={album?.prevTitle}
              thumbnailUrl={album.thumbnailUrl}
              changed={true}
              onChange={onChange}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default AlbumPage