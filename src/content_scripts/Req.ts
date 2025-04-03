type Req =
    CourseListReq | CourseCurrentReq |
    VideoListReq | AssignInfoReq | QuizInfoReq;

export default Req;
export type Type = Req["type"];

interface CourseListReq {
    type: "COURSE_LIST";
}

interface CourseCurrentReq {
    type: "COURSE_CURRENT";
    id: number;
}

interface VideoListReq {
    type: "VIDEO_LIST";
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
