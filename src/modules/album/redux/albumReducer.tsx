import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { IAlbum } from "../../../models/albumModel";
export interface AlbumState {
  albums: IAlbum[],
}

export const setAlbum = createCustomAction('album/setAlbum', (data: IAlbum[]) => {
  return {
    data
  }
});

export const updateAlbum = createCustomAction('album/updateAlbum', (data: IAlbum[]) => {
  return {
    data
  }
})

const actions = { setAlbum, updateAlbum };

type Action = ActionType<typeof actions>;

export default function reducer(state: AlbumState = {
  albums: []
}, action: Action) {
  switch (action.type) {
    case getType(setAlbum): {
      // hàm getType trong typesafe-actions để lấy type trong object trả về của hàm createCustomAction
      return { ...state, albums: action.data };
    }
    case getType(updateAlbum): {
      return {
        ...state,
        albums: [
          ...state.albums,
          ...action.data
        ]
      }
    }
    default:
      return state;
  }
}
