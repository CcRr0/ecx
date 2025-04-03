import { Type } from "./Req";

import { CourseInfo, CourseCurrent } from "./fetch/course";
import { VideoInfo } from "./fetch/video";
import { AssignInfo } from "./fetch/assign";
import { QuizInfo } from "./fetch/quiz";

type Res<T extends Type> = {
    "COURSE_LIST": CourseInfo[];
    "COURSE_CURRENT": CourseCurrent;
    "VIDEO_LIST": VideoInfo[][];
    "ASSIGN_INFO": AssignInfo;
    "QUIZ_INFO": QuizInfo;
}[T];

export default Res;
