/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import Container from 'typedi';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'QuickPollWebPartStrings';
import QuickPoll from './components/QuickPoll';
import { IQuickPollProps } from './components/IQuickPollProps';
import { ChartType, DateConvention, DateTimePicker } from '@pnp/spfx-controls-react';
import "@pnp/sp/webs";

import { PnPLogging, LogLevel } from '@pnp/logging';
import { SPFI, spfi, SPFx } from '@pnp/sp';
import { PropertyFieldToggleWithCallout, PropertyFieldCollectionData, CustomCollectionFieldType, PropertyFieldChoiceGroupWithCallout } from "@pnp/spfx-property-controls";
import { CalloutTriggers } from "@pnp/spfx-property-controls/lib/common/callout/Callout";

export interface IQuickPollWebPartProps {
  pollQuestions: Array<any>;
  MessageAfterSubmission: string;
  ButtonSubmitVoteText: string;
  chartType: ChartType;
  ResponseMessageToUser: string;
  pollBasedOnDate: boolean;
  NoPollMessage: string;
}

export default class QuickPollWebPart extends BaseClientSideWebPart<IQuickPollWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IQuickPollProps> = React.createElement(
      QuickPoll,
      {
        pollQuestions: this.properties.pollQuestions,
        context: this.context,

        SuccessfullVoteSubmissionMsg: this.properties.MessageAfterSubmission,
        ResponseMsgToUser: this.properties.ResponseMessageToUser,
        BtnSubmitVoteText: this.properties.ButtonSubmitVoteText,
        chartType: this.properties.chartType ? this.properties.chartType : ChartType.Doughnut,
        pollBasedOnDate: this.properties.pollBasedOnDate,
        NoPollMsg: this.properties.NoPollMessage,
        openPropertyPane: this.openPropertyPane
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private openPropertyPane = (): void => {
    this.context.propertyPane.open();
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    const sp = spfi().using(SPFx(this.context)).using(PnPLogging(LogLevel.Warning));
    Container.set<WebPartContext>('context', this.context);
    Container.set<SPFI>("sp", sp);
  }



  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldToggleWithCallout('pollBasedOnDate', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'pollBasedOnDateFieldId',
                  label: strings.PollDateLabel,
                  calloutContent: React.createElement('div', {}, strings.PollDateCalloutText),
                  onText: 'Yes',
                  offText: 'No',
                  checked: this.properties.pollBasedOnDate
                }),
                PropertyFieldCollectionData("pollQuestions", {
                  key: "pollQuestions",
                  label: strings.PollQuestionsLabel,
                  panelHeader: strings.PollQuestionsPanelHeader,
                  manageBtnLabel: strings.PollQuestionsManageButton,
                  enableSorting: true,
                  value: this.properties.pollQuestions,
                  fields: [
                    {
                      id: "QTitle",
                      title: strings.Q_Title_Title,
                      type: CustomCollectionFieldType.custom,
                      required: true,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement("div", null,
                            React.createElement("textarea",
                              {
                                style: { width: "220px", height: "70px" },
                                placeholder: strings.Q_Title_Placeholder,
                                key: itemId,
                                value: value,
                                onChange: (event: React.FormEvent<HTMLTextAreaElement>) => {
                                  onUpdate(field.id, event.currentTarget.value);
                                },
                              })
                          )
                        );
                      }
                    },
                    {
                      id: "QOptions",
                      title: strings.Q_Options_Title,
                      type: CustomCollectionFieldType.custom,
                      required: true,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement("div", null,
                            React.createElement("textarea",
                              {
                                style: { width: "220px", height: "70px" },
                                placeholder: strings.Q_Options_Placeholder,
                                key: itemId,
                                value: value,
                                onChange: (event: React.FormEvent<HTMLTextAreaElement>) => {
                                  onUpdate(field.id, event.currentTarget.value);
                                },
                              })
                          )
                        );
                      }
                    },
                    {
                      id: "QMultiChoice",
                      title: strings.MultiChoice_Title,
                      type: CustomCollectionFieldType.boolean,
                      defaultValue: false
                    },
                    {
                      id: "QStartDate",
                      title: strings.Q_StartDate_Title,
                      type: CustomCollectionFieldType.custom,
                      required: false,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement(DateTimePicker, {
                            key: itemId,
                            showLabels: false,
                            dateConvention: DateConvention.Date,
                            showGoToToday: true,
                            showMonthPickerAsOverlay: true,
                            value: value ? new Date(value) : undefined,
                            disabled: !this.properties.pollBasedOnDate,
                            onChange: (date: Date) => {
                              onUpdate(field.id, date);
                            }
                          })
                        );
                      }
                    },
                    {
                      id: "QEndDate",
                      title: strings.Q_EndDate_Title,
                      type: CustomCollectionFieldType.custom,
                      required: false,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement(DateTimePicker, {
                            key: itemId,
                            showLabels: false,
                            dateConvention: DateConvention.Date,
                            showGoToToday: true,
                            showMonthPickerAsOverlay: true,
                            value: value ? new Date(value) : undefined,
                            disabled: !this.properties.pollBasedOnDate,
                            onChange: (date: Date) => {
                              onUpdate(field.id, date);
                            }
                          })
                        );
                      }
                    }
                  ],
                  disabled: false
                }),
                PropertyPaneTextField('MsgAfterSubmission', {
                  label: strings.MsgAfterSubmissionLabel,
                  description: strings.MsgAfterSubmissionDescription,
                  maxLength: 150,
                  multiline: true,
                  rows: 3,
                  resizable: false,
                  placeholder: strings.MsgAfterSubmissionPlaceholder,
                  value: this.properties.MessageAfterSubmission
                }),
                PropertyPaneTextField('ResponseMsgToUser', {
                  label: strings.ResponseMsgToUserLabel,
                  description: strings.ResponseMsgToUserDescription,
                  maxLength: 150,
                  multiline: true,
                  rows: 3,
                  resizable: false,
                  placeholder: strings.ResponseMsgToUserPlaceholder,
                  value: this.properties.ResponseMessageToUser
                }),
                PropertyPaneTextField('BtnSubmitVoteText', {
                  label: strings.BtnSumbitVoteLabel,
                  description: strings.BtnSumbitVoteDescription,
                  maxLength: 50,
                  multiline: false,
                  resizable: false,
                  placeholder: strings.BtnSumbitVotePlaceholder,
                  value: this.properties.ButtonSubmitVoteText
                }),
                PropertyPaneTextField('NoPollMsg', {
                  label: strings.NoPollMsgLabel,
                  description: strings.NoPollMsgDescription,
                  maxLength: 150,
                  multiline: true,
                  rows: 3,
                  resizable: false,
                  placeholder: strings.NoPollMsgPlaceholder,
                  value: this.properties.NoPollMessage
                }),
                PropertyFieldChoiceGroupWithCallout('chartType', {
                  calloutContent: React.createElement('div', {}, strings.ChartFieldCalloutText),
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'choice_charttype',
                  label: strings.ChartFieldLabel,
                  options: [
                    {
                      key: 'pie',
                      text: 'Pie',
                      checked: this.properties.chartType === ChartType.Pie,
                      iconProps: { officeFabricIconFontName: 'PieSingle' }
                    }, {
                      key: 'doughnut',
                      text: 'Doughnut',
                      checked: this.properties.chartType === ChartType.Doughnut,
                      iconProps: { officeFabricIconFontName: 'DonutChart' }
                    }, {
                      key: 'bar',
                      text: 'Bar',
                      checked: this.properties.chartType === ChartType.Bar,
                      iconProps: { officeFabricIconFontName: 'BarChartVertical' }
                    }, {
                      key: 'horizontalBar',
                      text: 'Horizontal Bar',
                      checked: this.properties.chartType === ChartType.HorizontalBar,
                      iconProps: { officeFabricIconFontName: 'BarChartHorizontal' }
                    }, {
                      key: 'line',
                      text: 'Line',
                      checked: this.properties.chartType === ChartType.Line,
                      iconProps: { officeFabricIconFontName: 'LineChart' }
                    }]
                })
              ]
            }
          ]
        }
      ]
    };

  }

}