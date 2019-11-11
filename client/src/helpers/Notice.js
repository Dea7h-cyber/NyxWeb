import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

export default ({ error, message }) => {
  store.addNotification({
    message: error ? error : message,
    type: error ? 'danger' : 'success', // 'default', 'success', 'info', 'warning'
    container: 'top-center', // where to position the notifications
    animationIn: ['animated', 'flipInX'], // animate.css classes that's applied
    animationOut: ['animated', 'flipOutX'], // animate.css classes that's applied
    dismiss: {
      duration: 5000,
      onScreen: true,
      pauseOnHover: true
    },
    width: 500
  })
}
