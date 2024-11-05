/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { IOptionsContainerProps } from './IOptionsContainerProps';
import * as _ from 'lodash';
import { List, ChoiceGroup, Checkbox, IChoiceGroupOption } from '@fluentui/react';

export interface IOptionsContainerState {
    selChoices?: string[];
}

export default class OptionsContainer extends React.Component<IOptionsContainerProps, IOptionsContainerState> {
    constructor(props: IOptionsContainerProps) {
        super(props);
        this.state = {
            selChoices: []
        };
    }

    public render(): JSX.Element {
        const { disabled, multiSelect } = this.props;
        return (
            <div>
                {multiSelect ? (
                    <div style={{ paddingTop: "15px" }}>
                        <List items={this.getOptions()} onRenderCell={this._onRenderCell} />
                    </div>
                ) : (
                        <ChoiceGroup disabled={disabled}
                            selectedKey={this._getSelectedKey()}
                            options={this.onRenderChoiceOptions()} required={true} label=""
                            onChange={this._onChange}
                        />
                    )
                }
            </div>
        );
    }

    private getOptions = (): string[] => {
        const tempChoices: string[] = [];
        if (this.props.options && this.props.options.indexOf(',') >= 0) {
            const tmpChoices = this.props.options.split(',');
            tmpChoices.map(choice => {
                if (choice && choice.trim().length > 0) tempChoices.push(choice);
            });
        } else if(this.props.options) { tempChoices.push(this.props.options); }
        return tempChoices;
    }

    private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
        if (item && item.length > 0) {
            return (
                <div style={{ marginBottom: "15px" }}>
                    <Checkbox label={item} onChange={this._makeChangeHandler(item)} />
                </div>
            );
        }
        else {
            return <div />;
        }
    }

    private onRenderChoiceOptions(): IChoiceGroupOption[] {
        const choices: IChoiceGroupOption[] = [];
        const tempChoices: string[] = this.getOptions();
        if (tempChoices.length > 0) {
            tempChoices.map((choice: string) => {
                choices.push({
                    key: choice.trim(),
                    text: choice.trim()
                });
            });
        } else {
            choices.push({
                key: '0',
                text: "Sorry, no choices found",
                disabled: true,
            });
        }
        return choices;
    }

    private _getSelectedKey = (): string => {
        if(this.props.selectedKey)
        return this.props.selectedKey();
        else
        return "";
    }

    private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
        if(this.props.onChange)
            this.props.onChange(ev, option, false);
    }

    private _makeChangeHandler = (item: string): any => {
        return (ev: any, checked: boolean) => this._onCheckboxChange(ev, checked, item);
    }

    private _onCheckboxChange = (ev: any, isChecked: boolean, item: string): void => {
        if(this.state.selChoices) {
            let finalSel: string[] = this.state.selChoices;
            if (finalSel.length > 0) {
                if (isChecked) {
                    finalSel.push(item);
                } else finalSel = _.filter(finalSel, (o) => { return o !== item; });
            } else {
                if (isChecked) finalSel.push(item);
            }
    
            this.setState({ selChoices: finalSel });
            if(this.props.onChange) {
                this.props.onChange(ev, { key: finalSel }, true);
            }
        }
    }

}