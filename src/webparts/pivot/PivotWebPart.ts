import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  PropertyPaneChoiceGroup,
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PivotWebPartStrings';
import PivotControl from './components/PivotControl';
import { ISectionData } from '../../model/SectionData';
import { initializeIcons, PivotLinkFormatType } from '@fluentui/react';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls';
import { IPivotControlProps } from './components/IPivotControlProps';

export interface IPivotWebPartProps {
  
  sectionData: Array<ISectionData>;
  linkFormat: PivotLinkFormatType;
}

export default class PivotWebPart extends BaseClientSideWebPart<IPivotWebPartProps> {

  _environmentMessage: string;
  _isDarkTheme: boolean;



  public render(): void {
    const element: React.ReactElement<IPivotControlProps> = React.createElement(
      PivotControl,
      {
        sectionData: this.properties.sectionData ? this.properties.sectionData: [],
        linkFormat: this.properties.linkFormat ? this.properties.linkFormat: 'tabs',
        displayMode: this.displayMode,
        updateContent: this.updateSectionDataContent.bind(this),
      }
    );

    ReactDom.render(element, this.domElement);
  }


  private updateSectionDataContent(sectionItemData: ISectionData, newContent: string): string {
    const index = this.properties.sectionData.findIndex((sectionData) => sectionData.uniqueId === sectionItemData.uniqueId);
    if(index >= 0 && index < this.properties.sectionData.length) {
      this.properties.sectionData[index].content = newContent;
    }
    return newContent;
  }
 

  protected onInit(): Promise<void> {
    const promise = new Promise<void>((resolve) => {
      initializeIcons();
      resolve();
    })
    return promise;
  }


  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
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
                PropertyPaneChoiceGroup('linkFormat', {
                  options: [
                    {
                      key: "links",
                      text: "Links"
                    },
                    { key: "tabs",
                      text: "Tabs"
                    }
                  ],
                  label: "Pivot Style"
                }),
                PropertyFieldCollectionData('sectionData', {
                  key: 'sectionDataKeyId',
                  label: 'Section Data',
                  panelHeader: 'Section Data',
                  manageBtnLabel: '',
                  fields: [
                    {
                      "id": "title",
                      "title": "Label",
                      "type": CustomCollectionFieldType.string,
                    },
                    {
                      "id": "defaultCollapsed",
                      "title": "Is Open",
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
                  value: this.properties.sectionData ? this.properties.sectionData: [],
                })
              ]
            }
          ]
        }
      ]
    };
  }
}