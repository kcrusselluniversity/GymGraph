import Router from "./pages/Router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

/**
 * App Component
 *
 * The root component of the application, responsible for rendering the main
 * router component that defines the site's navigation.
 */
const App = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router />
        </LocalizationProvider>
    );
};

export default App;
