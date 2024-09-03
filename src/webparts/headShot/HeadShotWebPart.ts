/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'HeadShotWebPartStrings';
import HeadShot from './components/HeadShot';
import { IHeadShotProps } from './components/IHeadShotProps';
import { getSP } from '../../pnpjs-config';
import { CustomCollectionFieldType, PropertyFieldCollectionData, PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IHeadShotWebPartProps {
  list: string;
  description: string;
  backgrounds: Array<{title: string, link:string, caption:string, default: boolean}>;
}

export default class HeadShotWebPart extends BaseClientSideWebPart<IHeadShotWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
 

  public render(): void {
    const element: React.ReactElement<IHeadShotProps> = React.createElement(
      HeadShot,
      {
        listName: this.properties.list,
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        backgrounds: this.properties.backgrounds && this.properties.backgrounds.length > 0 ? this.properties.backgrounds : []
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
 
    this._environmentMessage = await this._getEnvironmentMessage();
   
    await super.onInit();

    getSP(this.context);

  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldCollectionData("backgrounds", {
                  key: "backgrounds",
                  label: "Image Backgrounds",
                  panelHeader: "Collection Background Data",
                  manageBtnLabel: "Manage available backgrounds",
                  value: this.properties.backgrounds,
                  fields: [
                    {
                      id: "title",
                      title: "Title",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "link",
                      title: "Link",
                      type: CustomCollectionFieldType.url,
                      required: true
                    },
                    {
                      id: "caption",
                      title: "Caption",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "default",
                      title: "Default",
                      type: CustomCollectionFieldType.boolean,
                      required: true
                    }             
                  ],
                  disabled: false
                }),
                PropertyFieldListPicker('list', {
                  label: 'Select a list',
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: (this.context as any),
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
                
              ]
            }
          ]
        }
      ]
    };
  }
}
