import React from 'react'

const Notification = ({message,error}) => {
    if (message === null) {
        return null
    }
    if (error){
        return(
        <div className="error">
            {message}
        </div>)
    }
    return(
        <div className="msg">
             {message}
        </div>
    )
}


export default Notification