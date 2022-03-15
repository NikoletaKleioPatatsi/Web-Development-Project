class User {

    constructor(fname, lnane, address, phone, email, psw, studies, graduationyear, depst, university, direct,knowledge) {
        this.fname = fname;
        this.lnane = lnane;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.psw = psw;  
        this.studies = studies;
        this.graduationyear = graduationyear;
        this.depst = depst;
        this.university = university;
        this.direct = direct;
        this.knowledge = knowledge;
    }
}

module.exports = {
    User: User
}
  