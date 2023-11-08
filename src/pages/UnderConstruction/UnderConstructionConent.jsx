import underConstructionImage from "../../assets/images/under_construction_image_compressed.png";
import "./UnderConstructionContent.css"

const UnderConstructionContent = () => {
    return  <main className="underConstructionContent">
    <h1>Sorry, this page is under construction</h1>
    <img
        className="content__image"
        src={underConstructionImage}
        alt="page under construction"
    />
</main>
}

export default UnderConstructionContent