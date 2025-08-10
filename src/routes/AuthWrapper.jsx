import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const AuthWrapper = (props) => {
    const currentUser = useSelector((state) => state.user.currentUser)
    return (
        currentUser?.isAdmin ? props.children : <Navigate to='*' replace/>
    )
}

export default AuthWrapper