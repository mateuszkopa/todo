// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}

showTasks(); //calling showTask function

addBtn.onclick = ()=>{ //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value
  let getlocalStorageData = localStorage.getItem("NewTodo"); //getting localStorage
  if(getlocalStorageData == null){ //if localStorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getlocalStorageData);  //transforming json string into a js object
  }
  listArray.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("NewTodo", JSON.stringify(listArray)); //transforming js object into a json string
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added
  setCookie();
}

function showTasks(){
  let getlocalStorageData = localStorage.getItem("NewTodo");
  if(getlocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getlocalStorageData);
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  let getlocalStorageData = localStorage.getItem("NewTodo");
  listArray = JSON.parse(getlocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("NewTodo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("NewTodo", JSON.stringify(listArray)); //set the item in localStorage
  showTasks(); //call the showTasks function
}

  //cookie


function setCookie(NewTodo,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = NewTodo + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(NewTodo) {
  var name = NewTodo + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user=getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}
