import { SPFI } from "@pnp/sp";
import MapService from "./MapService";
import { IState, IMarker } from "../components/IMapPartProps";

describe('MapService', () => {
    let sp: SPFI;
    let mapService: MapService;
    const listId = 'test-list-id';

    beforeEach(() => {
        sp = {} as SPFI; // Mock SPFI instance
        mapService = new MapService(sp, listId);
    });

    it('should initialize with given sp and listId', () => {
        expect(mapService['_sp']).toBe(sp);
        expect(mapService['listId']).toBe(listId);
    });

    it('should fetch states data', async () => {
        const mockStates: Array<IState> = [
            {
                id: '1', name: 'State1',
                region: "",
                numberOfExaminers: 0,
                val: "",
                fontColor: "",
                backgroundColor: "",
                type: "",
                data: undefined
            },
            {
                id: '2', name: 'State2',
                region: "",
                numberOfExaminers: 0,
                val: "",
                fontColor: "",
                backgroundColor: "",
                type: "",
                data: undefined
            }
        ];

        jest.spyOn(mapService, 'getStates').mockResolvedValue(mockStates);

        const states = await mapService.getStates();
        expect(states).toEqual(mockStates);
    });

    it('should fetch locations data', async () => {
        const mockLocations: Array<IMarker> = [
            {
                id: '1', name: 'Location1',
                address: "",
                link: "",
                coordinates: undefined,
                horizontalOffset: 0,
                fontColor: "",
                backgroundColor: "",
                type: "",
                data: undefined
            },
            {
                id: '2', name: 'Location2',
                address: "",
                link: "",
                coordinates: undefined,
                horizontalOffset: 0,
                fontColor: "",
                backgroundColor: "",
                type: "",
                data: undefined
            }
        ];

        jest.spyOn(mapService, 'getLocations').mockResolvedValue(mockLocations);

        const locations = await mapService.getLocations();
        expect(locations).toEqual(mockLocations);
    });
});