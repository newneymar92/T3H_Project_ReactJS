import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../redux/reducer'
import { FormattedMessage } from 'react-intl';
import { ThunkDispatch } from 'redux-thunk';
import ReactCrop from 'react-image-crop'
import { push } from 'connected-react-router';

import { Button, Modal } from 'react-bootstrap';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../config/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { Action } from 'typesafe-actions';
import { ILocationParams } from '../../../models/authModel';
import Loading from '../../common/components/Loading'
import { ROUTES } from '../../../config/routes';
import { ACCESS_TOKEN_KEY, BASE_URL } from '../../../utils/constants';
import "../../../scss/userInfo/userInfo.scss"
import { Crops } from '../../../models/imgModel';
import 'react-image-crop/dist/ReactCrop.css'
import { generateUrlBlob } from '../utils';
import Cookies from 'js-cookie';
import { setUserInfo } from '../../auth/redux/authReducer';
import { IUser } from '../../../models/userModel';

const UserInfoPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const user = useSelector((state: AppState) => state.profile.user);
  console.log(user);

  const [userInformation, setUserInformation] = useState<IUser>();
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>();
  const previewCanvasRef = useRef<any>(null);
  const [previewImg, setPreviewImg] = useState('');
  const [crops, setCrops] = useState<any>({
    unit: '%',
    width: 30,
    aspect: 1
  })
  const [completedCrop, setCompletedCrop] = useState<Crops>();
  const [modalShow, setModalShow] = useState(false);
  const [locations, setLocations] = useState<{
    region: ILocationParams,
    state: ILocationParams
  }>({
    region: {
      id: 0,
      name: '',
      pid: 0
    },
    state: {
      id: 0,
      name: '',
      pid: 0
    }
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleClose = () => setModalShow(false);
  const handleOpen = () => setModalShow(true);

  const getUserInfo = async () => {
    // call Api user
    const json = await dispatch(fetchThunk(API_PATHS.userProfile, 'get'));

    // n???u tr??? v??? th??nh c??ng th?? update v??o store v?? setState ????? cho v??o UI 
    if (json.code === RESPONSE_STATUS_SUCCESS) {
      dispatch(setUserInfo(json?.data))
      setUserInformation(json?.data)
    }
  }

  const handleUserImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    //check n???u ???? nh???p file 
    if (e.target.files && e.target.files[0]) {
      // chuy???n file v??? url m???i hi???n th??? ???????c
      const file = URL.createObjectURL(e.target.files[0]);

      setPreviewImg(file as any)

      handleOpen();
    }
  }

  // x??? l?? chuy???n canvas v??? file r???i upload l??n server
  const onUploadImg = async () => {
    setErrorMessage('');
    // chuy???n t??? propertise c???a canvas v??? file
    const file = await generateUrlBlob(previewCanvasRef.current, completedCrop);

    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      // c1 axios
      // const json = await dispatch(async (dispatch, getState) => {
      //   const res = await axios.put(API_PATHS.userProfile, formData, {
      //     headers: {
      //       'content-type': 'multipart/form-data',
      //       Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      //     }
      //   })

      //   return res
      // })

      // c2 thunk using fetch 
      const json = await dispatch(async (dispatch, getState) => {
        const res = await fetch(API_PATHS.userProfile, {
          method: 'PUT',
          body: formData,
          headers: {
            // 'content-type': 'multipart/form-data',
            Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
          },
        })

        const data = await res.json();

        return data
      })

      // // c3 thunk using fetchThunk 
      // L???I v?? ??ang stringify
      // const json = await dispatch(fetchThunk(API_PATHS.userProfile, 'PUT', formData, true, 'multipart/form-data'))


      if (json.code === RESPONSE_STATUS_SUCCESS) {
        // khi update th??nh th??ng th?? l???y l???i userInfo
        getUserInfo();
        return;
      }

      setErrorMessage(json.message)
      return;
    }
  }

  // l???y ra element img khi preview ???????c ???nh
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    // example git hub react-image-crop
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop])

  const getLocations = useCallback(async (id?: number) => {
    // ??i???u ki???n n???u c?? id th?? g???i state v?? setState c??n n???u kh??ng c?? id th?? ph???i g???i region v?? setRegion
    setLoading(true);
    const json = await dispatch(fetchThunk(id !== 0 ? `${API_PATHS.location}?pid=${id}` : API_PATHS.location, 'get'));
    setLoading(false)
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      return json.data
    }
  }, [dispatch])

  useEffect(() => {
    // khi render v??o th?? set userInfomation ????? l???y th??ng tin user
    setUserInformation(user);
  }, [user])

  useEffect(() => {
    const takeLocation = async () => {
      // promise all ????? call api l???y t??n c???a qu???c gia v?? th??nh ph???
      const result = await Promise.all([getLocations(0), getLocations(userInformation?.region)])

      const region = result[0].find((item: ILocationParams) => item.id === userInformation?.region);
      const state = result[1].find((item: ILocationParams) => item.id === userInformation?.state)

      if (region && state) {
        setLocations((prev) => {
          return {
            ...prev,
            region: region,
            state: state
          }
        })
        return;
      }

      setLocations((prev) => {
        return {
          ...prev,
          region: region,
          state: {
            id: '',
            name: '',
            pid: null
          }
        }
      })
    }

    // sau khi c?? userInformation th?? take location
    if (userInformation?.id) {
      takeLocation();
    }
  }, [userInformation])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-center ">
        {userInformation && (
          <div className="container mt-5 p-5 shadow" style={{ maxWidth: '700px' }}>
            <div
              className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto mb-3 user-img"
              style={{
                width: '100px',
                height: '100px',
                overflow: 'hidden'
              }}
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              {userInformation?.avatar ? (
                <img
                  src={`${BASE_URL}${userInformation?.avatar}`}
                  style={{
                    width: '100%',
                  }}
                />
              ) : (
                <p className="m-0" style={{ fontSize: '50px', fontWeight: 'bold' }}>
                  {userInformation?.name.charAt(0).toUpperCase()}
                </p>
              )}
              {/* input file */}
              <input
                type="file"
                hidden
                ref={fileRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUserImgChange(e)}
                accept="image/*"
              />
            </div>
            {errorMessage && (
              <div className="text-center">
                <small className="text-danger">
                  {errorMessage}
                </small>
              </div>
            )}
            {userInformation?.description && (
              <div>
                {userInformation?.description}
              </div>
            )}
            <div className="text-center mb-3">
              <h1>
                <FormattedMessage id="detailInfo" />
              </h1>
            </div>
            <div className="row mb-3">
              <label className="col-3">
                <FormattedMessage id="email" />
              </label>
              <div className="col-9">
                {userInformation?.email}
              </div>
            </div>
            {userInformation?.gender && (
              <div className="row mb-3">
                <label className="col-3">
                  <FormattedMessage id="gender" />
                </label>
                <div className="col-9">
                  <p className="m-0">
                    {userInformation?.gender === '1' ? <FormattedMessage id="male" /> : <FormattedMessage id="female" />}
                  </p>
                </div>
              </div>
            )}
            {userInformation?.name && (
              <div className="row mb-3">
                <label className="col-3 ">
                  <FormattedMessage id="name" />
                </label>
                <div className="col-9 text-capitalize">
                  <p className="m-0">
                    {userInformation?.name}
                  </p>
                </div>
              </div>
            )}
            {locations.region.name && (
              <div className="row mb-3">
                <label className="col-3">
                  <FormattedMessage id="region" />
                </label>
                <div className="col-9">
                  {locations.region.name}
                </div>
              </div>
            )}
            {
              locations.state.name ? (
                <div className="row mb-3">
                  <label className="col-3">
                    <FormattedMessage id="state" />
                  </label>
                  <div className="col-9">
                    {locations.state.name}
                  </div>
                </div>
              ) : (
                <div className="row mb-3">
                  <label className="col-3">
                    <FormattedMessage id="state" />
                  </label>
                  <div className="col-9">
                    Not Found
                  </div>
                </div>
              )
            }
            <div className="row">
              <button type="button" className="btn btn-primary mx-auto" style={{ width: 'fit-content' }} onClick={() => {
                dispatch(push(ROUTES.home))
              }}>
                <FormattedMessage id="backTohome" />
              </button>
            </div>
          </div>
        )}
      </div>
      {modalShow && (
        <Modal show={modalShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FormattedMessage id="changeImg" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <div>
              <ReactCrop
                // className="crop-img"
                crop={crops}
                src={previewImg}
                onChange={(crops) => {
                  setCrops(crops)
                }}
                onImageLoaded={onLoad}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </div>
            <div>
              <canvas ref={previewCanvasRef} style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <FormattedMessage id="close" />
            </Button>
            <Button variant="primary" onClick={() => {
              handleClose()
              onUploadImg()
            }}>
              <FormattedMessage id="save" />
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default UserInfoPage