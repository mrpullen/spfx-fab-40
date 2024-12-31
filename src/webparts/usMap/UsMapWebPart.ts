/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';



import * as strings from 'UsMapWebPartStrings';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy, PropertyFieldMonacoEditor } from '@pnp/spfx-property-controls';
import { PnPLogging, LogLevel } from '@pnp/logging';
import { spfi, SPFx, SPFI } from '@pnp/sp';
import Container from 'typedi';
import MapPart from './components/MapPart';
import { IMapPartProps } from './components/IMapPartProps';

export interface IUsMapWebPartProps {
  description: string;
  locationList: string;
  handlebarsTemplate: string;
}

export default class UsMapWebPart extends BaseClientSideWebPart<IUsMapWebPartProps> {

 
  public render(): void {

    
    const element: React.ReactElement<IMapPartProps> = React.createElement(
      MapPart,
      {
        description: this.properties.description,
        context: this.context,
        listId: this.properties.locationList,
        handlebarsTemplate: this.properties.handlebarsTemplate
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    const sp = spfi().using(SPFx(this.context)).using(PnPLogging(LogLevel.Warning));
    Container.set<WebPartContext>('context', this.context);
    Container.set<SPFI>("sp", sp);

    return;
  }


  private async listConfigurationChanged(propertyPath: string, oldValue: any, newValue: any) {
    if (propertyPath === 'locationList' && newValue) {
      this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      this.context.propertyPane.refresh();
    }
  }

  private async handlebarsTemplateChanged(newValue: string) {
    if (newValue) {
      this.properties.handlebarsTemplate = newValue;
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
                
                PropertyFieldListPicker("locationList", {
                  label: 'Select a Location List',
                  selectedList: this.properties.locationList,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  baseTemplate: 100,
                  onPropertyChange: this.listConfigurationChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  key: 'listPickerFieldId'
                  }
                ),
                PropertyFieldMonacoEditor('popupContent', {
                  key: 'popupContent',
                  value: this.properties.handlebarsTemplate,
                  showMiniMap: true,
                  onChange: this.handlebarsTemplateChanged.bind(this) ,
                  language: 'handlebars',
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

