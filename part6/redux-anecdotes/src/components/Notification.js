import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  const style = {
    display: notification.display,
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return <div style={style}>{notification.message}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
