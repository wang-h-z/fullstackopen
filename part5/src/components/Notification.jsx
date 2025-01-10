const Notification = ({ notification }) => {
    if (notification === null) {
      return null
    }
  
    return (
      <div className={`notification ${notification.error} error`}>
        {notification.message}
      </div>
    )
  }
  
  export default Notification