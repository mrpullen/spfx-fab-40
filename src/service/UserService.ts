/* eslint-disable @typescript-eslint/no-explicit-any */
import { SPFI } from "@pnp/sp";
import { Service} from 'typedi';
import { IUserInfo } from "../model";
import "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";

export interface IUserService {
    GetCurrentUserInfo: () => Promise<IUserInfo>;
}

@Service()
export default class UserService implements IUserService {

    private _sp: SPFI;

    constructor(sp: SPFI) {
      
        this._sp = sp;
    }

    public async GetCurrentUserInfo():Promise<IUserInfo> {
      


        const currentUserInfo = await this._sp.web.currentUser();
    
        const userinfo: IUserInfo = {
            ID: currentUserInfo.Id.toString(),
            EMail: currentUserInfo.Email,
            LoginName: currentUserInfo.LoginName,
            DisplayName: currentUserInfo.Title,
            PictureUrl: '/_layouts/15/userphoto.aspx?size=S&username=' + currentUserInfo.UserPrincipalName,
        };
        return userinfo;
    }
}