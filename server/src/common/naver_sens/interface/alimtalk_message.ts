export interface IMessage {
  countryCode?: string;
  to: string;
  content: string;
  buttons?: IButton;
  useSmsFailover?: boolean;
  failoverConfig?: any;
}

export interface IButton {
  type: string;
  name: string;
  linkMobile?: string;
  linkPc?: string;
  schemeIos?: string;
  schemeAndroid?: string;
}
export interface AlimTalkMessageRequest {
  templateCode: string;
  plusFriendId: string;
  messages: IMessage[];
  scheduleCode?: string;
  reserveTime?: string;
  reserveTimeZone?: string;
}
