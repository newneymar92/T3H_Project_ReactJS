export interface IAlbum {
  albumId?: number,
  id: number,
  title: string,
  prevTitle?: string,
  changed: boolean,
  url?: string,
  thumbnailUrl: string
}
