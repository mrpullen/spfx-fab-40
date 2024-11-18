import * as React from 'react';
import type { IAccordionListProps } from './IAccordionListProps';
import { Accordion } from '@pnp/spfx-controls-react/lib/Accordion';
import { DisplayMode } from '@microsoft/sp-core-library';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { getTheme, initializeIcons, mergeStyleSets } from '@fluentui/react';
import { ISectionData } from '../../../model/SectionData';

export default class AccordionList extends React.Component<IAccordionListProps, {}> {
  
  constructor(props: IAccordionListProps) {
    super(props);
    initializeIcons(undefined, { disableWarnings: true });
  }

  public getAccordion(accordionItem: ISectionData): JSX.Element {
    const {
      
      displayMode,
      updateContent
    } = this.props;
    
    const theme = getTheme();
   
    const className = mergeStyleSets({
      root: {
        '&': {
      
          button: {
            color: `${accordionItem.fontColor !== undefined ? accordionItem.fontColor: theme.palette.themePrimary} !important`,
            backgroundColor: `${accordionItem.backgroundColor !== undefined ? accordionItem.backgroundColor: theme.palette.neutralPrimary} !important`
          },

          i: {
            color: `${accordionItem.fontColor !== undefined ? accordionItem.fontColor: theme.palette.themePrimary} !important`,
            backgroundColor: `${accordionItem.backgroundColor !== undefined ? accordionItem.backgroundColor: theme.palette.neutralPrimary} !important`
          },

       
        
        }
      }
    });
      return (<Accordion key={accordionItem.uniqueId} className={className.root} title={accordionItem.title} collapsedIcon={accordionItem.collapsedIcon} expandedIcon={accordionItem.expandedIcon} defaultCollapsed={accordionItem.defaultCollapsed}> 
      {DisplayMode.Edit === displayMode ? <RichText isEditMode={true} className={accordionItem.className} onChange={(text: string):string => {
        return updateContent(accordionItem, text);
      }} value={accordionItem.content} id={accordionItem.uniqueId}  /> : <div dangerouslySetInnerHTML={{__html:accordionItem.content}}/>}
</Accordion>);
    
    
     
  }
  
  public render(): React.ReactElement<IAccordionListProps> {
    const {
      accordionData,
    } = this.props;

   

    return (
      <React.Fragment>
      <section>
     
      {accordionData.map((accordionItem: ISectionData) => {
        return this.getAccordion(accordionItem);
      })}
      
      </section>
      </React.Fragment>
      
    );
  }
}
