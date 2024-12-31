/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { IState, IMarker, IUSMapProps } from './IMapPartProps';
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import usMap from "./states-10m.json";
import MapService from '../service/MapService';
import { PnPLogging, LogLevel } from '@pnp/logging';
import { spfi, SPFx } from '@pnp/sp';



const offsets: { [key: string]: [number, number] } = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};


interface IUSMapState {
  markers: Array<IMarker>;
  states: Array<IState>;

}

// https://www.react-simple-maps.io/docs/getting-started/
export default class USMap extends React.Component<IUSMapProps, IUSMapState> {

  private mapService: MapService;
  constructor(props: IUSMapProps) {
    super(props);

    this.state = {
      markers: [],
      states: []
    };


    const sp = spfi().using(SPFx(this.props.context)).using(PnPLogging(LogLevel.Warning));
    this.mapService = new MapService(sp, this.props.listId);

  }

  public async componentDidMount(): Promise<void> {
    const mapStates = await this.mapService.getStates();
    const locations = await this.mapService.getLocations();

    this.setState({
      states: mapStates,
      markers: locations
    });

    return;
  }

  private setToolTipContent(newValue: IMarker | IState | undefined): void {
    if (this.props.setToolTipContent) {
      this.props.setToolTipContent(newValue);
    }
  }



  public render(): React.ReactElement<IUSMapProps> {
    const { markers, states } = this.state;


    const ren = (


      <ComposableMap projection="geoAlbersUsa">

        <Geographies geography={usMap}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => {

                const cur = states.filter(s => s.val === geo.id)[0];
                //  const fontColor = cur !== null ? cur.fontColor : "#FFC";
                const backgroundColor = cur !== undefined && cur.backgroundColor ? cur.backgroundColor : "#D6D6DA";
                const id = cur !== undefined && cur.id ? cur.id : "hw";
                // const region = cur !== null ? cur.region : "region";
                //  const numExaminers = cur !== null ? cur.numberOfExaminers : 0;
                return (
                  <Geography
                  
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    fill={backgroundColor}
                    data-tip={id}
                    onMouseEnter={() => {
                      const cur = states.filter(s => s.val === geo.id)[0];
                      this.setToolTipContent(cur);
                    }}
                    onMouseLeave={() => {
                      this.setToolTipContent(undefined);
                    }}
                    style={{
                      default: {
                        fill: `${backgroundColor}`,
                        outline: "none"
                      },
                      hover: {
                        fill: `${backgroundColor}`,
                        opacity: .7,
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                )
              })}
              {geographies.map(geo => {
                const centroid = geoCentroid(geo);
                const cur = states.filter(s => s.val === geo.id)[0];
                const fontColor = cur !== undefined && cur.fontColor ? cur.fontColor : "#FFC";
                // const backgroundColor = cur !== null ? cur.backgroundColor: "#CCC";
                const id = cur !== undefined && cur.id ? cur.id : "hello-world";
                return (
                  <g key={geo.rsmKey + "-name"}>
                    {cur &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(id) === -1 ? (
                        <Marker coordinates={centroid}>
                          <text y={cur.offsetY ? cur.offsetY : 2} x={cur.offsetX ? cur.offsetX : 0} fontSize={14} textAnchor="middle" color={fontColor}
                            onMouseDown={() => {
                              const cur = states.filter(s => s.val === geo.id)[0];
                              if (cur.data.Link.Url !== undefined) {
                                window.open(cur.data.Link.Url, "_self");
                              }
                            }}
                            onMouseEnter={() => {
                              const cur = states.filter(s => s.val === geo.id)[0];
                              this.setToolTipContent(cur);
                            }}
                            onMouseLeave={() => {
                              this.setToolTipContent(undefined);
                            }}
                          >
                            {id}
                          </text>
                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[id][0]}
                          dy={offsets[id][1]} connectorProps={{}}
                          onMouseEnter={() => {
                            const cur = states.filter(s => s.val === geo.id)[0];
                            this.setToolTipContent(cur);
                          }}
                          onMouseLeave={() => {
                            this.setToolTipContent(undefined);
                          }}>
                          <text x={cur.offsetX ? cur.offsetX : 4} y={cur.offsetY ? cur.offsetY : 0} fontSize={14} alignmentBaseline="middle"
                            onMouseEnter={() => {
                              const cur = states.filter(s => s.val === geo.id)[0];
                              this.setToolTipContent(cur);
                            }}
                            onMouseLeave={() => {
                              this.setToolTipContent(undefined);
                            }}>
                            {id}
                          </text>
                        </Annotation>
                      ))}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>


        {markers.map((marker: IMarker) => (
          <Marker
            key={marker.name}
            coordinates={marker.coordinates}
            data-tip={marker.name}
            onMouseDown={() => {
              window.open(marker.data.Link.Url, "_self");
            }}
            onMouseEnter={() => {
              this.setToolTipContent(marker);
            }}
            onMouseLeave={() => {
              this.setToolTipContent(undefined);
            }}

          >
            <circle r={10} fill={marker.backgroundColor} stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={marker.offsetY ? marker.offsetY : 2}
              x={marker.offsetX ? marker.offsetX : 0}
              style={{ fontFamily: "system-ui", fill: `${marker.fontColor}` }}
            >
              {/*name*/}
            </text>
          </Marker>
        ))}
      </ComposableMap>

    );

    return ren;

  }
}
