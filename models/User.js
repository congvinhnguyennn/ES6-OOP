class Person {
    constructor(id, name, email, addr, userType) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.addr = addr;
        this.userType = userType;
    }
}

class Student extends Person {
    constructor(id, name, email, addr, userType, math, physics, chemistry) {
        super(id, name, email, addr, userType);
        this.math = math;
        this.physics = physics;
        this.chemistry = chemistry;
    }

    getAvg() {
        return Math.floor((this.math + this.physics + this.chemistry) / 3);
    }


}

class Teacher extends Person {
    constructor(id, name, email, addr, userType, days, salary) {
        super(id, name, email, addr, userType);
        this.days = days;
        this.salary = salary;
    }

    getSalary() {
        return this.days * this.salary;
    }
}

class ListPerson {
    constructor() {
        this.list = [];
    }

    addUser(person) {
        this.list.push(person);
    }

    findPerson(id) {
        return this.list.find(person => person.id === id);
    }

    removePerson(id) {
        this.list = this.list.filter(person => person.id !== id);
    }

    updatePerson(id, person) {
        this.list = this.list.map(p => {
            if (p.id === id) {
                return person;
            }
            return p;
        });
    }

    showList() {
        return this.list;
    }
} 