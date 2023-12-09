import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { EXERCISE_GROUPS } from "../../../data/constants";
import exerciseGroupList from "../utils/exerciseGroupList";
import { func, string, array } from "prop-types";

/**
 * AccordionPanel component
 *
 * An accordion panel component that displays the exercise Group as the title
 * (eg legs, chest etc) as well as containing the accordion details
 * which contains all exercises associated with the given muscle group.
 * @param {string} currentPanel: The panel currently open.
 * @param {function} setCurrentPanel: Function to set the current panel.
 * @param {string} panelName
 * @param {string} title: The title of the accordion panel.
 * @param {array} details: The details of the accordion panel.
 */
const AccordionPanel = ({
    currentPanel,
    setCurrentPanel,
    panelName,
    title,
    details,
}) => {
    const handlePanelChange = (panel) => {
        return () => {
            // Close all panels if the user selects the currently open panel,
            // otherwise set the current panel to the panel the user has selected
            const newPanel = currentPanel === panel ? null : panel;
            setCurrentPanel(newPanel);
        };
    };

    return (
        <Accordion
            disableGutters
            expanded={currentPanel === panelName}
            onChange={handlePanelChange(panelName)}
        >
            <AccordionSummary
                className="accordionSummary"
                data-testid="exerciseGroupPanel"
                expandIcon={<ExpandMore />}
            >
                <b>{title}</b>
            </AccordionSummary>
            <AccordionDetails className="accordionDetails">
                {details}
            </AccordionDetails>
        </Accordion>
    );
};

/**
 * ExercisesAccordion
 *
 * An accordion that has each muscle group as a title, and each muscle groups
 * exercises as the body of the accordion panel.
 *
 * It takes the list of exercise groups from the constants file, then
 * generates the list of exercises associated with each muscle group
 * by calling the exerciseGroupList function.
 */
const ExercisesAccordion = () => {
    const [currentPanel, setCurrentPanel] = useState(null);

    return (
        <div className="exercisesAccordion">
            {EXERCISE_GROUPS.map((exerciseGroup) => {
                return (
                    <AccordionPanel
                        currentPanel={currentPanel}
                        setCurrentPanel={setCurrentPanel}
                        key={exerciseGroup}
                        panelName={exerciseGroup}
                        title={exerciseGroup}
                        details={exerciseGroupList(exerciseGroup)}
                    />
                );
            })}
        </div>
    );
};

AccordionPanel.propTypes = {
    currentPanel: string,
    setCurrentPanel: func,
    panelName: string,
    title: string,
    details: array,
};

export default ExercisesAccordion;
