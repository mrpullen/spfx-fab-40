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
                { "id": "AL", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "01","data": {}},
                { "id": "AK", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "02","data": {} },
                { "id": "AS", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "60","data": {} },
                { "id": "AZ", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "04","data": {} },
                { "id": "AR", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "05","data": {} },
                { "id": "CA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "06","data": {} },
                { "id": "CO", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "08","data": {} },
                { "id": "CT", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "09","data": {} },
                { "id": "DE", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "10","data": {} },
                { "id": "DC", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "11","data": {} },
                { "id": "FL", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "12","data": {} },
                { "id": "FM", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "64","data": {} },
                { "id": "GA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "13","data": {} },
                { "id": "GU", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "66","data": {} },
                { "id": "HI", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "15","data": {} },
                { "id": "ID", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "16","data": {} },
                { "id": "IL", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "17","data": {} },
                { "id": "IN", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "18","data": {} },
                { "id": "IA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "19","data": {} },
                { "id": "KS", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "20","data": {} },
                { "id": "KY", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "21","data": {} },
                { "id": "LA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "22","data": {} },
                { "id": "ME", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "23","data": {} },
                { "id": "MH", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "68","data": {} },
                { "id": "MD", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "24","data": {} },
                { "id": "MA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "25","data": {} },
                { "id": "MI", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "26","data": {} },
                { "id": "MN", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "27","data": {} },
                { "id": "MS", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "28","data": {} },
                { "id": "MO", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "29","data": {} },
                { "id": "MT", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "30","data": {} },
                { "id": "NE", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "31","data": {} },
                { "id": "NV", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "32","data": {} },
                { "id": "NH", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "33","data": {} },
                { "id": "NJ", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "34","data": {} },
                { "id": "NM", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "35","data": {} },
                { "id": "NY", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "36","data": {} },
                { "id": "NC", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "37","data": {} },
                { "id": "ND", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "38","data": {} },
                { "id": "MP", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "69","data": {} },
                { "id": "OH", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "39","data": {} },
                { "id": "OK", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "40","data": {} },
                { "id": "OR", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "41","data": {} },
                { "id": "PW", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "70","data": {} },
                { "id": "PA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "42","data": {} },
                { "id": "PR", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "72","data": {} },
                { "id": "RI", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "44","data": {} },
                { "id": "SC", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "45","data": {} },
                { "id": "SD", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "46","data": {} },
                { "id": "TN", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "47","data": {} },
                { "id": "TX", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "48","data": {} },
                { "id": "UM", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "74","data": {} },
                { "id": "UT", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "49","data": {} },
                { "id": "VT", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "50","data": {} },
                { "id": "VA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "51","data": {} },
                { "id": "VI", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "78","data": {} },
                { "id": "WA", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "53","data": {} },
                { "id": "WV", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "54","data": {} },
                { "id": "WI", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "55","data": {} },
                { "id": "WY", "type": "state", "region": "01", numberOfExaminers: 10, "fontColor": "#000000", "backgroundColor": "#D6D6DA", "val": "56","data": {} }
            ];

        }
        else {

            const items = await this._sp.web.lists.getById(this.listId).items.select("ContentType/Name","*").expand("ContentType").filter("ContentType eq 'State'")();

            items.forEach((item: any) => {
                const state: IState = {
                    id: item.Title,
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
                { name: "Home", type: "Location", address: "10406 Hampton Road, Fairfax Station, VA, 22039", link: "https://github.com/mrpullen", horizontalOffset: 20, coordinates: [-77.306650, 38.720530], fontColor: "#EFEFEF", backgroundColor: "#CCC", data: {} },
            );
            markers.push(
                { name: "Childhood Home", type: "Location", address: "11 Brookletts Avenue, Easton, MD, 21601", link: "https://github.com/mrpullen", horizontalOffset: -20, coordinates: [-76.074820, 38.770730], fontColor: "#EFEFEF", backgroundColor: "#CCC", data: {}}
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
                    data: item
                };
                console.log(JSON.stringify(marker));
                markers.push(marker);
            });
        }

        return markers;

    }
}