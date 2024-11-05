/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import styles from './PivotControl.module.scss';
import { IPivotControlProps } from './IPivotControlProps';
import { RichText } from '@pnp/spfx-controls-react/lib/RichText';
import { Pivot, PivotItem } from '@fluentui/react';
import { DisplayMode } from '@microsoft/sp-core-library';
import { ISectionData } from '../../../model/SectionData';


export default class PivotControl extends React.Component<IPivotControlProps, {}> {
  public render(): React.ReactElement<IPivotControlProps> {
    const {
      sectionData,
      linkFormat,
      displayMode,
      updateContent
    } = this.props;

    return (
      <React.Fragment>
        <section className={`${styles.pivot}`}>
          <Pivot overflowBehavior={'menu'} overflowAriaLabel="More Items" linkFormat={linkFormat}>
            {sectionData.map((sectionData: ISectionData) => {
              return (
                <PivotItem key={sectionData.uniqueId} headerText={sectionData.title} itemIcon={sectionData.expandedIcon ? sectionData.expandedIcon : undefined}>
                  {DisplayMode.Edit === displayMode ? <RichText isEditMode={true} className={sectionData.className} onChange={(text: string): string => {
                    return updateContent(sectionData, text);
                  }} value={sectionData.content} id={sectionData.uniqueId} /> : <div dangerouslySetInnerHTML={{ __html: sectionData.content }} />}
                </PivotItem>
              )
            })}
          </Pivot>
        </section>
      </React.Fragment>
    );
  }
}
