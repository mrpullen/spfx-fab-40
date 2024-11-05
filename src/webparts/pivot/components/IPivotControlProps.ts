import { DisplayMode } from "@microsoft/sp-core-library";
import { ISectionData } from "../../../model/SectionData";
import { PivotLinkFormatType } from "@fluentui/react";




export interface IPivotControlProps {
 sectionData: Array<ISectionData>;
 linkFormat: PivotLinkFormatType; 
 displayMode: DisplayMode;
 updateContent: (sectionData: ISectionData, text: string) => string;
}

