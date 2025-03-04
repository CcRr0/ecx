type Form =
    RSendReq | RSendRes |
    RRecvReq | RRecvRes |
    TSendReq | TSendRes |
    TUpdateReq | TUpdateRes;

export default Form;

interface Base {
    id: number;
    data: any;
}

interface RSendReq extends Base {
    type: "R_SEND_REQ";
}

interface RSendRes extends Base {
    type: "R_SEND_RES";
}

interface RRecvReq extends Base {
    type: "R_RECV_REQ";
    sender: chrome.runtime.MessageSender;
}

interface RRecvRes extends Base {
    type: "R_RECV_RES";
}

interface TSendReq extends Base {
    type: "T_SEND_REQ";
    tabId: number;
}

interface TSendRes extends Base {
    type: "T_SEND_RES";
}

interface TUpdateReq extends Base {
    type: "T_UPDATE_REQ";
    data: chrome.tabs.UpdateProperties;
}

interface TUpdateRes extends Base {
    type: "T_UPDATE_RES";
    data: chrome.tabs.Tab | undefined;
}
