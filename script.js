
let tasks = [];
localStorage.setItem("tasks", JSON.stringify(tasks));

for (let i = 0; i < tasks.length; i++) {
    let tr = document.createElement("tr");
    let td0 = document.createElement("td"); td0.className ='ntask';
    let t = document.createTextNode(tasks[i]);
    td0.appendChild(t); 
    tr.appendChild(td0);
  
    let td1 = document.createElement("td");
    let Be = document.createElement("button"); Be.className='editButton';
    let E = document.createTextNode('Edit');
    Be.appendChild(E);
    let Bd = document.createElement("button"); Bd.className='deleteButton';
    let D = document.createTextNode('X');
    Bd.appendChild(D);
  
    td1.appendChild(Be); 
    td1.appendChild(Bd); 
    tr.appendChild(td1);
  
    document.getElementById('table').appendChild(tr);
}

let del = document.querySelectorAll('.deleteButton');
let edit = document.querySelectorAll('.editButton');
let ntasks = document.querySelectorAll('.ntask');

//Handing the add
const add = document.querySelector('#addButton');
add.onclick = function(){
    let newTask = document.getElementById('myInput').value;
    if (newTask !== '') {
        tasks.push(newTask);
        let tr = document.createElement("tr");
        let td0 = document.createElement("td"); td0.className ='ntask';
        let t = document.createTextNode(newTask);
        td0.appendChild(t); 
        tr.appendChild(td0);

        let td1 = document.createElement("td");
        let Be = document.createElement("button"); Be.className='editButton';
        let E = document.createTextNode('Edit');
        Be.appendChild(E);
        let Bd = document.createElement("button"); Bd.className='deleteButton';
        let D = document.createTextNode('X');
        Bd.appendChild(D);

        td1.appendChild(Be); 
        td1.appendChild(Bd); 
        tr.appendChild(td1);

        document.getElementById('table').appendChild(tr);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        del = document.querySelectorAll('.deleteButton');
        edit = document.querySelectorAll('.editButton');
        let ntasks = document.querySelectorAll('.ntask');
        //Handling the delete
        del.forEach(element => element.onclick = handle_del);
        //Handling the edit
        edit.forEach(element => element.onclick = handle_edit);

    }
  document.getElementById('myInput').value = "";

}

//Handling the delete
function handle_del(){
  let div = this.parentElement.parentElement; //tr
  let index = tasks.indexOf(div.firstChild.textContent);
  tasks.splice(index,1); localStorage.setItem("tasks", JSON.stringify(tasks));
  div.style.display = "none";
  div.remove();
}

del.forEach(element => element.onclick = handle_del);

//Handling the edit
function handle_edit(){
  let div = this.parentElement.parentElement; //tr
  let index = tasks.indexOf(div.firstChild.textContent);
  div.firstChild.setAttribute('contenteditable','true');
  div.firstChild.style.border = '3px solid black';

  function eve(){
    let isClickInsideElement = div.contains(event.target);
    if (!isClickInsideElement) {
      tasks[index] = div.firstChild.textContent; localStorage.setItem("tasks", JSON.stringify(tasks));
      div.firstChild.setAttribute('contenteditable','false');
      div.firstChild.style.border = 'none';
      //to remove the event
      document.removeEventListener('click', eve );
    }
  }
  document.addEventListener('click', eve );
}
edit.forEach(element => element.onclick = handle_edit);

