const dbName = "people";
const name = document.querySelector('#name');
const surName = document.querySelector('#surName');
const phone = document.querySelector('#phone');
const list = document.querySelector('#person-list');
const searchInput = document.querySelector('#searchPerson');
const addPersonBtn = document.querySelector('.add-person-btn');
let searchData = [];

class DBManager {
    getItem(){
        let people;
        if(localStorage.getItem(dbName)===null){
            people=[];
            return people;
        }
        people = JSON.parse(localStorage.getItem(dbName));
        return people;
    }
    setItem(person){
        let people = this.getItem();
        people.push(person);
        localStorage.setItem(dbName, JSON.stringify(people));
    }
    findItem(person){
        if (this.getItem().some(item => item.phone === person)) {
            return true;
        }
    }
    updateItem(data){
        localStorage.setItem(dbName, JSON.stringify(data));
    }
    removeItem(id){
        let people = this.getItem()
        let position = people.findIndex(e => e.phone === id);
        people.splice(position,1);
        this.updateItem(people);
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

addPersonBtn.addEventListener('click',function(){
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

searchInput.addEventListener('input', function(e) {
    let keywors = e.target.value;
    let db = new DBManager();
    let people = db.getItem();
    let lowrCasePeople = people.map(item => {
        item.name = item.name.toUpperCase();
        return item;
    })
    console.log(lowrCasePeople);
    list.innerHTML = "";
    if(keywors.length <= 2){
        searchData = [];
        init();
        return
    }
    searchView(lowrCasePeople, keywors.toUpperCase());
    
  });

  function searchView(allData, keywords){
    allData.forEach(item => {
        if(item.name.indexOf(keywords)!=-1) {
            if (searchData.some(i => i.phone === item.phone)) {
                console.log(searchData)
                return
            }
        searchData.push(item);
        }
      });
    searchData.forEach(person => {
        addPersonToList(person)
    });
}

// function searchView(allData, keywords){
//     allData.forEach(item => {
//         for(i in item) {
//           if(item[i].indexOf(keywords.toLowerCase())!=-1) {
//             if (searchData.some(i => i.phone.toLowerCase() === item.phone.toLowerCase())) {
//                 console.log(searchData)
//                 return
//             }
//             searchData.push(item);
//           }
//         }
//       });
//     searchData.forEach(person => {
//         addPersonToList(person)
//     });
// }

function init(){
    let db = new DBManager();
    let people = db.getItem();
    people.forEach(person => {
        addPersonToList(person)
    });
}

init()
