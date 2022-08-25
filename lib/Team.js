const inquirer = require("inquirer");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const renderPage = require("../src/page-template")

class Team {
    constructor() {
        this.member = [];
    }

    async initializeTeam() {
        await this.addManager();
        await this.makeChoice();
    }

    async addManager() {
        await inquirer
            .prompt([
                {
                    type: `input`,
                    name: `name`,
                    message: `What is the Team Manager's name? `,
                },
                {
                    type: `input`,
                    name: `id`,
                    message: `What is the Team Manager's ID? `,
                },
                {
                    type: `input`,
                    name: `email`,
                    message: `What is the Team Manager's email? `,
                },
                {
                    // could and should make this an alternating prompt and then
                    // call this function recursively with index value or something

                    // THOUGHTS 

                    // the classes destructure the objects so I can send the finished 
                    // inquirer prompt objects as they are... so this should be easy

                    // I could have the 'special' attribute of each class named special
                    // instead of the 3 separate names that were required
                    // OR 

                    // can i prime my function to destructure all possibilities??
                    // so if it the object contains github.. thats all that will be grabbed
                    // BINGO
                    //https://replit.com/@BodyCoder/PotableUnitedSequence#script.js

                    // so maybe i can run through a switch first and pass in getRole()
                    // or pass in a new YadaYada and dont push it until it returns 
                    // with , ideally, values set

                    type: `input`,
                    name: `officeNumber`,
                    message: `What is the Team Manager's office number? `,
                }
            ])

            .then((managerObject) => {
                this.member.push(new Manager(managerObject));
                // console.log(this);
                // console.log(this.member[0])
            });
    }
    async makeChoice() {
        await inquirer.prompt({
            type: `list`,
            name: `choice`,
            message: `What would you like to do now?`,
            choices: [`Add Engineer`, `Add Intern`, `Finish Building`],
        })
            .then(async ({ choice }) => { // ASYNC? AWAIT?
                console.log(choice)
                if (choice === 'Finish Building') {
                    console.log('Wrapping things up...')
                    this.buildTeam(this.member)
                    return //END
                } else {
                    await this.addEmployee(choice)
                    this.makeChoice()
                }
            })
    }

    async addEmployee(passedChoice) { // takes class type as argument .. maybe
        if (passedChoice === 'Add Engineer') {
            await this.addEngineer()
        } else { // choice === 'Add Intern'
            await this.addIntern()
        }
        console.log(`- - - - - - - - - - - - - - - - - - - - - - - - - - - - -`)
    }

    async addEngineer() {
        console.log('Adding Engineer!')
        await inquirer
            .prompt([
                {
                    type: `input`,
                    name: `name`,
                    message: `What is the Engineer's name? `,
                },
                {
                    type: `input`,
                    name: `id`,
                    message: `What is the Engineer's ID? `,
                },
                {
                    type: `input`,
                    name: `email`,
                    message: `What is the Engineer's email? `,
                },
                {
                    type: `input`,
                    name: `github`,
                    message: `What is the Engineer's github? `,
                },
            ])
            .then((engineerObject) => {
                this.member.push(new Engineer(engineerObject));
            });
        console.log(`- - - - - - - - - - - - - - - - - - - - - - - - - - - - -`)
    }

    async addIntern() {
        console.log('Adding Intern!')
        await inquirer
            .prompt([
                {
                    type: `input`,
                    name: `name`,
                    message: `What is the Intern's name? `,
                },
                {
                    type: `input`,
                    name: `id`,
                    message: `What is the Intern's ID? `,
                },
                {
                    type: `input`,
                    name: `email`,
                    message: `What is the Intern's email? `,
                },
                {
                    type: `input`,
                    name: `school`,
                    message: `What is the Intern's school? `,
                },
            ])
            .then((internObject) => {
                this.member.push(new Intern(internObject));
            });
        console.log(`- - - - - - - - - - - - - - - - - - - - - - - - - - - - -`)
    }

    async buildTeam(passedArray) {
        console.log(`Building Team!`)
        console.log(passedArray)
        console.log(`- - - - - - - - - - - - - - - - - - - - - - - - - - - - -`)
        renderPage(passedArray) // modular function (aka external)
    }
}

module.exports = Team;