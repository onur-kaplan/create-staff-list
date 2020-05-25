const name = document.getElementById('name');
const surName = document.getElementById('surName');
const phone = document.getElementById('phone');
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
        localStorage.setItem('people', JSON.stringify(people));
    }
    findItem(person){
        if (this.getItem().some(item => item.phone === person)) {
            return true;
        }
    }
    updateItem(data){
        localStorage.setItem('people', JSON.stringify(data));
    }
    removeItem(id){
        let addedPerson = this.getItem()
        let position = addedPerson.map(e => { 
            return e.phone; }
            ).indexOf(id);
        addedPerson.splice(position,1);
        this.updateItem(addedPerson);
    }

}

function addPersonToList(person) {
    var html = `
     <tr id="${person.phone}">
        <td>${person.name}</td>
        <td>${person.surName}</td>
        <td>${person.phone}</td>
        <td class="remove-btn">Sil</td>
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

    if(name.value==='' || surName.value ==='' || phone.value === ''){
        alert("Eksik alan");
        return;
    }
    if(db.findItem(phone.value)){
        alert("Bu kişi zaten Var");
        return;
    }

    addPersonToList(person)
    db.setItem(person);

    name.value= '';
    surName.value= '';
    phone.value= '';
});


list.addEventListener("click", function(e){
    let targetElm = e.target;
    let itemId = targetElm.parentElement.getAttribute("id");
    let db = new DBManager();
    if(targetElm.classList.contains("remove-btn")){
      targetElm.parentElement.remove();
      db.removeItem(itemId)
    }
})

function init(){
    let db = new DBManager();
    let people = db.getItem();
    people.forEach(person => {
        addPersonToList(person)
    });
}

init()
