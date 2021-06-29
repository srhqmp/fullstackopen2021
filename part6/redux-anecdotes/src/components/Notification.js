import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideNotif } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  const hide = () =>
    notification.message
      ? setTimeout(() => {
          dispatch(hideNotif())
        }, 5000)
      : ''
  hide()

  const style = {
    display: notification.display,
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
