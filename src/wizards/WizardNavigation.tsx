import React, {ReactElement} from "react";
import {classNames} from "../utils";
import {ClassNames, Styles} from "./ClassNames";
import {VerticalNav} from "../layout/vertical-nav";
import {WizardStep, WizardStepProps} from "./WizardStep";
import {Button} from "../forms/button";

type WizardNavigationProps = {
    id: number;
    currentStepID: number;
    onSelectStep: (stepID: number) => void;
    show?: boolean;
    showTitle?: boolean;
    title?: string;
};

class WizardNavigationStep extends React.PureComponent<WizardStepProps> {
    private navigationClasses(): string {
        const {id, currentStepID, completed, valid} = this.props;
        return classNames([
            ClassNames.WIZARD_STEPNAV_LINK,
            id === currentStepID && ClassNames.ACTIVE,
            completed && ClassNames.COMPLETE,
            !valid && ClassNames.ERROR,
        ]);
    }

    handleNavigationClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        const {id, onSelectStep} = this.props;
        onSelectStep && onSelectStep(id);
    };

    render() {
        const {currentStepID, name, id, navigationChildren, navigationIcon, navigationTitle} = this.props;
        const navigationDisabled = id !== 0 && (currentStepID === undefined || currentStepID < id - 1);
        return (
            <div className={this.navigationClasses()}>
                <Button
                    disabled={navigationDisabled}
                    link={true}
                    className="clr-wizard-stepnav-link"
                    onClick={this.handleNavigationClick}
                    icon={navigationIcon === undefined ? undefined : {shape: navigationIcon}}
                >
                    {navigationTitle === undefined ? name : navigationTitle}
                    {navigationChildren}
                </Button>
            </div>
        );
    }
}

export default class WizardNavigation extends React.PureComponent<WizardNavigationProps> {
    render() {
        const {title, show, children, currentStepID, onSelectStep} = this.props;
        const classNamesList = classNames([ClassNames.WIZARD_STEPNAV_WRAPPER, ClassNames.NG_TNS]);
        return (
            <VerticalNav className={classNamesList} style={Styles.WIZARD_STEPNAV_WRAPPER_STYLE}>
                <h2 className={ClassNames.WIZARD_TITLE}>
                    <span style={Styles.WIZARD_TITLE_STYLE}>{title}</span>
                </h2>
                {show && (
                    <div className={ClassNames.WIZARD_STEPNAV}>
                        {React.Children.map(children, child => {
                            if (React.isValidElement<WizardStep>(child)) {
                                const wizardStepProps = (child as ReactElement<WizardStep>).props;
                                return (
                                    <WizardNavigationStep
                                        currentStepID={currentStepID}
                                        onSelectStep={onSelectStep}
                                        {...wizardStepProps}
                                    />
                                );
                            }
                        })}
                    </div>
                )}
            </VerticalNav>
        );
    }
}