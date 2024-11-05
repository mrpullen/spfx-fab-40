import { IPollAnalyticsInfo, IQuestionDetails, IResponseDetails } from "../../../model";


export interface IQuickPollState {
	listExists: boolean;
	PollQuestions: IQuestionDetails[];
	UserResponse: IResponseDetails[];
	displayQuestionId: string;
	displayQuestion?: IQuestionDetails;
	enableSubmit: boolean;
	enableChoices: boolean;
	showOptions: boolean;
	showProgress: boolean;
	showChart: boolean;
	showChartProgress: boolean;
	showMessage: boolean;
	isError: boolean;
	MsgContent: string;
	PollAnalytics?: IPollAnalyticsInfo;
	showSubmissionProgress: boolean;
	currentPollResponse: string;
}