const {
	checkDatabase,
	createDatabase,
	checkIfIdExists,
} = require('./public/utils/database');
const {
	getTasks,
	getTasksNotDone,
	getTasksDone,
} = require('./public/utils/getDatabase');
const {
	setTask,
	deleteTask,
	setDoneTask,
} = require('./public/utils/setDatabase');

var readline = require('readline/promises');
rl = readline.createInterface(process.stdin, process.stdout);

async function startUpTaskManager() {
	let db = await checkDatabase();
	console.log('check');
	console.log(db);
	db.length == 0 || db === undefined
		? await createDatabase()
		: displayChoices();

	displayChoices();
}

startUpTaskManager();

async function displayChoices() {
	let answer;
	answer = await rl.question(`*** TASK MANAGER ***
Welcome to your task manager, Press:
1. list all tasks to do
2. list done tasks
3. to add a task
4. to delete a task
5. to mark a task as done
6. to Exit the task manager
------------------------------------------
Your choice : `);

	let choice = Number(answer);
	switch (choice) {
		case 1:
			await listTasks();
			break;
		case 2:
			await listDoneTasks();
			break;
		case 3:
			addTask();
			break;
		case 4:
			selectTaskToDelete();
			break;
		case 5:
			// console.clear();
			await markTaskAsDone();
			break;
		case 6:
			rl.close();
		default:
			console.clear();
			rl.close();
	}
	displayChoices();
}

async function listTasks() {
	console.clear();
	const tasksList = await getTasksNotDone();
	tasksList.length > 0 ? displayAllTasks(tasksList) : console.log(`No tasks\n`);
	await rl.question(`Press any key to continue... `);
	console.clear();
}

async function listDoneTasks() {
	console.clear();
	const tasksList = await getTasksDone();
	tasksList.length > 0 ? displayAllTasks(tasksList) : console.log(`No tasks\n`);
	await rl.question(`Press any key to continue... `);
	console.clear();
}

function displayAllTasks(tasksList) {
	console.log('Your tasks:');
	tasksList.forEach((tasks) => {
		console.log(
			tasks.id + '.' + tasks.description + ' ' + (tasks.done ? '✅' : '')
		);
	});
}

async function addTask() {
	console.clear();
	let taskName = await addTaskToList();
	await setTask(taskName);
	console.clear();
	displayChoices();
}

async function addTaskToList() {
	let taskName = await rl.question(`Enter the task description: `);
	return taskName;
}

async function markTaskAsDone() {
	let result = await getTasksNotDone();
	console.log(result);
	displayAllTasks(result);
	console.log('markdone');
	id = await selectTaskIdk(`Enter the task number to mark as done: `);
	await checkID(id, setDoneTask);
	console.clear();
	displayChoices();
}

async function selectTaskToDelete() {
	console.clear();
	listTasks();
	id = await selectTaskIdk(`Enter the task number to delete: `);
	await checkID(id, deleteTask);
	console.clear();
	displayChoices();
}

async function checkID(id, functionToExecute) {
	let [result] = await checkIfIdExists(id);
	result == undefined
		? console.log('You entered a wrong number')
		: functionToExecute(id);
	await rl.question(`Press enter to continue... `);
}

async function selectTaskIdk(question) {
	console.log('selectedTaskId');
	let taskId = await rl.question(`${question}`);
	return taskId;
}
