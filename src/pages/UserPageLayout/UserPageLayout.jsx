import { Outlet } from "react-router-dom"
import NavBar from "../../components/ui/NavBar"

const UserPageLayout = () => {
    return <div className="userPageContainer">
        <NavBar />
        <Outlet />        
    </div>
}

export default UserPageLayout