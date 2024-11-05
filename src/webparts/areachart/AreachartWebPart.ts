import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AreachartWebPartStrings';
import AreaChartComponent from './components/AreaChartComponent';
import { IAreaChartComponentProps } from './components/IAreaChartComponentProps';
import { PropertyFieldMonacoEditor } from '@pnp/spfx-property-controls/lib/PropertyFieldMonacoEditor';
import { IChartProps } from '@fluentui/react-charting';

export interface IAreachartWebPartProps {
  description: string;
  chartData: IChartProps;
  chartDataString: string;
}

const chart1Points = [
  {
    x: 20,
    y: 7000,
    xAxisCalloutData: '2018/01/01',
    yAxisCalloutData: '35%',
  },
  {
    x: 25,
    y: 9000,
    xAxisCalloutData: '2018/01/15',
    yAxisCalloutData: '45%',
  },
  {
    x: 30,
    y: 13000,
    xAxisCalloutData: '2018/01/28',
    yAxisCalloutData: '65%',
  },
  {
    x: 35,
    y: 15000,
    xAxisCalloutData: '2018/02/01',
    yAxisCalloutData: '75%',
  },
  {
    x: 40,
    y: 11000,
    xAxisCalloutData: '2018/03/01',
    yAxisCalloutData: '55%',
  },
  {
    x: 45,
    y: 8760,
    xAxisCalloutData: '2018/03/15',
    yAxisCalloutData: '43%',
  },
  {
    x: 50,
    y: 3500,
    xAxisCalloutData: '2018/03/28',
    yAxisCalloutData: '18%',
  },
  {
    x: 55,
    y: 20000,
    xAxisCalloutData: '2018/04/04',
    yAxisCalloutData: '100%',
  },
  {
    x: 60,
    y: 17000,
    xAxisCalloutData: '2018/04/15',
    yAxisCalloutData: '85%',
  },
  {
    x: 65,
    y: 1000,
    xAxisCalloutData: '2018/05/05',
    yAxisCalloutData: '5%',
  },
  {
    x: 70,
    y: 12000,
    xAxisCalloutData: '2018/06/01',
    yAxisCalloutData: '60%',
  },
  {
    x: 75,
    y: 6876,
    xAxisCalloutData: '2018/01/15',
    yAxisCalloutData: '34%',
  },
  {
    x: 80,
    y: 12000,
    xAxisCalloutData: '2018/04/30',
    yAxisCalloutData: '60%',
  },
  {
    x: 85,
    y: 7000,
    xAxisCalloutData: '2018/05/04',
    yAxisCalloutData: '35%',
  },
  {
    x: 90,
    y: 10000,
    xAxisCalloutData: '2018/06/01',
    yAxisCalloutData: '50%',
  },
];

const chart2Points = [
  {
    x: 20,
    y: 7200,
    xAxisCalloutData: '2018/01/01',
    yAxisCalloutData: '35%',
  },
  {
    x: 25,
    y: 8000,
    xAxisCalloutData: '2018/01/15',
    yAxisCalloutData: '45%',
  },
  {
    x: 30,
    y: 14000,
    xAxisCalloutData: '2018/01/28',
    yAxisCalloutData: '65%',
  },
  {
    x: 35,
    y: 16000,
    xAxisCalloutData: '2018/02/01',
    yAxisCalloutData: '75%',
  },
  {
    x: 40,
    y: 10000,
    xAxisCalloutData: '2018/03/01',
    yAxisCalloutData: '55%',
  },
  {
    x: 45,
    y: 9060,
    xAxisCalloutData: '2018/03/15',
    yAxisCalloutData: '43%',
  },
  {
    x: 50,
    y: 9000,
    xAxisCalloutData: '2018/03/28',
    yAxisCalloutData: '18%',
  },
  {
    x: 55,
    y: 18000,
    xAxisCalloutData: '2018/04/04',
    yAxisCalloutData: '100%',
  },
  {
    x: 60,
    y: 12000,
    xAxisCalloutData: '2018/04/15',
    yAxisCalloutData: '85%',
  },
  {
    x: 65,
    y: 3000,
    xAxisCalloutData: '2018/05/05',
    yAxisCalloutData: '5%',
  },
  {
    x: 70,
    y: 14000,
    xAxisCalloutData: '2018/06/01',
    yAxisCalloutData: '60%',
  },
  {
    x: 75,
    y: 9976,
    xAxisCalloutData: '2018/01/15',
    yAxisCalloutData: '34%',
  },
  {
    x: 80,
    y: 11000,
    xAxisCalloutData: '2018/04/30',
    yAxisCalloutData: '60%',
  },
  {
    x: 85,
    y: 17000,
    xAxisCalloutData: '2018/05/04',
    yAxisCalloutData: '35%',
  },
  {
    x: 90,
    y: 12000,
    xAxisCalloutData: '2018/06/01',
    yAxisCalloutData: '50%',
  },
];

const defaultChartData:IChartProps = {
  chartTitle: 'Area chart sample',
  lineChartData: [
    {
      legend: 'Sample 1',
      data: chart1Points,
    },
    {
      legend: 'Sample 2',
      data: chart2Points
    }
  ]
}

export default class AreachartWebPart extends BaseClientSideWebPart<IAreachartWebPartProps> {
  
  private onChartDataChanged(newValue: string): void {
    try 
    {
      if(newValue === undefined) {
          const chartData: IChartProps = defaultChartData;
          this.properties.chartData = chartData;
          this.properties.chartDataString = JSON.stringify(defaultChartData);
      }
      else {
      //essentially don't set the new data string value if it doesn't parse.
      const chartData:IChartProps = JSON.parse(newValue);
      this.properties.chartData = chartData;
      this.properties.chartDataString = newValue;
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  public render(): void {
    
    let chartData = defaultChartData;
    try {
      if(this.properties.chartDataString) {
        chartData = JSON.parse(this.properties.chartDataString);
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
                PropertyFieldMonacoEditor('chartDataString', {
                  key: 'chartDataEditor',
                  
                  value: this.properties.chartDataString !== "" && this.properties.chartDataString !== undefined ? this.properties.chartDataString : JSON.stringify(defaultChartData),
                  showMiniMap: true,
                  onChange: this.onChartDataChanged,
                  language:"json",
                  showLineNumbers:true,
                  
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
