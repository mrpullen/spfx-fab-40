import { DisplayMode } from "@microsoft/sp-core-library";
import { ISectionData } from "../../../model/SectionData";

export interface IAccordionListProps {
  accordionData: Array<ISectionData>;
  displayMode: DisplayMode;
  updateContent: (accordionItem: ISectionData, text: string) => string;
}
