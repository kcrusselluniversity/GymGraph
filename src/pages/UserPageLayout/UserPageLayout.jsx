import { Outlet } from "react-router-dom"
import RestTimerProvider from "../../context/RestTimerProvider"
import NavBar from "../../components/ui/NavBar"
import "./UserPageLayout.css"

/**
 * UserPageLayout component
 * 
 * This component is used to house the layout shared between common pages
 * that have the same navigation bar. This reduces the need to rerender
 * the navbar everytime a user changes pages. 
 */
const UserPageLayout = () => {
    return <RestTimerProvider>
        <div className="userPageContainer">
            <NavBar />
            <Outlet />
        </div>
    </RestTimerProvider>
}

export default UserPageLayout