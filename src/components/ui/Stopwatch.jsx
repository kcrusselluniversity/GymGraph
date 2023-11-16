import CircularProgressbar from "./CircularProgressbar";
import './Stopwatch.css'

const Stopwatch = () => {
    return (
        <CircularProgressbar>
            <div className="Stopwatch__content">
                <span className="Stopwatch__chosenTime">2:30</span>
                <span className="Stopwatch__remainingTime">1:59</span>
            </div>
        </CircularProgressbar>
    );
};

export default Stopwatch;