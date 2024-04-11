import { DisplayMode } from "@microsoft/sp-core-library";
import { AccordionData } from "../AccordionData";

export interface IAccordionListProps {
  accordionData: Array<AccordionData>;
  displayMode: DisplayMode;
  updateContent: (accordionItem: AccordionData, text: string) => string;
}
