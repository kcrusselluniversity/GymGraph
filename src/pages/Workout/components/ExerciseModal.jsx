import SearchBar from "../../../components/ui/SearchBar";
import ExercisesAccordion from './ExercisesAccordion';

const ExerciseModal = () => {
    return (
        <div className="ExerciseModal">
            <SearchBar placeholder="Search exercise" name="exercise" />
            <ExercisesAccordion />
        </div>
    );
};

export default ExerciseModal;
