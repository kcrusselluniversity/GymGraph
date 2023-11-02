import GymGraphLogo from "../../components/GymGraphLogo";
import "./underConstruction.css";
import underConstructionImage from "../../assets/images/under_construction_image_compressed.png";

const UnderConstruction = () => {
    return (
        <div className="underConstruction">
            <GymGraphLogo />
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
