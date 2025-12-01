const prompt = require('prompt-sync')({ sigint: true });

let todoList = [];

function addTask() {
    const task = prompt("Enter the new task: ");
    if (task.trim() !== "") {
        todoList.push(task.trim());
        console.log(`\n Task "${task.trim()}" added.`);
    } else {
        console.log("\n Task cannot be empty.");
    }
}

function displayTasks() {
    if (todoList.length === 0) {
        console.log("\n Your to-do list is empty. Time to add some tasks!");
        return;
    }
    
    console.log("\n--- YOUR TO-DO LIST ---");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
    console.log("------------------------");
}

function removeTask() {
    displayTasks();
    
    if (todoList.length === 0) {
        return;
    }

    const indexInput = prompt("Enter the number of the task to remove: ");
    const indexToRemove = parseInt(indexInput) - 1; 

    if (isNaN(indexToRemove) || indexToRemove < 0 || indexToRemove >= todoList.length) {
        console.log(`\n Invalid task number: Please enter a number between 1 and ${todoList.length}.`);
    } else {
        const removedTask = todoList.splice(indexToRemove, 1);
        console.log(`\n Task "${removedTask[0]}" removed.`);
    }
}

function clearTasks() {
    if (todoList.length === 0) {
        console.log("\nList is already empty.");
        return;
    }
    
    const confirmation = prompt("Are you sure you want to clear the entire list? (yes/no): ");
    
    if (confirmation.toLowerCase() === 'yes') {
        todoList = [];
        console.log("\n All tasks cleared.");
    } else {
        console.log("\nOperation cancelled. The list remains unchanged.");
    }
}

function runTodoListCLI() {
    console.log("Welcome to the To-Do List Manager!");
    let running = true;

    while (running) {
        console.log("\n--- Available Commands ---");
        console.log("Commands: add, view, remove, clear, exit");
        
        const command = prompt("Enter a command: ").toLowerCase().trim();

        switch (command) {
            case 'add':
                addTask();
                break;
            case 'view':
                displayTasks();
                break;
            case 'remove':
                removeTask();
                break;
            case 'clear':
                clearTasks();
                break;
            case 'exit':
                running = false;
                console.log("\n Goodbye! Your tasks are saved (in this session).");
                break;
            default:
                console.log(`\n Error: Invalid command "${command}". Please try again.`);
        }
    }
}

runTodoListCLI();