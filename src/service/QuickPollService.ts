/* eslint-disable @typescript-eslint/no-explicit-any */
import { SPFI } from "@pnp/sp";
import { Service} from 'typedi';
import { IList } from "@pnp/sp/lists";
import "@pnp/sp/fields/list";
import "@pnp/sp/views/list";
import { IResponseDetails } from "../model";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import "@pnp/sp/presets/all";


export interface IQuickPollService {
  getPollResponse(questionId: string): Promise<Array<any>>;
  addPollResponse(userResponse: IResponseDetails, allUserResponse: any): Promise<any>;
  updatePollResponse(questionId: string, allUserResponse: any): Promise<void>;
  submitResponse(userResponse: IResponseDetails): Promise<boolean>;

  ensureResponseList(): Promise<boolean>;
  ensureResultsList(): Promise<boolean>;
}

@Service()
export default class QuickPollService implements IQuickPollService {

    private selectFields: string[] = ["ID", "Title", "QuestionID", "UserResponse"];
   // private _quickPollResponseList: IList;
    private _quickPollResultList: IList;
    private quickPollResultListTitle: string = "QuickPoll";
    private quickPollResponseListTitle: string = "QuickPollResponse"

    private _sp: SPFI;

    constructor(
        sp: SPFI
    ) {
      
        this._sp = sp;
        this._quickPollResultList = this._sp.web.lists.getByTitle(this.quickPollResultListTitle);
      //  this._quickPollResponseList = this._sp.web.lists.getByTitle(this.quickPollResponseListTitle);
    
    }

    public async getPollResponse(questionId: string): Promise<Array<any>> {
        const questionResponse = await this._quickPollResultList.items.select(this.selectFields.join(",")).filter(`QuestionID eq '${questionId}'`).expand("FieldValuesAsText")();

        if (questionResponse.length > 0) {
            const tempResponse = questionResponse[0].FieldValuesAsText.UserResponse;
            if(tempResponse !== undefined && tempResponse !== null && tempResponse !== "") {
                const jsonData = JSON.parse(tempResponse);
                return jsonData;
            }
            
        }
        return [];
        
    }

    public async addPollResponse(userResponse: IResponseDetails, allUserResponse: any): Promise<any> {
        const addedresponse = await this._quickPollResultList.items.add({
            Title: userResponse.PollQuestion,
            QuestionID: userResponse.PollQuestionId,
            UserResponse: JSON.stringify(allUserResponse)
        });

        return addedresponse;
    }

    /**
     * Update the over all response based on the end user response.
     */
    public async updatePollResponse(questionId: string, allUserResponse: any): Promise<void> {
        const response = await this._quickPollResultList.items.select(this.selectFields.join(','))
            .filter(`QuestionID eq '${questionId}'`).expand('FieldValuesAsText')();
        if (response.length > 0) {
            if (allUserResponse.length > 0) {
                const updatedResponse = await this._quickPollResultList.items.getById(response[0].ID).update({
                    UserResponse: JSON.stringify(allUserResponse)
                });
                return updatedResponse;
            } else { 
                return await this._quickPollResultList.items.getById(response[0].ID).delete();
            }
        }
    }
    /**
     * Submit the user response.
     */
    public async submitResponse(userResponse: IResponseDetails): Promise<boolean> {
        try {
            const allUserResponse = await this.getPollResponse(userResponse.PollQuestionId);
            if (allUserResponse.length > 0) {
                allUserResponse.push({
                    UserID: userResponse.UserID,
                    UserName: userResponse.UserDisplayName,
                    Response: userResponse.PollResponse,
                    MultiResponse: userResponse.PollMultiResponse,
                });
                // Update the user response
                await this.updatePollResponse(userResponse.PollQuestionId, allUserResponse);
            } else {
                allUserResponse.push({
                    UserID: userResponse.UserID,
                    UserName: userResponse.UserDisplayName,
                    Response: userResponse.PollResponse,
                    MultiResponse: userResponse.PollMultiResponse,
                });
                // Add the user response
                await this.addPollResponse(userResponse, allUserResponse);
            }
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    public async ensureResultsList(): Promise<boolean> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<boolean>(async (resolve, reject) => {
            try {
            const list = await this._sp.web.lists.getByTitle(this.quickPollResultListTitle)();
            console.log(list.Title);
            resolve(true);
            }
            catch(err) {
                const listExists = (await this._sp.web.lists.ensure(this.quickPollResultListTitle)).list;
                await listExists.fields.addText('QuestionID', { Required: true, Description: '', MaxLength: 255 });
                await listExists.fields.addMultilineText('UserResponse', { Required: false, Description: '', AllowHyperlink: false, AppendOnly: false, NumberOfLines: 6, RestrictedMode: false, RichText: false });
                const allItemsView = await listExists.views.getByTitle('All Items');
                await allItemsView.fields.add('QuestionID');
                await allItemsView.fields.add('UserResponse');
                resolve(true);
            }
            
        
         });
    }

    public async ensureResponseList(): Promise<boolean> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<boolean>(async (resolve, reject) => {
            try {
            const list = await this._sp.web.lists.getByTitle(this.quickPollResponseListTitle)();
            console.log(list.Title);
            resolve(true);
            }
            catch(err) {
                const listExists = (await this._sp.web.lists.ensure(this.quickPollResponseListTitle)).list;
                await listExists.fields.addText('QuestionID', { Required: true, Description: '', MaxLength: 255 });
                await listExists.fields.addMultilineText('UserResponse', { Required: false, Description: '', AllowHyperlink: false, AppendOnly: false, NumberOfLines: 6, RestrictedMode: false, RichText: false });
                const allItemsView = await listExists.views.getByTitle('All Items');
                await allItemsView.fields.add('QuestionID');
                await allItemsView.fields.add('UserResponse');
                resolve(true);
            }
            
        
         });
    }
}