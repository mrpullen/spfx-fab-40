import * as React from 'react';
import type { IAccordionListProps } from './IAccordionListProps';
import { Accordion } from '@pnp/spfx-controls-react/lib/Accordion';
import { DisplayMode } from '@microsoft/sp-core-library';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { initializeIcons } from '@fluentui/react';
import { ISectionData } from '../../../model/SectionData';

export default class AccordionList extends React.Component<IAccordionListProps, {}> {
  
  constructor(props: IAccordionListProps) {
    super(props);
    initializeIcons(undefined, { disableWarnings: true });
  }
  
  public render(): React.ReactElement<IAccordionListProps> {
    const {
      accordionData,
      displayMode,
      updateContent
    } = this.props;

    return (
      <React.Fragment>
      <section>
     
      {accordionData.map((accordionItem: ISectionData) => {
        return (<Accordion key={accordionItem.uniqueId} title={accordionItem.title} collapsedIcon={accordionItem.collapsedIcon} expandedIcon={accordionItem.expandedIcon} defaultCollapsed={accordionItem.defaultCollapsed}> 
                {DisplayMode.Edit === displayMode ? <RichText isEditMode={true} className={accordionItem.className} onChange={(text: string):string => {
                  return updateContent(accordionItem, text);
                }} value={accordionItem.content} id={accordionItem.uniqueId}  /> : <div dangerouslySetInnerHTML={{__html:accordionItem.content}}/>}
        </Accordion>);
      })}
      
      </section>
      </React.Fragment>
      
    );
  }
}
