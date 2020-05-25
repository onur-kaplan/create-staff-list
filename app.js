let name = document.getElementById('name');
let surName = document.getElementById('surName');
let phone = document.getElementById('phone');
const list = document.getElementById('person-list');

class DBManager {

    getItem(){
        let people;
        if(localStorage.getItem('people')===null){
            people=[];
            return people;
        }
        people = JSON.parse(localStorage.getItem('people'));
        return people;
    }
    setItem(person){
        let people = this.getItem();
        people.push(person);
        localStorage.setItem('people',JSON.stringify(people));
    }

}

function addPersonToList(person) {
    var html = `
     <tr>
        <td>${person.name}</td>
        <td>${person.surName}</td>
        <td>${person.phone}</td>
     </tr>    
`;
    list.innerHTML += html;
}


document.querySelector(".add-person-btn").addEventListener('click',function(){
    const person = {
        name: name.value,
        surName: surName.value,
        phone: phone.value
    }

    let db = new DBManager();
    let currentDb = db.getItem();
    if(name.value==='' || surName.value ==='' || phone.value === ''){
        alert("Eksik alan");
        return;
    }
    if (currentDb.some(person => person.phone === phone.value)) {
        alert("Bu kişi zaten Var");
        return;
    }

    addPersonToList(person)
    db.setItem(person);

    name.value= '';
    surName.value= '';
    phone.value= '';
});


function init(){
    let db = new DBManager();
    let people = db.getItem();
    people.forEach(person => {
        addPersonToList(person)
    });
}

init()
