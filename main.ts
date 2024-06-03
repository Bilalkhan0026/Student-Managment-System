#! /usr/bin/env node
import inquirer from "inquirer";

class student{
    id: string;
    name: string;
    coursesEnrolled:string[];
    feesAmount:number;

    constructor(id:string,name:string,coursesEnrolled:string[],feesAmount:number){
        this.id= id
        this.name= name
        this.coursesEnrolled= coursesEnrolled
        this.feesAmount = feesAmount
    }
}

let baseId = 10000
let studentId:string = "";
let coursesEnrolled = true;
let students: student[] = []

do{
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option:\n",
        choices: ["Enroll a student", "Show student status"]
    })
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please Enter your name:" 
        })
        let trimmedStudentName = (studentName.ans).trim().toLowerCase()
        let studentNameCheek = students.map(obj => obj.name)
        
        if(studentNameCheek.includes(trimmedStudentName) === false){
            if(trimmedStudentName !== ""){
                baseId++
                studentId = "STId" + baseId
                console.log("/n\tyour account has bee created");
                console.log(`Welcome, ${trimmedStudentName}!`);
                
                let cource = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a cource",
                    choices: ["IT","English","Cooking"]
                })
                let courceFees = 0;
                switch(cource.ans) {
                    case "IT":
                        courceFees = 5000;
                        break;
                    case "English":
                        courceFees = 500;
                        break;
                    case "Cooking":
                        courceFees = 200;
                        break;
                }
                let courceConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this cource"
                })
                if(courceConfirm.ans === true){
                    let Student = new student(studentId,trimmedStudentName,[cource.ans],courceFees)
                    students.push(Student)
                    console.log("you have enrolled in this course");
                    
                }
            }else{
                console.log("Invalid Name")
            }
        }else{
            console.log("This name is alredy exists");
            
        }
    }
    else if(action.ans === "Show student status"){
        if(students.length !== 0){
            let studentNamecheek = students.map(e => e.name)
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select name",
                choices: studentNamecheek
            })
            let foundStudent = students.find(student => student.name === selectedStudent.ans)
            console.log("Student information");
            console.log(foundStudent);
            console.log("\n");
            
        }else{
            console.log("Record is empty");
        }
        let userConfirm = await inquirer.prompt({
            type: "confirm",
            name: "ans",
            message: "Do you want to continue?"
        })
        if(userConfirm.ans === false){
            coursesEnrolled = false
        }
    }

}while(coursesEnrolled)