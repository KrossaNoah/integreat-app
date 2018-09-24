// @flow

import type { StoreActionType } from './StoreActionType'
import type { PersistState } from 'redux-persist/src/types'

export type FilesStateType = { [url: string]: string }

export type CategoriesStateType = {
  [city: string]: {|
    +json: { [language: string]: any } | void,
    +error: string | void
  |}
}

export type FileCacheStateType = {
  [city: string]: {|
    +files: FilesStateType | void,
    +ready: boolean,
    +error: string | void
  |}
}

export type CitiesStateType = {|
  +json: any | void,
  +error: string | void
|}

export type StateType = {|
  +uiDirection: string,
  +language: string,
  +darkMode: boolean,

  +cities: CitiesStateType,
  +categories: CategoriesStateType,
  +fileCache: FileCacheStateType,

  +network: {| +isConnected: boolean, +actionQueue: Array<StoreActionType> |},
  +_persist?: PersistState
|}
