import { WebPartContext } from "@microsoft/sp-webpart-base";


/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IUSMapProps {
  description: string;
  context: WebPartContext;
  listId: string;
  setToolTipContent: (newValue: IMarker | IState | undefined) => void;  
}




export interface IMapPartProps {
  description: string;
  context: WebPartContext;
  listId: string;
  handlebarsTemplate: string;
  
}

export interface MapServiceItem {
  type: string;
  data: any;
  offsetX?: number; 
  offsetY?: number;
}


export interface IMarker extends MapServiceItem {
  name: string;
  address: string;
  link: string;
  coordinates: any;
  horizontalOffset: number;
  fontColor:  string;
  backgroundColor: string;
}





export interface IState extends MapServiceItem {
  id: string;
  region: string;
  numberOfExaminers: number;
  val: string;
  fontColor: string;
  backgroundColor:string; //"#003660"
}