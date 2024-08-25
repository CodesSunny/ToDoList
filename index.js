window.onload=()=>{
    // initialize row sn
    let sn = 1;
    let rowEl = document.createElement("tr");
    //  get current row i.e. row on which edit clicked

    //  select input element
    var inputTask = document.getElementById("input-task");
    //  select input button
    var addlistBtn = document.getElementById("addlist-btn");

    //  apply click event on button to read value of input field
    addlistBtn.addEventListener('click', clickToAdd);

    function clickToAdd(){
        // read value of input field
        let inputText = inputTask.value;

          //  create tr element
        let rowEl = document.createElement("tr");
        
        // set row model
        rowEl.innerHTML= `
                        <td class="serial">${sn}</td>
                        <td class="task-title">${inputText}</td>
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
                            <button/>
                            <button class="delete">
                                <i class="fa-solid fa-trash-can"></i>
                            <button/>
                        </td>
                         `;
         // append row to table body
         let tbody = document.getElementsByTagName("tbody")[0];
         tbody.append(rowEl); 

        //  increment row serial no
         sn++;
   
        //  clear input field
        inputTask.value = ""; 

        // select edit and delete buttons 
    // var editBtn = document.querySelector(".edit");  
    var editBtn = rowEl.querySelector(".edit");     //  see hint 
    var deleteBtn = rowEl.querySelector(".delete");
    // attach click event to buttons to edit/delete row data
    editBtn.addEventListener('click',()=> updateTask(rowEl,event));   // rowEl passed here to avail it further to function updateTask()
    deleteBtn.addEventListener('click',()=> deleteTask(rowEl)); 
    }


         // update-delete
    //  define updateTask function to edit row 
    function updateTask(rowEl,event){  //  here rowEl not defined here so passed as parameter to access it from other function block
        
        // get current edit button
        let editBtn = event.target;
        // get parent element of edit button
        rowEl = editBtn.closest("tr");
        let taskTitle = rowEl.querySelector(".task-title");
        
        //  read task text in input field
        inputTask.value = taskTitle.textContent; 
        rowEl.remove();
        sn--;
    }


    // delete task
   function deleteTask(rowEl){
    rowEl.remove();
    sn--;
   }






}