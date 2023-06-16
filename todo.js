// Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

// Tüm Event Listenerlar

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addTodo); // Submit edildiğinde todo ekleme
  document.addEventListener("DOMContentLoaded", LoadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo Başarıyla Kaldırıldı."); // Todo Silme
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1); // Arrayden Değer Silme
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function LoadAllTodosToUI() {
  // Sayfa Yüklendiğinde Todoları Ekleme
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function addTodo(e) {
  const newTodo = todoInput.value.trim(); //İnput içindeki değeri alma (trim ile boşlukları traşlattık)

  if (newTodo === "") {
    showAlert("danger", "Lütfen Bir Todo Giriniz.");
  } else {
    addTodoToUI(newTodo);
    addToDoToStorage(newTodo);
    showAlert("success", "Todo Başarıyla Eklendi.");
  }

  e.preventDefault();
}

function getTodosFromStorage() {
  //Storagedan Tüm Todoları Alma

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addToDoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement("div");

  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  firstCardBody.appendChild(alert);

  // setTimeout

  setTimeout(() => {
    alert.remove();
  }, 2000);
}

// String değerini List item olarak UI'ya ekleyecek.
function addTodoToUI(newTodo) {
  // List İtem Oluşturma
  const listItem = document.createElement("li");
  // Link Oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItem.classList = "list-group-item d-flex justify-content-between";

  // Text Node Ekleme

  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // Todo List'e List Item'ı Ekleme

  todoList.appendChild(listItem);

  todoInput.value = ""; // Todo girildikten sonra mevcut value'yi sıfırlama
}
