const listPerson = [];
        
// function render person using es6
function renderPerson(persons) {
    const html = persons.reduce((content, person) => {
        content += `
        <tr>
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.email}</td>
            <td>${person.addr}</td>
            <td>${person.userType}</td>
            <td>${person.getAvg ? person.getAvg() : person.getSalary()}</td>
            <td>
                <button class="btn btn-danger" onclick="deletePerson('${person.id}')">Delete</button>
                <button class="btn btn-primary" onclick="selectPerson('${person.id}')">Edit</button>
            </td>
        </tr>
                `;
                return content;
                }, "");
                getEle("#tableList").innerHTML = html;
}

function addUser() {
    var id = getEle("#id").value,
        name = getEle("#name").value,
        email = getEle("#email").value,
        addr = getEle("#addr").value,
        userType = getEle("#userType").value;
        
    if (!id || !name || !email || !addr) {
        alert("Please fill in all fields.");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (userType === "Học viên") {
        var math = Number(getEle("#math").value),
            physics = Number(getEle("#physics").value),
            chemistry = Number(getEle("#chemistry").value);
            
        if (!isValidGrade(math)) {
            alert("Please enter a valid math grade.");
            return;
        }
        
        if (!isValidGrade(physics)) {
            alert("Please enter a valid physics grade.");
            return;
        }
        
        if (!isValidGrade(chemistry)) {
            alert("Please enter a valid chemistry grade.");
            return;
        }
        
        var person = new Student(id, name, email, addr, userType, math, physics, chemistry);
        listPerson.push(person);
        renderPerson(listPerson);
        sortTable();
    } else if (userType === "Giảng viên") {
        var days = Number(getEle("#days").value),
            salary = Number(getEle("#salary").value);
            
        if (!isValidDays(days)) {
            alert("Please enter a valid number of days.");
            return;
        }
        
        if (!isValidSalary(salary)) {
            alert("Please enter a valid salary.");
            return;
        }
        
        var person = new Teacher(id, name, email, addr, userType, days, salary);
        listPerson.push(person);
        renderPerson(listPerson);
        sortTable();
    }
}

function deletePerson(personId) {
    var index = listPerson.findIndex((person) => person.id === personId);
    listPerson.splice(index, 1);
    renderPerson(listPerson);
}


function selectPerson(personId){
    var person = listPerson.find((person) => person.id === personId);
    getEle("#id").value = person.id;
    getEle("#name").value = person.name;
    getEle("#email").value = person.email;
    getEle("#addr").value = person.addr;
    getEle("#userType").value = person.userType;
    getEle("#id").disabled = true;
    getEle("#btnAddPerson").disabled = true;
}

function updatePerson(){
    var id = getEle("#id").value,
        name = getEle("#name").value,
        email = getEle("#email").value,
        addr = getEle("#addr").value,
        userType = getEle("#userType").value;

    var person = new Person(id, name, email, addr, userType);
    var index = listPerson.findIndex((person) => person.id === id);
    listPerson[index] = person;
    renderPerson(listPerson);
    getEle("#btnAddPerson").disabled = false;
    getEle("#id").disabled = false;
}

function sortTable() {
    listPerson.sort((a, b) => {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    renderPerson(listPerson);
}

getEle('#txtTuKhoa').addEventListener('keyup', function () {
    var keyword = getEle('#txtTuKhoa').value;
    var searchArr = listPerson.filter(function (person) {
        return person.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || person.userType.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
    renderPerson(searchArr);
}
);


// Helper
function getEle(selector) {
    return document.querySelector(selector);
}


// Check valid
function isValidEmail(email) {
    // regular expression for email validation
    var emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

function isValidGrade(grade) {
    if (isNaN(grade)) {
        return false;
    }
    
    if (grade < 0 || grade > 10) {
        return false;
    }
    
    return true;
}

function isValidDays(days) {
    if (isNaN(days)) {
        return false;
    }
    
    if (days <= 0 || days > 31) {
        return false;
    }
    
    return true;
}

function isValidSalary(salary) {
    if (isNaN(salary)) {
        return false;
    }
    
    if (salary <= 0) {
        return false;
    }
    
    return true;
}


