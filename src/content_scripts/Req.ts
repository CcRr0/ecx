type Req =
    CourseListReq | CourseCurrentReq |
    VideoInfoReq | AssignInfoReq | QuizInfoReq;

export default Req;
export type Type = Req["type"];

interface CourseListReq {
    type: "COURSE_LIST";
}

interface CourseCurrentReq {
    type: "COURSE_CURRENT";
    id: number;
}

interface VideoInfoReq {
    type: "VIDEO_INFO";
    id: number;
}

interface AssignInfoReq {
    type: "ASSIGN_INFO";
    id: number;
}

interface QuizInfoReq {
    type: "QUIZ_INFO";
    id: number;
}
