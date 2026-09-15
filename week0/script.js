const name = "광수";
let level = 0;
const isReady = true;
const emptyValue = null;
let notAssigned;

level = level + 1;

console.log(name);
console.log(level);

console.log("Hello, Web!");

const skills = ["HTML", "CSS", "JavaScript"];

const student = {
    name: "찬영",
    level: 0,
    isReady: true,
};

console.log(skills[0]);
console.log(student.name);

const level = 1;

if (level === 0) {
    console.log("처음 시작합니다.");
} else {
    console.log("한 단계 성장했습니다.");
}

const skills = ["HTML", "CSS", "JavaScript"];

for (const skill of skills) {
    console.log(skill);
}

function makeGreeting(name) {
    return `${name}님, 반갑습니다!`;
}

const message = makeGreeting("광수");
console.log(message);




const student = {
    name: "찬영",
    skills: ["HTML", "CSS", "JavaScript"],
};

function printSkills(skills) {
    for (const skill of skills) {
        if (skill === "JavaScript") {
            console.log(`${skill}: 화면에 동작을 더합니다.`);
        } else {
            console.log(skill);
        }
    }
}

console.log(student.name);
printSkills(student.skills);
