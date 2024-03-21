const {
  writeNewTaskInFile,
  readFile,
  deleteTaskFromList,
  checkDoneTask,
  checkIfFileExists,
  createFile,
  path,
} = require("./filesystem");

let tasksList;

var readline = require("readline/promises");
rl = readline.createInterface(process.stdin, process.stdout);

function startUpTaskManager() {
  checkIfFileExists(path) ? (tasksList = readFile()) : createFile();
  displayChoices();
}

startUpTaskManager();

async function displayChoices() {
  let answer;
  answer = await rl.question(`*** TASK MANAGER ***
Welcome to your task manager, Press:
1. to see all your tasks
2. to add a task
3. to delete a task
4. to mark a task as done
5. to Exit the task manager
------------------------------------------
Your choice : `);

  let choice = Number(answer);
  switch (choice) {
    case 1:
      listTasks();
      displayChoices();
      break;
    case 2:
      addTask();
      break;
    case 3:
      deleteTask();
      break;
    case 4:
      // console.clear();
      markTaskAsDone();
      break;
    case 5:
      rl.close();
    default:
      console.clear();
      rl.close();
  }
}

function listTasks(tasksList) {
  console.clear();
  tasksList = readFile();
  tasksList.length > 0 ? displayAllTasks(tasksList) : console.log(`No tasks\n`);
}

async function addTask() {
  console.clear();
  let taskName = await addTaskToList();
  writeNewTaskInFile(tasksList, taskName);
  console.clear();
  displayChoices();
}

async function markTaskAsDone() {
  listTasks(tasksList);
  console.log("markdone");
  id = await selectTaskIdk(`Enter the task number to mark as done: `);
  if (checkTaskId(id)) {
    console.clear();
    console.log("checked");
    tasksList = checkDoneTask(tasksList, id);
  }
  displayChoices();
}

async function deleteTask() {
  console.clear();
  listTasks(tasksList);
  id = await selectTaskIdk(`Enter the task number to delete: `);
  if (checkTaskId(id)) {
    console.clear();
    tasksList = deleteTaskFromList(tasksList, id);
  } else {
    console.clear();
  }
  displayChoices();
}

function checkTaskId(id) {
  return id > tasksList.length + 1 || id < 0 ? false : true;
}

function displayAllTasks(tasksList) {
  console.log("Your tasks:");
  tasksList.forEach((tasks) => {
    console.log(
      tasks.id + "." + tasks.description + " " + (tasks.done ? "✅" : "")
    );
  });
}

async function addTaskToList() {
  let taskName = await rl.question(`Enter the task: `);
  return taskName;
}

async function selectTaskIdk(question) {
  console.log("selectedTaskId");
  let taskId = await rl.question(`${question}`);
  return taskId;
}
