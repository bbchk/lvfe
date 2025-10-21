import { useDispatch, useSelector } from 'react-redux'

import { useCallback, useEffect, useRef } from 'react'
import useSyncWishList from './use_sync_wish_list'
import * as wishList from 'store/slices/wish_list.slice'

import useLocalStorage from 'hooks/useLocalStorage'

//todo
//todo when login in on catalog page, new likes are not saved
export const useWishList = () => {
  const dispatch = useDispatch()
  const { wishList: wshl, status } = useSelector((state) => state.wishList)

  const [localStWishList, setValue] = useLocalStorage('wish_list', [])

  const [_, set] = useSyncWishList()

  const isSet = useRef(false)

  useEffect(() => {
    ;(async () => {
      /* 
        when user reload page
        if user has change wishList
        we need to set new state to user.wishList
        as cleanup function does not work on page reload
        */

      if (!isSet.current) {
        ;(async () => await set(localStWishList))()
      }
      isSet.current = true
    })()
  }, [])

  //sync with localStorage and db on component unmount
  const wshlRef = useRef(wshl)
  wshlRef.current = wshl
  useEffect(() => {
    //todo do it on sign and signUP modals open
    return () => {
      ;(async () => await set(wshlRef.current))()
    }
  }, [])

  //save to localStorage if user reloads or closes page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      setValue(wshlRef.current)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  //toggle like
  const like = useCallback(
    async function () {
      if (!wshl.includes(this._id)) {
        dispatch(wishList.add(this._id))
      } else {
        dispatch(wishList.remove(this._id))
      }
    },
    [dispatch, wshl],
  )

  return [wshl, like]
}
