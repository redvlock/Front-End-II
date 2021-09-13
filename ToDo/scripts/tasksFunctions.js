import { signUpAPI, signInAPI, waitResponse, getTasks, createTask, deleteTask, updateTask, getTask, getUserData } from "./callAPI.js";
import { getDescription, getDeadline, getDateWarning, getDateText, getDateMinutes, compareDate, getDateFormat, setPriority, shortText } from "./dataFunctions.js";
import { getPhotoId } from "./cloudinaryAPI.js";
import { checkName, checkPassword, checkEmail, check, dataInvalid, checkTaskName } from "./regex.js";

// FUNCTION FOR ENABLE OPTIONS AND CSS OF EACH TASK
function enableOptTasks(arrayTasks, div, mobile) {
    let main = div.closest("main")
    let section = main.querySelector("section.boardTasks div")
    let menu = main.querySelector("section.menuTask div.menuTask")
    sessionStorage.removeItem("menuActivated")
    arrayTasks.forEach(task => {
        if (!task.completed) {
            let divTask = document.querySelector(`[data-id="${task.id}"]`);
            let circleTasks = divTask.querySelector("div.not-done")
            // TASK
            let divDescription = divTask.querySelector("div.descripcion");
            let divTaskName = divTask.querySelector("p.nombre");
            let divTimeStamp = divTask.querySelector("p.timestamp");
            let divDeadline = divTask.querySelector("p.remainingTime")
            // MENU TASK
            let divTaskOpt = document.querySelector("section.menuTask div.menuTask");
            let closeWindow = document.querySelector("i.close")
            let saveChanges = document.querySelector("i.disk")
            let changesSaves = document.querySelector("i.saved")
            let deleteTaskIcon = document.querySelector("i.trash")
            // CHANGE NAME
            let changeTitleTask = document.querySelector("section.menuTask div.taskTitle");
            let circleTask = changeTitleTask.querySelector("div.not-done");
            let taskMenuTitle = changeTitleTask.querySelector("p")
            let inputTaskTitle = changeTitleTask.querySelector("input")
            // CHANGE DEADLINE DATE
            let changeDeadlineTask = document.querySelector("div.taskDeadline")
            let inputDeadline = changeDeadlineTask.querySelector("label input")
            let currentDeadline = changeDeadlineTask.querySelector("div p")
            // CHANGE WARNING DATE
            let changeWarningDateTask = document.querySelector("div.taskWarnDate")
            let inputWarningDate = changeWarningDateTask.querySelector("label input")
            let currenWarningDate = changeWarningDateTask.querySelector("div p");
            let stateDivState = false;

            // DROP-DOWN MENU TASK
            divTask.addEventListener("click", async function (e) {
                if(!sessionStorage.getItem("menuActivated")){
                    sessionStorage.setItem("menuActivated","true")
                    sessionStorage.setItem("taskID", task.id)
                    const response = await getTask(task.id, sessionStorage.getItem("userToDoToken"));
                    const status = await response[0];
                    let taskData = await response[1];
                    if(status >= 200 && status < 300){
                        stateDivState = true;
                        divDescription.style.backgroundColor = "rgba(142, 100, 197,0.9)";
                        circleTasks.style.backgroundColor = "#8E64C5";
                        divTaskName.style.color = "white";
                        divTaskName.style.fontWeight = "700";
                        divTimeStamp.style.color = "black";
                        section.style.filter = "blur(10px)";
                        saveChanges.style.display = "inline"
                        changesSaves.style.display = "none";
                        taskMenuTitle.textContent = `${shortText(getDescription(taskData.description), mobile, true)}`
                        inputTaskTitle.value = `${getDescription(taskData.description)}`
                        let completeDay = mobile? false : true;
                        currentDeadline.textContent = `${getDateFormat(getDeadline(taskData.description), null, completeDay, null, true)}`
                        currenWarningDate.textContent = `${getDateFormat(getDateWarning(taskData.description), null, completeDay, null, true)}`
                        menu.style.display = "flex";
                    }
                }
            })

            // CHANGE COLOR OF CIRCLE TASK
            divTask.addEventListener("mouseover", function (e) {
                if (!sessionStorage.getItem("menuActivated")) {
                    divDescription.style.backgroundColor = "rgba(142, 100, 197,0.9)";
                    circleTasks.style.backgroundColor = "#8E64C5";
                    divTaskName.style.color = "white";
                    divTaskName.style.fontWeight = "700";
                    divTimeStamp.style.color = "black";
                    divDeadline.style.color = "black";
                }
            })
            divTask.addEventListener("mouseout", function (e) {
                if (!stateDivState) {
                    divDescription.style.backgroundColor = "white";
                    circleTasks.style.backgroundColor = "white";
                    divTaskName.style.color = "rgb(95, 95, 95)";
                    divTaskName.style.fontWeight = "500"
                    divTimeStamp.style.color = "rgb(134, 134, 134)";
                    divDeadline.style.color = "rgb(134, 134, 134)";
                    circleTasks.style.backgroundColor = "white"
                }
            })

            // CLOSE MENU TASK
            closeWindow.addEventListener("click", function (e) {
                taskMenuTitle.textContent = inputTaskTitle.value
                inputTaskTitle.style.display = "none"
                taskMenuTitle.style.display = "block"
                divTaskOpt.style.display = "none";
                sessionStorage.removeItem("menuActivated");
                stateDivState = false
                divDescription.style.backgroundColor = "white";
                circleTasks.style.backgroundColor = "white";
                divTaskName.style.color = "rgb(95, 95, 95)";
                divTaskName.style.fontWeight = "500"
                divTimeStamp.style.color = "rgb(134, 134, 134)";
                section.style.filter = "blur(0px)";
            })
            // CHANGE TITLE TASK
            changeTitleTask.addEventListener("click", function (e) {
                circleTask.style.backgroundColor = "#8E64C5";
                taskMenuTitle.style.display = "none"
                inputTaskTitle.style.display = "block";
            })
            inputTaskTitle.addEventListener("focus", function(e){
                sessionStorage.setItem("taskTitle", inputTaskTitle.value)
                saveChanges.style.display = "inline"
                changesSaves.style.display = "none";
            })
            inputTaskTitle.addEventListener("blur", function(e){
                taskMenuTitle.textContent = inputTaskTitle.value;
                sessionStorage.setItem("taskTitle", inputTaskTitle.value)
            })
            // EDIT DEADLINE DATE
            inputDeadline.addEventListener("change", function(e){
                currentDeadline.textContent = getDateFormat(inputDeadline.value,null,true,null,true)
                sessionStorage.setItem("deadlineValue", inputDeadline.value)
                saveChanges.style.display = "inline"
                changesSaves.style.display = "none";
            })
            // EDIT WARNING DATE
            inputWarningDate.addEventListener("change", function(e){
                currenWarningDate.textContent = getDateFormat(inputWarningDate.value,null,true,null,true)
                sessionStorage.setItem("warningDateValue", inputWarningDate.value)
                saveChanges.style.display = "inline"
                changesSaves.style.display = "none";
            })

            // SAVE CHANGES
            saveChanges.addEventListener("click", async function(e){
                let taskId = sessionStorage.getItem("taskID");
                if(task.id != taskId){
                    return
                }
                const response = await getTask(taskId, sessionStorage.getItem("userToDoToken"));
                const status = await response[0];
                task = await response[1];
                if(status >= 200 && status < 300){
                    let taskDescription = getDescription(task.description)
                    let taskDeadline = getDeadline(task.description)
                    let taskWarnDate = getDateWarning(task.description)
                    let newTaskTitle = sessionStorage.getItem("taskTitle")
                    let newDeadline = sessionStorage.getItem("deadlineValue")
                    let newWarningDate = sessionStorage.getItem("warningDateValue")
                    // DESCRIPTION TASK TEXT
                    if(newTaskTitle){
                        newTaskTitle = checkTaskName(newTaskTitle)
                        task.description = task.description.replace(taskDescription, newTaskTitle)
                    } 
                    // DEADLINE TASK
                    if(taskDeadline!==false && newDeadline){
                        task.description = task.description.replace(taskDeadline, newDeadline);
                    }
                    else if(!taskDeadline && taskWarnDate && newDeadline){
                        task.description = task.description.replace("-  ",`-  ${newDeadline}  -  `)
                    }
                    else if(!taskDeadline && !taskWarnDate && newDeadline){
                        task.description = task.description.replace("-  ",`-  ${newDeadline}  -  `)
                    }
                    // WARNING DATE
                    if(taskWarnDate && newWarningDate){
                        task.description = task.description.replace(taskWarnDate, newWarningDate)
                    }else if(!taskWarnDate && taskDeadline && newWarningDate){
                        let currentDeadline = getDeadline(task.description)
                        task.description = task.description.replace(`${currentDeadline}  -`, `${currentDeadline}  -  ${newWarningDate}`)
                    }
                    else if(!taskDeadline && !taskWarnDate && newWarningDate){
                        task.description = task.description.replace("-  ", `-  ${inputDeadline.value}  -  ${newWarningDate}`)
                    }
                    const response = updateTask(divTask.dataset.id, sessionStorage.getItem("userToDoToken"), task.description, task.completed)
                    saveChanges.style.display = "none"
                    changesSaves.style.display = "inline";
                    taskMenuTitle.textContent = shortText(checkTaskName(inputTaskTitle.value), mobile, true)
                    taskMenuTitle.style.display = "block"
                    inputTaskTitle.style.display = "none";
                    let divTaskData = document.querySelector(`[data-id="${taskId}"]`)
                    let divTitleTask = divTaskData.querySelector("p.nombre")
                    let divDateComplete = divTaskData.querySelector("div.descripcion div")
                    if(newTaskTitle) divTitleTask.textContent = `${shortText(newTaskTitle, mobile)}`
                    let timestamp = divTaskData.querySelector("p.remainingTime")
                    let priority = setPriority(newDeadline, newWarningDate)
                    if(newWarningDate) {
                        let dateWarningMinutes = getDateWarning(newWarningDate, "min");
                        priority = setPriority(newDeadline, dateWarningMinutes)
                    }
                    if (newDeadline) {
                        timestamp.innerHTML = `<i class="far fa-clock remainingTimeL" style="color: ${priority};"></i> ${getDateText(newDeadline)}`
                        if(divDateComplete.querySelector("p.timestamp")){
                            divDateComplete.querySelector("p.timestamp").innerHTML = `<i class="far fa-calendar-alt creationDate"></i> ${getDateFormat(newDeadline)}`
                        }else{
                            let taskName = divTitleTask.textContent
                            divDateComplete.innerHTML = `<p class="nombre">${taskName}</p>
                                                         <p class="timestamp"><i class="far fa-calendar-alt creationDate"></i> ${getDateFormat(newDeadline)}</p>`
                        }
                    }
                }
                sessionStorage.removeItem("taskTitle")
                sessionStorage.removeItem("deadlineValue")
                sessionStorage.removeItem("warningDateValue")

            })

            // DELETE TASK
            deleteTaskIcon.addEventListener("click", async function(e){
                let taskId = sessionStorage.getItem("taskID");
                if(task.id != taskId){
                    return
                }
                const response = await deleteTask(taskId, sessionStorage.getItem("userToDoToken"))
                setTimeout(()=>{
                    document.querySelector(`[data-id="${sessionStorage.getItem("taskID")}"]`).remove();
                    closeWindow.click();
                },50)
            })

            // TASK COMPLETED
            circleTasks.addEventListener("click", async function(e){
                e.stopPropagation()
                if(e.detail < 2){
                    let taskId = divTask.dataset.id
                    let divTasks = divTask.closest("div").querySelector("ul.tareas-terminadas")
                    const getTaskResponse = await getTask(taskId, sessionStorage.getItem("userToDoToken"))
                    const getTaskStatus = await getTaskResponse[0]
                    let dataTask = await getTaskResponse[1]
                    const updateTaskResponse = await updateTask(taskId, sessionStorage.getItem("userToDoToken"), dataTask.description, true);
                    if(updateTaskResponse){
                        renderTask(divTasks, updateTaskResponse[1])
                        enableOptTasks([updateTaskResponse[1]], divTasks)
                        divTask.remove()
                    }
                }
            })
        }
        else if(task.completed){
            let divTask = div.querySelector(`[data-id="${task.id}"]`);
            let circleTasks = divTask.querySelector("div.not-done")
            let btnRestore = circleTasks.querySelector("i.restore")
            let btnDelete = divTask.querySelector("i.trashDoneTask")

            // RESTORE UNCOMPLETED TASK
            divTask.addEventListener("mouseover", function(e){
                btnRestore.style.display = "inline"
                btnDelete.style.display = "inline"
            })
            divTask.addEventListener("mouseout", function(e){
                btnRestore.style.display = "none"
                btnDelete.style.display = "none"
            })
            circleTasks.addEventListener("click", async function(e){
                e.stopPropagation()
                if(e.detail < 2){
                    let taskId = divTask.dataset.id
                    let divTasks = divTask.closest("div").querySelector("ul.tareas-pendientes")
                    const response = await getTask(taskId, sessionStorage.getItem("userToDoToken"))
                    const status = await response[0]
                    let taskData = await response[1]
                    const updateTaskResponse = await updateTask(taskId, sessionStorage.getItem("userToDoToken"), taskData.description, false)
                    if(updateTaskResponse){
                        renderTask(divTasks, updateTaskResponse[1])
                        enableOptTasks([updateTaskResponse[1]], divTask)
                        divTask.remove()
                    }
                }
            })

            // DELETE TASK
            btnDelete.addEventListener("click", async function(e){
                e.stopPropagation()
                if(e.detail < 2){
                    let taskId = divTask.dataset.id
                    const response = await deleteTask(taskId, sessionStorage.getItem("userToDoToken"))
                    if(response){
                        setTimeout(()=>{
                            divTask.remove();
                        },50)
                    }
                }
            })
        }
    })
}

// LOAD PROFILE USER DATA
async function loadUserData(userToken, userNameDiv, userPhotoDiv) {
    const response = await getUserData("https://ctd-todo-api.herokuapp.com/v1/users/getMe", userToken);
    userNameDiv.innerText = `${response.firstName.split(" ")[0]} ${response.lastName.split(" ")[0]}`;
    loadPhotoProfile(userToken, userPhotoDiv)
}

// LOAD USER PROFILE PHOTO
async function loadPhotoProfile(userToken, userPhotoDiv) {
    const photoServer = "https://res.cloudinary.com/juanrojasc/image/upload/"
    let link = await getTasks("https://ctd-todo-api.herokuapp.com/v1/tasks", userToken)
    link = link[2] ? link[2] : false
    if (link) {
        let photoId = getPhotoId(link)
        localStorage.setItem("userPhotoUrl", encrypt(link + " ® " + photoId))
        userPhotoDiv.setAttribute("src", `${photoServer + link}`);
        userPhotoDiv.closest("div").style.opacity = "100";
    } else {
        localStorage.removeItem("userPhotoUrl")
    }
}

// LOAD FROM API OF ALL TASKS
async function loadTasks(userToken, doneTasksDiv, notDoneTasksDiv, userMobile) {
    const tasks = await getTasks("https://ctd-todo-api.herokuapp.com/v1/tasks", userToken)
    const doneTasks = tasks[0];
    const notDoneTasks = sortTasks(tasks[1], "PRIORITY H")
    renderTasks(doneTasks, null, doneTasksDiv, userMobile);
    renderTasks(notDoneTasks, null, notDoneTasksDiv, userMobile);
    if(notDoneTasks.length === 0) return false;
    else return true;
}

// CREATE A NEW TASK
async function newTask(userToken, taskTitle, div, mobile) {
    const response = await createTask("https://ctd-todo-api.herokuapp.com/v1/tasks", userToken, taskTitle);
    renderTasks(null, response, div, mobile);
    return await response;
}

// RENDER ALL TASKS
function renderTasks(arrayTasks, task, div, userMobile) {
    if (arrayTasks) {
        arrayTasks.forEach(task => renderTask(div, task, userMobile))
        enableOptTasks(arrayTasks, div, userMobile)
    } else if (task) {
        renderTask(div, task, userMobile);
    }
}

// RENDER FRONT END OF TASK
function renderTask(div, task, mobile) {
    // console.log(task.id)
    let date, deadlineMinutes, deadlineText, dateWarningMinutes, dateWarningText, priority;
    // DETERMINE THE CREATION DATE
    // let date = getDateText(task.createdAt, false, true);

    // GENERATE TEXT FROM DEADLINE DATE
    if (getDeadline(task.description)) {
        date = getDateFormat(getDeadline(task.description));
        date = `<p class="timestamp"><i class="far fa-calendar-alt creationDate"></i> ${date}</p>`
    } else {
        date = ""
    }

    // DETERMINE THE TEXT FOR DEADLINE DATE
    if (!task.completed) {
        // SET THE QTY MINUTES FOR FINISHED THE TASK
        deadlineMinutes = getDeadline(task.description, "min")
        deadlineText = getDateText(deadlineMinutes, "text")
        deadlineText = deadlineMinutes || deadlineMinutes===0? deadlineText : "∞"

        // SET THE QTY OF MINUTES FOR WARN USER
        dateWarningMinutes = getDateWarning(task.description, "min");

        // DETERMINE THE REMAINING TIME AND COLOR INDICATOR
        priority = setPriority(deadlineMinutes, dateWarningMinutes)

        return div.insertAdjacentHTML("afterbegin",
            `<li class="tarea" data-id=${task.id}>
                <div class="${task.complete ? "done" : "not-done"}">
                    <i class="fas fa-check completed"></i>
                </div>
                    <div class="descripcion">
                        <div>
                            <p class="nombre">${shortText(getDescription(task.description), mobile)}</p>
                            ${date}
                        </div>
                        <p class="timestamp remainingTime"><i class="far fa-clock remainingTimeL" style="color: ${priority};"></i> ${deadlineText}</p>
                    </div>
                </div>
            </li>`
        )
    }

    return div.insertAdjacentHTML("afterbegin",
        `<li class="tarea" data-id=${task.id}>
        <div class="${task.complete ? "done" : "not-done"}">
            <i class="fas fa-redo-alt restore"></i>
        </div>
            <div class="descripcion">
                <div>
                    <p class="nombre">${shortText(getDescription(task.description), mobile)}</p>
                    <i class="flaticon-delete trashDoneTask option"></i>
                </div>
                <p class="timestamp remainingTime"><i class="far fa-calendar-alt creationDate"></i> ${getDateText(task.createdAt, false, true)}</p>
        </div>
    </li>`
    )
}

// SORT TASKS
function sortTasks(array, mode) {
    if (mode == "PRIORITY H") {
        return array.sort((previous, next) => compareDate(previous, next));
    }
    else if (mode == "PRIORITY L") {
        return array.sort((previous, next) => compareDate(previous, next, true));
    }
    else if (mode == "OLDEST") {
        return array.sort((previous, next) => next.id - previous.id)
    }
    else if (mode == "LATEST") {
        return array.sort((previous, next) => previous.id - next.id)
    }
}

async function refreshTasks(userToken){
    let doneTasks, notDoneTasks, status = 250;
    const response = await getTasks("https://ctd-todo-api.herokuapp.com/v1/tasks", userToken);
    doneTasks = await response[0]
    notDoneTasks = await response[1]
    status = await response[4]
    let refreshQty = 0;
    setInterval(async () => {
        if (status >= 200 && status <= 300) {
            refreshQty = 1
            checkTaskData(notDoneTasks, "ul.tareas-pendientes")
            checkTaskData(doneTasks, "ul.tareas-terminadas")

            function checkTaskData(arrayTasks, div) {
                let tasksDiv = document.querySelectorAll(`${div} li.tarea`)
                tasksDiv.forEach(taskDiv => {
                    let taskID = taskDiv.dataset.id
                    let dataTask = arrayTasks.find(taskData => taskData.id == taskID)
                    if (dataTask) {
                        if (!dataTask.completed) {
                            let divUpdate = taskDiv.querySelector("p.remainingTime")
                            let currentText = divUpdate.textContent
                            let currentDeadline = getDateText(getDeadline(dataTask.description, "min") - refreshQty, "min")
                            if (currentText != currentDeadline) {
                                let priority = setPriority(getDeadline(dataTask.description, "min"), getDateWarning(dataTask.description, "min"))
                                divUpdate.innerHTML = `<i class="far fa-clock remainingTimeL" style="color: ${priority};"></i> ${currentDeadline}`
                            }
                        } else {
                            let divUpdate = taskDiv.querySelector("p.timestamp")
                            let currentText = divUpdate.textContent
                            let currentDateCreation = getDateText(Math.round(((new Date() - new Date(dataTask.createdAt)) / 1000 / 60) + refreshQty), "min")
                            if (currentText != currentDateCreation) {
                                divUpdate.innerHTML = `<i class="far fa-calendar-alt creationDate"></i> ${currentDateCreation}`
                            }
                        }
                    }
                })
            }

        }

    }, 60000);
}

async function filterTasks(userToken, filter){
    function matchDate(minutes, option){
        if(minutes===false && option==true) return false
        else if(option===false) return true
        else if(minutes <= 1440 && option===1) return true
        else if((minutes > 1440 && minutes <= 2880) && option===2) return true
        else if(minutes!==false && minutes <= 10800 && option===3) return true
        else if(minutes!==false && minutes <= 43920 && option===4) return true
        else return false
    }
    let tasksMatch = []
    const response = await getTasks(true, userToken)
    let arrayTasks = await response[1]
    arrayTasks.forEach(task => {
        let taskDeadline = getDeadline(task.description, "min")
        if(matchDate(taskDeadline, filter)) tasksMatch.push(task)
    })
    if(filter!==false)sessionStorage.setItem("SortedTasks",filter)
    else if(filter===false) sessionStorage.removeItem("SortedTasks")
    return sortTasks(tasksMatch, "PRIORITY H");
}
export { loadUserData, loadPhotoProfile, loadTasks, newTask, renderTasks, renderTask, enableOptTasks, refreshTasks, sortTasks, filterTasks }
