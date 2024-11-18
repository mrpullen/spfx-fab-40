/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AreachartWebPartStrings';
import AreaChartComponent from './components/AreaChartComponent';
import { IAreaChartComponentProps } from './components/IAreaChartComponentProps';

import { CustomCollectionFieldType, PropertyFieldCollectionData } from '@pnp/spfx-property-controls';
import DataModal from '../../components/DataModal';


export interface IChartDataset {
  label: string;
  data: Array<IChartDataPoints>;
  fillColor: string;
  lineColor: string;
  fill: string;
  smooth: boolean;
}


export interface IChartDataPoints {
  key: string;
  value: number;
}


export interface IAreachartWebPartProps {
  labels: Array<{uniqueId: string, label: string, sortIdx: number}>;
  datasets: Array<IChartDataset>;

}

const inputs = {
  min: 1,
  max: 100,
  count: 8,
  decimals: 2,
  continuity: 1
};

const generateLabels = (): Array<string> => {
  const months = ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'];
  
  const res = months.slice(0, inputs.count);
  
  return res;
};

const generateData = (): Array<number> => {

  const results: Array<number> = [];
  
  for(let i = 0; i < inputs.count; i++) {
    const val = Math.floor(Math.random() * (inputs.min - inputs.max + 1)) + inputs.max;
    results.push(val);
  }

  return results;
  
};

const defaultChartData = {
  labels: generateLabels(), 
  datasets: [
    {
      label: 'Sample Dataset 1',
      data: generateData(),
      borderColor: '#9B2743',
      backgroundColor: "#205493"
    }
  ]
}

export default class AreachartWebPart extends BaseClientSideWebPart<IAreachartWebPartProps> {
  
 

  public render(): void {
    
    let chartData = defaultChartData;
    try {
      if(this.properties.datasets) {
       
        const data = this.properties.datasets.map((dataset: IChartDataset) => {

          return {
            label: dataset.label,
            data: dataset.data.map((mapData:IChartDataPoints) => { return mapData.value }),
            borderColor:dataset.lineColor,
            backgroundColor: dataset.fillColor
          }

        });
      
       
        chartData = {
          labels: this.properties.labels.map(data => data.label),
          datasets: data
        };
      }
    }
    catch {
      chartData = defaultChartData;
    }

    const element: React.ReactElement<IAreaChartComponentProps> = React.createElement(
      AreaChartComponent,
      {
        chartData: chartData
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyFieldCollectionData('labels', {
                  key: 'labels',
                  label: "Manage Labels",
                  panelHeader: "Set Labels",
                  manageBtnLabel: "Manage Labels",
                  value: this.properties.labels,
                  fields: [
                    {
                      id: "label",
                      title: "Label",
                      type: CustomCollectionFieldType.string,
                      required: true
                    }
                  ]
                }),
                PropertyFieldCollectionData('datasets', {
                  key: 'datasets',
                  label: "Data Sets",
                  panelHeader: "Collection Data Set Header",
                  manageBtnLabel: "Manage Datasets",
                  value: this.properties.datasets,
                  fields: [
                    {
                      id: "label",
                      title:"Label",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "data",
                      title: "DataSet",
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field: any, value: any, onUpdate: (fieldId: string, value: any) => void, item, itemId, onError) => {  

                        const fieldId = field.id;
                        return (
                          React.createElement(DataModal, {
                            index: 1,
                            itemId: itemId,
                            labels: this.properties.labels,
                            data: value,
                            onSave: (data: any) => { onUpdate(fieldId, data); } 
                          })
                        );

                      }
                    },
                    {
                      id: "fillColor",
                      title: "Fill Color",
                      type: CustomCollectionFieldType.color,
                    },
                    {
                      id: "lineColor",
                      title: "Line Color",
                      type: CustomCollectionFieldType.color,
                    },
                    {
                      id: "fill",
                      title: "Fill Type",
                      type: CustomCollectionFieldType.dropdown,
                      options: [
                        {
                          key: "none",
                          text: "None"
                        },
                        {
                          key: "origin",
                          text: "Origin"
                        },
                        {
                          key: "start",
                          text: "Start"
                        },
                        {
                          key: "end",
                          text: "End"
                        },
                      ],
                    },
                    {
                      id: "smooth",
                      title: "Smooth",
                      type: CustomCollectionFieldType.boolean
                      
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
