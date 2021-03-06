const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
           this.id = id;
           this.firstname = firstname;
           this.lastname = lastname;
           this.email = email;
           this.password = password;
           this.matricNumber = matricNumber;
           this.program = program;
           this.graduationYear = graduationYear;
    }

    getFullName() {
         return `${this.firstname} ${this.lastname}`
    }
}

class Users extends DataModel {
    authenticate(email, password) {
    let validUser = this.data.find((element) => element.email === email && element.password === password)
      return (validUser? true : false); 
    }

    getByEmail(email) {
    let getEmail = this.data.find(ele => ele.email === email)
    return getEmail? getEmail : null;
    }

    getByMatricNumber(matricNumber) {
        let element = this.data.find(ele => ele.matricNumber === matricNumber)
        return element? element : null;
    }

    validate(obj) {
        this.errors = [];
        for (const property in obj) {
            if(obj[property] === ""){
                this.errors.push(`${property} should not be empty`);
            }
        }
        if (this.getByEmail(obj.email)){
            this.errors.push(`A user with specified email address already exists`);
        }
        if (this.getByMatricNumber(obj.matricNumber)){
            this.errors.push(`A user with specified matric number already exists`);
        }
        if(obj.password.length < 7){
            this.errors.push("Password should have at least 7 characters");
        }
        return (this.errors.length > 0) ? false : true;
    }
      
    }


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};