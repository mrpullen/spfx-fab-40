/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMarker, IState } from "../components/IMapPartProps";

import { SPFI } from "@pnp/sp";
import { Service } from 'typedi';
import "@pnp/sp/presets/all";
import "@pnp/sp/webs";

const mockIds: Array<string> = [
    "6770c83b-29e8-494b-87b6-468a2066bcc6",
    "2ece98f2-cc5e-48ff-8145-badf5009754c",
    "bd5dbd33-0e8d-4e12-b289-b276e5ef79c2"];

@Service()
export default class MapService {
    private listId: string = '';
    private _sp: SPFI;

    constructor(sp: SPFI, listId: string) {

        this._sp = sp;
        this.listId = listId;
    }

    public async getStates(): Promise<Array<IState>> {

        let states: Array<IState> = new Array<IState>();

        if (mockIds.indexOf(this.listId) > -1) {
            states = [
                { "id": "AL", "name":"AL", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "01","data": {}},
                {
                    "id": "AK", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "02", "data": {},
                    name: ""
                },
                {
                    "id": "AS", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "60", "data": {},
                    name: ""
                },
                {
                    "id": "AZ", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "04", "data": {},
                    name: ""
                },
                {
                    "id": "AR", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "05", "data": {},
                    name: ""
                },
                {
                    "id": "CA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "06", "data": {},
                    name: ""
                },
                {
                    "id": "CO", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "08", "data": {},
                    name: ""
                },
                {
                    "id": "CT", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "09", "data": {},
                    name: ""
                },
                {
                    "id": "DE", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "10", "data": {},
                    name: ""
                },
                {
                    "id": "DC", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "11", "data": {},
                    name: ""
                },
                {
                    "id": "FL", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "12", "data": {},
                    name: ""
                },
                {
                    "id": "FM", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "64", "data": {},
                    name: ""
                },
                {
                    "id": "GA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "13", "data": {},
                    name: ""
                },
                {
                    "id": "GU", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "66", "data": {},
                    name: ""
                },
                {
                    "id": "HI", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "15", "data": {},
                    name: ""
                },
                {
                    "id": "ID", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "16", "data": {},
                    name: ""
                },
                {
                    "id": "IL", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "17", "data": {},
                    name: ""
                },
                {
                    "id": "IN", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "18", "data": {},
                    name: ""
                },
                {
                    "id": "IA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "19", "data": {},
                    name: ""
                },
                {
                    "id": "KS", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "20", "data": {},
                    name: ""
                },
                {
                    "id": "KY", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "21", "data": {},
                    name: ""
                },
                {
                    "id": "LA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "22", "data": {},
                    name: ""
                },
                {
                    "id": "ME", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "23", "data": {},
                    name: ""
                },
                {
                    "id": "MH", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "68", "data": {},
                    name: ""
                },
                {
                    "id": "MD", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "24", "data": {},
                    name: ""
                },
                {
                    "id": "MA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "25", "data": {},
                    name: ""
                },
                {
                    "id": "MI", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "26", "data": {},
                    name: ""
                },
                {
                    "id": "MN", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "27", "data": {},
                    name: ""
                },
                {
                    "id": "MS", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "28", "data": {},
                    name: ""
                },
                {
                    "id": "MO", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "29", "data": {},
                    name: ""
                },
                {
                    "id": "MT", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "30", "data": {},
                    name: ""
                },
                {
                    "id": "NE", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "31", "data": {},
                    name: ""
                },
                {
                    "id": "NV", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "32", "data": {},
                    name: ""
                },
                {
                    "id": "NH", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "33", "data": {},
                    name: ""
                },
                {
                    "id": "NJ", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "34", "data": {},
                    name: ""
                },
                {
                    "id": "NM", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "35", "data": {},
                    name: ""
                },
                {
                    "id": "NY", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "36", "data": {},
                    name: ""
                },
                {
                    "id": "NC", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "37", "data": {},
                    name: ""
                },
                {
                    "id": "ND", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "38", "data": {},
                    name: ""
                },
                {
                    "id": "MP", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "69", "data": {},
                    name: ""
                },
                {
                    "id": "OH", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "39", "data": {},
                    name: ""
                },
                {
                    "id": "OK", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "40", "data": {},
                    name: ""
                },
                {
                    "id": "OR", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "41", "data": {},
                    name: ""
                },
                {
                    "id": "PW", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "70", "data": {},
                    name: ""
                },
                {
                    "id": "PA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "42", "data": {},
                    name: ""
                },
                {
                    "id": "PR", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "72", "data": {},
                    name: ""
                },
                {
                    "id": "RI", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "44", "data": {},
                    name: ""
                },
                {
                    "id": "SC", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "45", "data": {},
                    name: ""
                },
                {
                    "id": "SD", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "46", "data": {},
                    name: ""
                },
                {
                    "id": "TN", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "47", "data": {},
                    name: ""
                },
                {
                    "id": "TX", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "48", "data": {},
                    name: ""
                },
                {
                    "id": "UM", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "74", "data": {},
                    name: ""
                },
                {
                    "id": "UT", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "49", "data": {},
                    name: ""
                },
                {
                    "id": "VT", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "50", "data": {},
                    name: ""
                },
                {
                    "id": "VA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "51", "data": {},
                    name: ""
                },
                {
                    "id": "VI", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "78", "data": {},
                    name: ""
                },
                {
                    "id": "WA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "53", "data": {},
                    name: ""
                },
                {
                    "id": "WV", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "54", "data": {},
                    name: ""
                },
                {
                    "id": "WI", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "55", "data": {},
                    name: ""
                },
                {
                    "id": "WY", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "56", "data": {},
                    name: ""
                }
            ];

        }
        else {

            const items = await this._sp.web.lists.getById(this.listId).items.select("ContentType/Name","*").expand("ContentType").filter("ContentType eq 'State'")();

            items.forEach((item: any) => {
                const state: IState = {
                    id: item.Title,
                    name: item.Title,
                    type: item.ContentType.Name,
                    region: item.Region,
                    offsetX: item.OffsetX,
                    offsetY: item.OffsetY,
                    numberOfExaminers: item.ExaminerCount,
                    val: item.MapId,
                    fontColor: item.FontColor,
                    backgroundColor: item.BackgroundColor,
                    data: item
                };

                states.push(state);
            });
        }
        return states;
    }

    public async getLocations(): Promise<Array<IMarker>> {
        const markers: Array<IMarker> = new Array<IMarker>();

        if (mockIds.indexOf(this.listId) > -1) {
            markers.push(
                {
                    name: "Home", type: "Location", address: "10406 Hampton Road, Fairfax Station, VA, 22039", link: "https://github.com/mrpullen", horizontalOffset: 20, coordinates: [-77.306650, 38.720530], fontColor: "#EFEFEF", backgroundColor: "#CCC", data: {},
                    id: ""
                },
            );
            markers.push(
                {
                    name: "Childhood Home", type: "Location", address: "11 Brookletts Avenue, Easton, MD, 21601", link: "https://github.com/mrpullen", horizontalOffset: -20, coordinates: [-76.074820, 38.770730], fontColor: "#EFEFEF", backgroundColor: "#CCC", data: {},
                    id: ""
                }
            );
        }
        else {
            const items = await this._sp.web.lists.getById(this.listId).items.select("ContentType/Name","*").expand("ContentType").filter("ContentType eq 'Location'")();
            items.forEach((item: any) => {
                const marker: IMarker = {
                    name: item.Title,
                    type: item.ContentType.Name,
                    address: item.FullAddress,
                    link: item.Link,
                    horizontalOffset: item.Offset,
                    offsetX: item.OffsetX,
                    offsetY: item.OffsetY,
                    coordinates: [item.Longitude, item.Latitude],
                    fontColor: item.FontColor,
                    backgroundColor: item.BackgroundColor,
                    data: item,
                    id: ""
                };
                console.log(JSON.stringify(marker));
                markers.push(marker);
            });
        }

        return markers;

    }
}