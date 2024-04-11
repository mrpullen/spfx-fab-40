import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'AccordionWebPartStrings';
import AccordionList from './components/AccordionList';
import { IAccordionListProps } from './components/IAccordionListProps';
import { AccordionData } from './AccordionData';

import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { initializeIcons } from '@fluentui/react';

export interface IAccordionWebPartProps {
  description: string;
  accordionData: Array<AccordionData>;
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

  private updateAccordionDataContent(accordionItemData: AccordionData, newContent: string): string {
    const index = this.properties.accordionData.findIndex((accordionItem) => accordionItem.uniqueId === accordionItemData.uniqueId);
    if(index >= 0 && index < this.properties.accordionData.length) {
      this.properties.accordionData[index].content = newContent;
    }
    return newContent;
  }
 

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

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
                  label: '',
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
                      "id": "className",
                      "title": "Class",
                      "type": CustomCollectionFieldType.string,
                    },
                    {
                      "id": "collapsedIcon",
                      "title": "Accordion Closed Icon",
                      "type": CustomCollectionFieldType.fabricIcon,
                      "defaultValue": "ChevronRight"
                    },
                    {
                      "id": "expandedIcon",
                      "title": "Accordion Open Icon",
                      "type": CustomCollectionFieldType.fabricIcon,
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
