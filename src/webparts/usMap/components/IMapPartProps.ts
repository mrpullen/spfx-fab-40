import { WebPartContext } from "@microsoft/sp-webpart-base";


/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Interface representing the properties for the US Map component.
 */
export interface IUSMapProps {
  /**
   * Description of the US Map component.
   */
  description: string;

  /**
   * Context of the web part.
   */
  context: WebPartContext;

  /**
   * ID of the list associated with the US Map component.
   */
  listId: string;

  /**
   * Function to set the tooltip content.
   * 
   * @param newValue - The new value for the tooltip content, which can be an IMarker, IState, or undefined.
   */
  setToolTipContent: (newValue: IMarker | IState | undefined) => void;
}





/**
 * Interface representing the properties for the MapPart component.
 */
export interface IMapPartProps {
  /**
   * Description of the map part.
   */
  description: string;

  /**
   * Context of the web part.
   */
  context: WebPartContext;

  /**
   * ID of the list associated with the map part.
   */
  listId: string;

  /**
   * Handlebars template used for rendering the map part.
   */
  handlebarsTemplate: string;
}

/**
 * Represents an item used in the map service.
 */
export interface MapServiceItem {
 
  id: string;
 /**
   * The name of the marker.
   */
 name: string;
  /**
   * The type of the map service item.
   */
  type: string;

  /**
   * The data associated with the map service item.
   */
  data: any;

  /**
   * The optional horizontal offset for the map service item.
   */
  offsetX?: number;

  /**
   * The optional vertical offset for the map service item.
   */
  offsetY?: number;
}


/**
 * Represents a marker on the map.
 * 
 * @extends MapServiceItem
 */
export interface IMarker {
  

  /**
   * The address associated with the marker.
   */
  address: string;

  /**
   * A link associated with the marker.
   */
  link: string;

  /**
   * The coordinates of the marker.
   */
  coordinates: any;

  /**
   * The horizontal offset of the marker.
   */
  horizontalOffset: number;

  /**
   * The font color of the marker's label.
   */
  fontColor: string;

  /**
   * The background color of the marker's label.
   */
  backgroundColor: string;
}
export interface IMarker extends MapServiceItem {
  
  address: string;
  link: string;
  coordinates: any;
  horizontalOffset: number;
  fontColor:  string;
  backgroundColor: string;
}





export interface IState extends MapServiceItem {
 
  region: string;
  numberOfExaminers: number;
  val: string;
  fontColor: string;
  backgroundColor:string; //"#003660"
}