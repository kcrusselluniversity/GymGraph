import { Link } from "react-router-dom";
import GymGraphLogo from "../../components/ui/GymGraphLogo";
import underConstructionImage from "../../assets/images/under_construction_image_compressed.png";
import "./underConstruction.css";

const UnderConstruction = () => {
    return (
        <div className="underConstruction">
            <header>
                <Link to="/">
                    <GymGraphLogo />
                </Link>
            </header>
            <main className="content">
                <h1>Sorry, this page is still under construction</h1>
                <img
                    className="content__image"
                    src={underConstructionImage}
                    alt="page under construction"
                />
            </main>
        </div>
    );
};

export default UnderConstruction;
