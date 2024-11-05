/* eslint-disable @typescript-eslint/no-explicit-any */

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";


export interface IQuickPollProps {
  pollQuestions: any[];
  context: WebPartContext;
  SuccessfullVoteSubmissionMsg: string;
  ResponseMsgToUser: string;
  BtnSubmitVoteText: string;
  chartType: ChartType;
  pollBasedOnDate: boolean;
  NoPollMsg: string;
  openPropertyPane: () => void;
}