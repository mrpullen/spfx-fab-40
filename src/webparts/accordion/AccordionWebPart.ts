import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AccordionWebPartStrings';
import AccordionList from './components/AccordionList';
import { IAccordionListProps } from './components/IAccordionListProps';


import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { initializeIcons } from '@fluentui/react';
import { ISectionData } from '../../model/SectionData';

export interface IAccordionWebPartProps {
  description: string;
  accordionData: Array<ISectionData>;
  displayMode: DisplayMode;
}

export default class AccordionWebPart extends BaseClientSideWebPart<IAccordionWebPartProps> {

  public onInit(): Promise<void> {
    const promise = new Promise<void>((resolve) => {
      initializeIcons();
      resolve();
    })
    return promise;
  }
  
 
  public render(): void {
    
    const element: React.ReactElement<IAccordionListProps> = React.createElement(
      AccordionList,
      {
        accordionData: this.properties.accordionData ? this.properties.accordionData: [],
        displayMode: this.displayMode,
        updateContent: this.updateAccordionDataContent.bind(this),
       }
    );

    ReactDom.render(element, this.domElement);
  }

  private updateAccordionDataContent(accordionItemData: ISectionData, newContent: string): string {
    const index = this.properties.accordionData.findIndex((accordionItem) => accordionItem.uniqueId === accordionItemData.uniqueId);
    if(index >= 0 && index < this.properties.accordionData.length) {
      this.properties.accordionData[index].content = newContent;
    }
    return newContent;
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldCollectionData('accordionData', {
                  key: 'accordingDataKeyId',
                  label: 'Section Data',
                  panelHeader: 'Accordion Data',
                  manageBtnLabel: '',
                  fields: [
                    {
                      "id": "title",
                      "title": "Title",
                      "type": CustomCollectionFieldType.string,
                    },
                    {
                      "id": "defaultCollapsed",
                      "title": "Is Collapsed",
                      "type": CustomCollectionFieldType.boolean,
                      "defaultValue": false,
                      
                    },
                    {
                      "id": "fontColor",
                      "title": "Font Color",
                      "type": CustomCollectionFieldType.color,
                    },
                    {
                      "id": "backgroundColor",
                      "title": "Background Color",
                      "type": CustomCollectionFieldType.color,
                    },
                    {
                      "id": "collapsedIcon",
                      "title": "Accordion Closed Icon",
                      "type": CustomCollectionFieldType.fabricIcon,
                      "iconFieldRenderMode": 'picker',
                      "defaultValue": "ChevronRight"
                    },
                    {
                      "id": "expandedIcon",
                      "title": "Accordion Open Icon",
                      "type": CustomCollectionFieldType.fabricIcon,
                      "iconFieldRenderMode": 'picker',
                      "defaultValue": "ChevronDown"
                    },
                    {
                      "id": "content",
                      "title": "Content",
                      "disableEdit": true,
                      "type": CustomCollectionFieldType.string,
                    },

                  ],
                  value: this.properties.accordionData ? this.properties.accordionData: [],
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
