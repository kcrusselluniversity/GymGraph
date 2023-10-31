import { Outlet } from "react-router-dom"
import NavBar from "../../components/ui/NavBar"

/**
 * UserPageLayout component
 * 
 * This component is used to house the layout shared between common pages
 * that have the same navigation bar. This reduces the need to rerender
 * the navbar everytime a user changes pages. 
 */
const UserPageLayout = () => {
    return <div className="userPageContainer">
        <NavBar />
        <Outlet />        
    </div>
}

export default UserPageLayout