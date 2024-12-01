var todoItems = [

];

// Add button and list references
var addBtn = document.querySelector("#addBtn");
var todoList = document.querySelector("#todoList");

addBtn.addEventListener("click", function () {
    var todo = document.querySelector("#newTodo");
    var todoValue = todo.value.trim();

    if (todoValue === "") {
        alert("Please enter a todo item");
        return;
    }

    // Create a task object so that its easier to send completed tasks to the end of the list
    var taskObj = {
        task: todoValue,
        isCompleted: false,
    };

    todoItems.push(taskObj);

    // Update the list to account for new items and checked items
    updateList();

    // Clear the input field
    todo.value = "";
});

function updateList() {
    todoList.innerHTML = ""; //clear current list to avoid duplication when updating

    todoItems.sort((a, b) => a.isCompleted - b.isCompleted);

    todoItems.forEach((taskObj, index) => {
        var task = document.createElement("li");
        var checkBox = document.createElement("input");
        var delBtn = document.createElement("button");

        //add styling for delBtn
        delBtn.classList.add("delBtn");
        delBtn.innerHTML = "Delete";
        delBtn.width="10%";

        checkBox.type = "checkbox";

        task.draggable = true;
        task.style.color="white";
        task.style.display="flex";
        task.style.alignItems="center";
        task.style.justifyContent="space-between";

        checkBox.checked = taskObj.isCompleted;
        task.textContent = taskObj.task;



        if (taskObj.isCompleted) {
            task.style.textDecoration = "line-through";
            task.style.borderBottom = "2px dashed gray";
            task.style.color = "gray";
        }
    
        else {
            task.style.textDecoration = "none";
            task.style.borderBottom = "none";
            task.style.color = "white";
        }


        //Some drag-stuff that I totally 
        //didnt yoink off of the internet😅

        task.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("text/plain", index);
        });
        
        task.addEventListener("dragover", function (e) {
            e.preventDefault();
            task.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        });
        
        task.addEventListener("dragleave", function () {
            task.style.backgroundColor = "";
        });

        task.addEventListener("drop", function (e) {
            e.preventDefault();
            task.style.backgroundColor = ""; // Clear highlight
        
            var draggedIndex = e.dataTransfer.getData("text/plain");
            var targetIndex = index;
        
            [todoItems[draggedIndex], todoItems[targetIndex]] = [todoItems[targetIndex], todoItems[draggedIndex]];
        
            updateList(); // Re-render the list with the updated order
        });
        


        checkBox.addEventListener("change", function () {
            taskObj.isCompleted = this.checked;
            updateList();
        });

        delBtn.onclick = function () {
            var index = todoItems.indexOf(taskObj);
            if (index !== -1) {
                todoItems.splice(index, 1);
                updateList();
            }
        };

        task.prepend(checkBox);
        

        // Append the task to the todo list
        todoList.appendChild(task);
        task.appendChild(delBtn);
    });
}
updateList();