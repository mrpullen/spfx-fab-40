/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { IMapPartProps, IMarker, IState } from './IMapPartProps';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Handlebars from "handlebars";


import helpers from 'handlebars-helpers'
import styles from './MapPart.module.scss';
import USMap from './UsMap';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import ReactHtmlParser from 'react-html-parser';


const cssStyle = `
.__react_component_tooltip {
  border-radius: 3px;
  display: inline-block;
  font-size: 13px;
  left: -999em;
  opacity: 0;
  padding: 8px 21px;
  position: fixed;
  pointer-events: none;
  transition: opacity 0.3s ease-out;
  top: -999em;
  visibility: hidden;
  z-index: 999;
}
.__react_component_tooltip.allow_hover, .__react_component_tooltip.allow_click {
  pointer-events: auto;
}
.__react_component_tooltip::before, .__react_component_tooltip::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
}
.__react_component_tooltip.show {
  opacity: 0.9;
  margin-top: 0;
  margin-left: 0;
  visibility: visible;
}
.__react_component_tooltip.place-top::before {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  bottom: -8px;
  left: 50%;
  margin-left: -10px;
}
.__react_component_tooltip.place-bottom::before {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  top: -8px;
  left: 50%;
  margin-left: -10px;
}
.__react_component_tooltip.place-left::before {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  right: -8px;
  top: 50%;
  margin-top: -5px;
}
.__react_component_tooltip.place-right::before {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  left: -8px;
  top: 50%;
  margin-top: -5px;
}
.__react_component_tooltip .multi-line {
  display: block;
  padding: 2px 0;
  text-align: center;
}
`;

helpers({ handlebars: Handlebars });


interface IMapPartState {
  content: string;
  showTooltip: boolean;
}

// https://www.react-simple-maps.io/docs/getting-started/
export default class MapPart extends React.Component<IMapPartProps, IMapPartState> {

  constructor(props: IMapPartProps) {
    super(props);

    this.state = {
      content: "",
      showTooltip: false
    };

    
/*
    Object.keys(helpers).forEach((key) => {
      Handlebars.registerHelper(key, (helpers as any)[key]);
    });
  */  
  }

  public componentDidMount(): void {
    // add the css style to the head
    if (!document.getElementsByTagName('head')[0].querySelector('style[id="react-tooltip"]')) {
      const tag = document.createElement('style');
      tag.id = 'react-tooltip';
      tag.innerHTML = cssStyle;
      document.getElementsByTagName('head')[0].appendChild(tag);
    }
  }
  public componentWillUnmount(): void {
      // delete the style when the component unmount
      const tag = document.querySelector('style[id="react-tooltip"]');
      if(tag) {
        document.getElementsByTagName('head')[0].removeChild(tag);
      }
  }

  public setToolTipContent(newValue: IState | IMarker | undefined): void {

    if(newValue === undefined) {
      this.setState({
        content: "",
        showTooltip: false
      });

      
    }
    else {
      const value: any = JSON.parse(JSON.stringify(newValue));
      value.objectInfo = JSON.stringify(newValue);

      
      //take the data and add handlebars then render that in the react tooltip. <--
      const template = Handlebars.compile(this.props.handlebarsTemplate);
      const content = template(value);
          this.setState({
            content: content,
            showTooltip: true
          });
    }
    
   
    
  }



  public render(): React.ReactElement<IMapPartProps> {
    const { content, showTooltip } = this.state;

    const ren = (
      <div className={styles.mapPart}>
        <USMap description={this.props.description} context={this.props.context} listId={this.props.listId} setToolTipContent={this.setToolTipContent.bind(this)} />
        <ReactTooltip isOpen={showTooltip} anchorSelect=".rsm-geography, .rsm-marker, .rsm-geography text, .rsm-marker circle, .rsm-marker text" id="mappart-tooltip" render={() => <span>{ ReactHtmlParser(content) }</span>} />
      </div>
    );
   
    return ren;

  }
}
