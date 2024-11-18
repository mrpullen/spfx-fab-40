import * as React from 'react';
import type { IAreaChartComponentProps } from './IAreaChartComponentProps';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react';




export default class AreaChartComponent extends React.Component<IAreaChartComponentProps, {}> {
  public render(): React.ReactElement<IAreaChartComponentProps> {
    

    return (
      <section>
       <ChartControl type={ChartType.Line} data={this.props.chartData} />
      </section>
    );
  }
}
