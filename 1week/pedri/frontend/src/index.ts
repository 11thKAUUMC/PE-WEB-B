// const courseName = "TypeScript";
// console.log("이번 주 학습 주제: " + courseName);


function addScore(currentScore: number, bonusScore: number) {
    return currentScore + bonusScore;
}

console.log(addScore(80, 10)); // 90


// const currentLevel = 1;
// console.log("현재 레벨: " + currentLevel);

// const memberNames = ["찬영"];
// console.log(memberNames[5].toUpperCase());

function introduceStudent(studentName: string, currentLevel: number) {
    return studentName + " 님은 현재 " + currentLevel + "레벨이에요.";
}

introduceStudent("찬영", 1);


let studentName = "광수";
let currentLevel = 1;
let isCompleted = false;

console.log(studentName, currentLevel, isCompleted);


const firstMember = { name: "찬영" };
const secondMember = { name: "찬영" };
const sameMember = firstMember;

console.log(firstMember === secondMember); // false
console.log(firstMember === sameMember); // true


// const studyMember = { name: "찬영" };
//
// studyMember.name = "찬영2";
//
// console.log(studyMember.name);

// studyMember = { name: "현우" };

let assignmentScore: number;
assignmentScore = 90;

let courseName = "TypeScript"; // string으로 추론해요.
let lessonCount = 8; // number로 추론해요.


const studentNames: string[] = ["광수", "지수", "현우"];
const weeklyScores: number[] = [80, 90, 100];

studentNames.push("수빈");
// studentNames.push(123); // number는 넣을 수 없다는 오류가 보여요.

let real_name = "정찬영";  // string
let cur_week = 1;   // number
let isComplete = true;  // boolean

const cur_week_stack: string[] = ["ts", "RDB", "NoSQL"];
const cur_week_stack2: string[] = ["ts", "RDB", "NoSQL"];

console.log(cur_week_stack === cur_week_stack2); // "false" 출력





const student: {
    name: string;
    level: number;
    isCompleted: boolean;
} = {
    name: "찬영",
    level: 1,
    isCompleted: false,
};

//
// type Student = {
//     name: string;
//     level: number;
//     isCompleted: boolean;
//     githubId?: string;
// };
// const CY: Student = {
//     name: "찬영2",
//     level: 1,
//     isCompleted: false,
// };
//
//
// function createGreeting(studentName: string) {
//     return "안녕하세요, " + studentName + " 님!";
// }
//
// const greetingMessage = createGreeting("찬영3");
//
// function printGreeting(studentName: string) {
//     console.log("반가워요, " + studentName + " 님!");
// }
//
// const calculateTotalScore = (
//     assignmentScore: number,
//     attendanceScore: number
// ) => {
//     return assignmentScore + attendanceScore;
// };
//
// //
// type MemberProfile = {
//     name: string;
// };
//
// type GithubProfile = {
//     githubId: string;
// };
//
// type MemberWithGithub = MemberProfile & GithubProfile;
//
// const gwangsooProfile: MemberWithGithub = {
//     name: "광수",
//     githubId: "gwangsoo",
// };
//
// console.log(gwangsooProfile.name, gwangsooProfile.githubId);


// type StudentName = string;

// interface StudyMember {
//     name: StudentName;
// }
//
// interface StudyMember {
//     level: number;
// }
//
// const member: StudyMember = {
//     name: "광수",
//     level: 1,
// };




// type StudyMember = {
//     name: string;
//     level: number;
//     isLeader ?: boolean;    // -> '?:'
// };
//
// const member: StudyMember = {
//     name: "광수",
//     level: 1
// };
//
// function createMemberCard(studyMember: StudyMember) {
//     return studyMember.name + " 님, " + studyMember.level + "레벨";
// }
//
// console.log(createMemberCard(member));







function printMemberId(memberId: string | number) {
    console.log(memberId);
}

printMemberId("member-01");
printMemberId(1);


function formatMemberId(memberId: string | number) {
    if (typeof memberId === "string") {
        return memberId.toUpperCase();
    }

    return "MEMBER-" + memberId;
}

type MemberRole = "leader" | "member";
type AttendanceStatus = "present" | "late" | "absent";

const gwangsooRole: MemberRole = "leader";
const todayStatus: AttendanceStatus = "present";


type StudyResult =
    | { status: "success"; completedCount: number }
    | { status: "error"; message: string };

function printStudyResult(result: StudyResult) {
    if (result.status === "success") {
        console.log("완료한 과제: " + result.completedCount);
        return;
    }

    console.log("오류: " + result.message);
}


// 미니 실습
type leaderResult =
    | { status: "leader"; }
    | { status: "member"; };

function isMemberLeader(result: leaderResult) {
    if (result.status === "leader") {
        console.log("스터디를 이끌어요. ");
        return;
    }
    console.log("스터디에 참여해요. ");
}
isMemberLeader({ status: "leader" });
isMemberLeader({ status: "member" });



// 6

type StudyMember = {
    name: string;
    githubId?: string;
};

const members: StudyMember[] = [
    { name: "광수", githubId: "gwangsoo" },
    { name: "지수" },
];

let selectedMember: StudyMember | null = null;

const foundMember = members.find((member) => member.name === "찬영");
// const foundMember = members.find((member) => member.name === "광수");  // undefined 아닌 경우


console.log(selectedMember); // null
console.log(foundMember); // undefined


// console.log(Boolean(false)); // false
// console.log(Boolean(0)); // false
// console.log(Boolean("")); // false
// console.log(Boolean("false")); // true
// console.log(Boolean([])); // true
// console.log(Boolean({})); // true


if (foundMember) {
    console.log(foundMember.name);
} else {
    console.log("회원을 찾지 못했어요.");
}





const githubId = foundMember?.githubId;


const studyHour: number | undefined = 0;

console.log(studyHour || 1); // 1
console.log(studyHour ?? 1); // 0

const nickname: string | null = "";

console.log(nickname || "닉네임 없음"); // "닉네임 없음"
console.log(nickname ?? "닉네임 없음"); // ""


const displayGithubId = foundMember?.githubId ?? "등록되지 않음";
console.log(displayGithubId);



// 미니 실습
// const isMemberArray = members.find((member) => member.name === "찬영");
const isMemberArray = members.find((member) => member.name === "광수");
console.log(foundMember); // undefined

let nullMember: StudyMember | null = null;
console.log(nullMember); // null

// 3
if (isMemberArray) {
    console.log("회원님의 이름은 : ", isMemberArray.name, "\n");
} else {
    console.log("회원을 찾지 못했어요.");
}

// 4
const studyHourZero: number | undefined = 0;

console.log(studyHourZero || 0); // 0
console.log(studyHourZero ?? 0); // 0

// 5

//const isMemberArray = members.find((member) => member.name === "찬영");
if (isMemberArray?.githubId) {
    console.log("회원님의 깃허브는 : ", isMemberArray.githubId, "\n");
} else if(isMemberArray??githubId) {
    console.log("등록되지 않음.");
}



// 7. any, unknown
// any : 바로 사용 가능 & unknown : (바로사용X) 타입 확인 후 사용 가능

function printNickname(nickname: unknown) {
    if (typeof nickname === "string") {
        console.log(nickname.toUpperCase());
        return;
    }

    console.log("닉네임은 문자열이어야 해요.");
}

printNickname("chanyoung");
printNickname(123);

// 미니 실습
function formatStudyWeek(a: unknown) {
    if (typeof a === "string") {
        console.log("입력한 주차: ", a);
        return;
    }
    else if (typeof a === "number") {
        console.log("현재 ", a, "주차예요.");
        return;
    }
    console.log("주차를 확인할 수 없어요");
}


// 8 제네릭 <T>
function keepValue<T>(value: T) {
    return value;
}
// const studentName = keepValue<string>("광수");
// const currentLevel = keepValue<number>(1);
// const isCompleted = keepValue(false);

// function createBox<T>(value: T) {
//     return { value };
// }
//
// const nameBox = createBox("광수");
// const scoreBox = createBox(100);
//
// console.log(nameBox.value); // "광수"
// console.log(scoreBox.value); // 100

// 미니실습 createBox<T>
function createBox<T>(value: T) {
    return { value };
}
const nameBox = createBox("광수");
const scoreBox = createBox(100);
const memberBox = createBox(members);


// 9 strict
// function createLevelMessage(currentLevel: number): string {
//     if (currentLevel > 0) {
//         return "현재 " + currentLevel + "레벨이에요.";
//     }
// }

// 미니 실습 - 오류 2개 찾기
type WeeklyGoal = {
    title: string;
    targetCount: number;
};

const weeklyGoal: WeeklyGoal = {
    title: "TypeScript 예제 연습",
    targetCount: 3
};

function printGoal(goal: WeeklyGoal): string {
    console.log(goal.title);
    return goal.title;
}

// 10. 필수미션
type MissionMember = {
    id: number;
    name: string;
    role: "leader" | "member"; // 유니언타입
    githubId?: string;
};
const missionMembers: MissionMember[] = [
    {
        id: 1,
        name: "찬영",
        role: "leader",
        githubId: "dovob213"
    }, {
        id: 2,
        name: "김찬영",
        role: "member"
    }
];
function findMissionMemberById(id: number) {
    console.log("필수미션) id로 찾기 : ",missionMembers.find((member) => member.id === id));
    return missionMembers.find((member) => member.id === id);
}

findMissionMemberById(1);
findMissionMemberById(2);
findMissionMemberById(999);

// // 선택미션 확인
// interface InterfaceMember {
//     id: number;
//     name: string;
//     role: "leader" | "member";
//     githubId?: string;
// }
//
// type TypeMember = {
//     id: number;
//     name: string;
//     role: "leader" | "member";
//     githubId?: string;
// };
//
// const interfaceMember: InterfaceMember = {
//     id: 1,
//     name: "찬영",
//     role: "leader"
// };
//
// const typeMember: TypeMember = {
//     id: 2,
//     name: "김찬영",
//     role: "member"
// };


type missionMember = {
    id: number;
    name: string;
    role: "leader" | "member";
    githubId?: string;
};

const missionStudyHour: number | undefined = 0;
console.log(missionStudyHour || 1); // 1
console.log(missionStudyHour ?? 1); // 0

function formatMemberId2(input: unknown) {
    if (typeof input === "number") {
        return "MEMBER-" + input;
    }
    if (typeof input === "string") {
        return input.toUpperCase();
    }
    return "올바르지 않은 회원 ID";
}
console.log(formatMemberId2(1));
console.log(formatMemberId2("member-02"));
console.log(formatMemberId2(true));

