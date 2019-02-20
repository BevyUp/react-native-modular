import {
  setActiveBundle,
  registerBundle,
  unregisterBundle,
  reloadBundle,
  getActiveBundle,
  getBundles,
} from 'react-native-dynamic-bundle'

import RNFS from 'react-native-fs'

export const download = async (fromUrl, bundleName) => {
  return RNFS.downloadFile({
    fromUrl,
    toFile: RNFS.DocumentDirectoryPath + `/${bundleName}.bundle`,
  }).promise
}

export const getActive = () => getActiveBundle()
export const getAll = () => getBundles()
export const setActive = (bundleName) => setActiveBundle(bundleName)
export const register = (bundleName) => {
  registerBundle(bundleName, `${bundleName}.bundle`)
}
export const reload = () => reloadBundle()
export const unregister = (bundleName) => unregisterBundle(bundleName)

export default {
  download,
  getActive,
  getAll,
  setActive,
  register,
  reload,
  unregister,
}