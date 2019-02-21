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
  return new Promise((resolve, reject) => {
    RNFS.downloadFile({
      fromUrl,
      toFile: RNFS.DocumentDirectoryPath + `/${bundleName}.bundle`,
    }).promise.then(({ statusCode }) => {
      if (statusCode === 200)
        resolve()
      else
        reject({ message : 'Error downloading the file' })
    }).catch((err) => reject({ message : (err.description || err.message) }))
  })
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