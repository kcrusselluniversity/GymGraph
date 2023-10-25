import { Outlet } from "react-router-dom"
import NavBar from "../../components/NavBar"

const UserPageLayout = () => {
    return <>
        <NavBar />
        <Outlet />        
    </>
}

export default UserPageLayout