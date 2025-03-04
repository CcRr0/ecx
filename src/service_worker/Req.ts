type Req = SpOpenReq | SpCloseReq;
export default Req;

interface SpOpenReq {
    type: "SP_OPEN";
}

interface SpCloseReq {
    type: "SP_CLOSE";
}
