import * as React from 'react';
import styles from './AreaChartComponent.module.scss';
import type { IAreaChartComponentProps } from './IAreaChartComponentProps';
import { AreaChart } from '@fluentui/react-charting/lib/AreaChart';



export default class AreaChartComponent extends React.Component<IAreaChartComponentProps, {}> {
  public render(): React.ReactElement<IAreaChartComponentProps> {
    const {
    
      chartData
    } = this.props;

    return (
      <section className={`${styles.areachart}`}>
        <AreaChart
        culture={window.navigator.language}
        data={chartData}
        enablePerfOptimization={true}
        />
      </section>
    );
  }
}
