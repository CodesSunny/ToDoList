window.onload = () => {
  let data = [];
  let isUpdate = false;

  //  select input element
  const inputTask = document.getElementById("input-task");
  //  select input button
  const form = document.querySelector("form");
  const addlistBtn = document.getElementById("addlist-btn");

  //  apply click event on button to read value of input field
  form.addEventListener("submit", clickToAdd);

  function clickToAdd(e) {
    e.preventDefault();
    // read value of input field
    let inputText = inputTask.value.trim();

    if (isUpdate || isUpdate === 0) {
      data[isUpdate] = inputText; //update the spacific index data that comes from isUpdate(updateTask)
      // const allTr = document.querySelectorAll("tbody tr");
      // allTr[isUpdate].querySelector("td.task-title").innerText = inputText;
      // or 
      printTodo()
      addlistBtn.innerText = "Add To List"; //changing the button text to default
      isUpdate = false; // set isUpdate to false for adding new data

    } else {
      const isAvailable = data.some(
        (todo) => todo.toLowerCase() === inputText.toLowerCase()
      );
      if (isAvailable) {
        alert("Task Already Exist"); // prevent duplication make your one erorr message or any error
        return;
      }
      data.push(inputText); //push data for add
      printTodo();
    }
    //  clear input field
    inputTask.value = "";
  }

  //  define updateTask function to edit row
  function updateTask(index) {
    //  read task text in input field
    inputTask.value = data[index]; //adding the value from data array
    addlistBtn.innerText = `Update ${index + 1}`; // changing the button text to show it is a update button
    isUpdate = index; // set isUpdate to index for changing the data in same index
  }

  function printTodo() {
    let tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // clear table body for prevent duplication

    // Appending all data in table with index
    data.map((todo, i) => {
      let rowEl = document.createElement("tr");
      // set row model
      rowEl.innerHTML = `
                    <td class="serial">${i + 1}</td>
                    <td class="task-title">${todo}</td>
                    <td>
                         <select class="days">
                                <option>Monday </option>
                                <option>Tuesday </option>
                                <option>Wednesday </option>
                                <option>Thursday </option>
                                <option>Friday </option>
                                <option>Saturday </option>
                                <option>Sunday </option>
                        </select>
                        <input type="date" class="date"/>
                    </td>
                    <td>
                        <select class="status">
                                <option>Pending </option>
                                <option>Complete </option>
                                <option>Dropped </option>
                        </select>
                    </td>
                     <td>
                        <button class="edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="delete">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                     `;
      // append row to table body
      tbody.append(rowEl);
    });

    // select edit and delete buttons and defining all function is the data is not empty to prevent error
    if (data.length !== 0) {
      const editBtn = document.querySelectorAll(".edit");
      editBtn.forEach((btn, i) => {
        btn.addEventListener("click", (e) => {  
          updateTask(i);
        });
      });

      const deleteBtn = document.querySelectorAll(".delete");
      deleteBtn.forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
          data.splice(i, 1); //remove the spacific index data
          printTodo();
        });
      });
    }
  }
};
