import { signUpAPI, signInAPI, waitResponse, getTasks, createTask, deleteTask, getUserData } from "./callAPI.js";
import { getPhotoId } from "./cloudinaryAPI.js";
import { checkName, checkPassword, checkEmail, check, dataInvalid, checkTaskName } from "./regex.js";
import { getDescription, getDeadline, getDateText, getDateMinutes, compareDate, setMinDatePicker } from "./dataFunctions.js";
import { loadUserData, loadPhotoProfile, loadTasks, newTask, renderTasks, renderTask, enableOptTasks, refreshTasks, sortTasks, filterTasks } from "./tasksFunctions.js"

window.onload = async function(e){

    // ELEMENTS AND VARIABLES
    let body = document.querySelector("body");
    let section = document.querySelector("section.boardTasks div")
    let userToken = sessionStorage.getItem("userToDoToken");
    let form = document.querySelector(".nueva-tarea");
    let inputAddTask = document.querySelector(".nombreTarea");
    let datePicker = document.querySelector("label.dataPicker");
    let iconDatePicker = document.querySelector("i.deadlineClock");
    let taskDatePicker = document.querySelector("input.datePicker");
    let taskDeadline = document.querySelector("span.deadline");
    let timeWarnMe = document.querySelector("label.timePickerWarnMe");
    let iconWarnMe = document.querySelector("i.warnme");
    let taskWarnDatePicker = document.querySelector("input.timePickerWarnMe");
    let taskWarnDate = document.querySelector("span.warnline");
    let tareasPendientes = document.querySelector('.tareas-pendientes');
    let doneTasks = document.querySelector(".tareas-terminadas");
    let userProfileOps = document.querySelector("div.user-info");
    let userProfileOpsMobile = document.querySelector("i.mobileMenu");
    let userLogo = userProfileOps.querySelector("div.userData");
    let optionsMenu = userProfileOps.querySelector("div.drop-down-menu")
    let userName = document.querySelector("div.user-info p");
    let userNameMobile = document.querySelector("div.drop-down-menu div.image h2.userName")
    let userPhoto = document.querySelector("#userPhoto");
    let userPhotoMobile = document.querySelector("div.drop-down-menu div.image img")
    let btnSignOut = optionsMenu.querySelector("li.signOut");
    let btnSort = document.querySelector("i.sort");
    let btnSortState = false;
    let sortOptions = btnSort.querySelector("div.prioridad");
    let highPriority = sortOptions.querySelector("p.high")
    let fewPriority = sortOptions.querySelector("p.few")
    let btnFilter = document.querySelector("i.filter");
    let btnFilterState = false;
    let filterOptions = btnFilter.querySelector("div.filter");
    let allTasks = filterOptions.querySelector("p.allTasks")
    let filterToday = filterOptions.querySelector("p.today");
    let filterTomorrow = filterOptions.querySelector("p.tomorrow");
    let filterWeek = filterOptions.querySelector("p.week");
    let filterMonth = filterOptions.querySelector("p.month");

    // BOOLEANS
    let taskTitle;
    let stateBtnDate = false, stateBtnWarn = false;
    let urlPhoto = false;
    let menuDown = false;
    let userMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // DELETE SESSION STORAGE
    sessionStorage.removeItem("SortedTasks")

    // SET THE MINIMIUN DATE FOR PLAIN A TASK
    let currentDate = new Date()
    let currentMonth = currentDate.getMonth() < 10? "0".concat(currentDate.getMonth() + 1) : currentDate.getMonth() + 1
    currentDate = `${currentDate.getFullYear()}-${currentMonth}-${currentDate.getDate()}`
    let dateCurrentHours = new Date().getHours();
    let dateCurrentMinutes = new Date().getMinutes();
    taskDatePicker.setAttribute("min", `${currentDate.concat(`T${dateCurrentHours}:${dateCurrentMinutes}`)}`)
    taskWarnDatePicker.setAttribute("min", `${currentDate.concat(`T${dateCurrentHours}:${dateCurrentMinutes}`)}`)

    // LOAD USER DATA PROFILE
    if(userMobile){
        loadUserData(userToken, userNameMobile, userPhotoMobile)   
    }else{
        loadUserData(userToken, userName, userPhoto)
    }

    // LOAD TASK DONE AND TO DO
    let areThereTasks = await loadTasks(userToken, doneTasks, tareasPendientes, userMobile);
    if(areThereTasks!==false){
        btnSort.style.display = "inline";
        btnFilter.style.display = "inline";
    }

    // KEEP DATA TASK UPDATED
    refreshTasks(userToken);

    // CREATE TASK
    // CHOOSE A DEADLINE FOR TASK AND RENDER THE TASK IN THE INPUT FIELD
    // SUBMIT NEW TASK
    form.addEventListener("submit", async function(e){
        e.preventDefault();
        let taskTitle = checkTaskName(inputAddTask.value)
        taskTitle = `${taskTitle}  -  ${taskDatePicker.value}`
        if(taskDatePicker.value) taskTitle += `  -  ${taskWarnDatePicker.value}`
        if(inputAddTask.value) {
            let task = await newTask(userToken, taskTitle, tareasPendientes, userMobile);
            enableOptTasks([await task], tareasPendientes, userMobile)
        }
        form.reset()
        taskDeadline.textContent = "";
        taskDeadline.style.display = "none";
        taskWarnDate.textContent = ""
        taskWarnDate.style.display = "none";
        timeWarnMe.style.display = "none"
        document.querySelector("i.deadlineClock").style.color = "initial"
        if(areThereTasks!==false){
            btnSort.style.display = "inline";
            btnFilter.style.display = "inline";
        }
    })

    // DATEPICKER
    taskDatePicker.addEventListener("change", function(e){
        iconDatePicker.style.opacity = "1";
        let deadline = getDateMinutes(taskDatePicker.value)
        let priority = deadline > 120? "rgb(30, 221, 30)" : 
        deadline > 1? "rgb(255, 174, 0)" : "rgb(255, 21, 0)"
        taskDeadline.textContent = getDateText(taskDatePicker.value)
        document.querySelector("i.deadlineClock").style.color = priority
        taskDeadline.style.display ="inline";
        
        // ENABLE OPTION FOR SET DATE WARINING
        timeWarnMe.style.display = "block";
    })
    datePicker.addEventListener("mouseover", function(e){
        iconDatePicker.style.opacity = "1";
    })
    datePicker.addEventListener("mouseout", function(e){
        if(!stateBtnDate){iconDatePicker.style.opacity = "0.6";}
    })
    taskDatePicker.addEventListener("click", function(e){
        e.stopPropagation()
        stateBtnDate = true;
    })

    // DATEPICKER WARNING
    taskWarnDatePicker.addEventListener("change", function(e){
        taskWarnDate.textContent = getDateText(taskWarnDatePicker.value);
        taskWarnDate.style.display = "inline";
        iconWarnMe.style.color = "#8E64C5";
    })
    timeWarnMe.addEventListener("mouseover", function(e){
        iconWarnMe.style.opacity = "80%";
    })
    timeWarnMe.addEventListener("mouseout", function(e){
        if(!stateBtnWarn) iconWarnMe.style.opacity = "40%"
    })
    timeWarnMe.addEventListener("click", function(e){
        e.stopPropagation();
        stateBtnWarn = true;
    })

    // SORT BY PRIORITY
    btnSort.addEventListener("click", function(e){
        e.stopPropagation()
        if(e.detail < 2){
            if(!btnSortState){
                if(btnFilterState){
                    filterOptions.style.display = "none"
                    btnFilterState = false
                }
                sortOptions.style.display = "block"
                sortOptions.querySelector("div.notch").style.display = "block"
                btnSortState = true
            }else{
                sortOptions.style.display = "none"
                btnSortState = false
            }
        }
        
    })

    // SORT CHOOSE HIGH PRIORITY
    highPriority.addEventListener("click", async function(e){
        let tasks;
        if(sessionStorage.getItem("SortedTasks")){
            tasks = await filterTasks(userToken, parseInt(sessionStorage.getItem("SortedTasks"))) 
        }
        else{ 
            const response = await getTasks(true, userToken)
            tasks = await response[1]
        }   
        tasks = sortTasks(tasks, "PRIORITY H")
        tareasPendientes.innerHTML = ""
        renderTasks(tasks, null, tareasPendientes)
    })

    // SORT CHOOSE LOW PRIORITY
    fewPriority.addEventListener("click", async function(e){
        let tasks;
        if(sessionStorage.getItem("SortedTasks")){
            tasks = await filterTasks(userToken, parseInt(sessionStorage.getItem("SortedTasks")))
        }
        else{ 
            const response = await getTasks(true, userToken)
            tasks = await response[1]
        }   
        tasks = sortTasks(tasks, "PRIORITY L")
        tareasPendientes.innerHTML = ""
        renderTasks(tasks, null, tareasPendientes)
    })

    // FILTER BUTTON
    btnFilter.addEventListener("click", function(e){
        e.stopPropagation()
        if(!btnFilterState){
            if(btnSortState){
                sortOptions.style.display = "none"
                btnSortState = false
            }
            filterOptions.style.display = "block"
            filterOptions.querySelector("div.notch").style.display = "block"
            btnFilterState = true
        }else{
            filterOptions.style.display = "none"
            btnFilterState = false
        }
    })

    // FILTER OPTIONS
    let filterOptionsList = [allTasks, filterToday, filterTomorrow, filterWeek, filterMonth]
    filterOptionsList.forEach(filterOption => {
        let filter;
        if(filterOption.classList.contains("allTasks")) filter = false;
        if(filterOption.classList.contains("today")) filter = 1;
        if(filterOption.classList.contains("tomorrow")) filter = 2;
        if(filterOption.classList.contains("week")) filter = 3;
        if(filterOption.classList.contains("month")) filter = 4;
        filterOption.addEventListener("click", async function(e){
            let option = filter;
            let token = userToken;
            let divTasks = tareasPendientes;
            let tasksMatch = await filterTasks(userToken, filter)
            divTasks.innerHTML = ""
            renderTasks(tasksMatch,null,divTasks)
        })
    })


    // OPTIONS MENU DROP-DOWN
    if(userMobile){
        e.stopPropagation()
        menuDown = menuDown? false : true
        userProfileOpsMobile.addEventListener("click", function(e){
            e.stopPropagation()
            menuDown = menuDown? false : true
            if(menuDown){
                userProfileOpsMobile.style.opacity = "70%"
                document.querySelector("section.boardTasks div").style.filter = "blur(10px)"
                optionsMenu.style.display = "flex";
            }else{
                optionsMenu.style.display = "none";
                userProfileOpsMobile.style.opacity = "100%"
                document.querySelector("section.boardTasks div").style.filter = "blur(0px)"
            }
        })
    }else{
        userProfileOps.addEventListener("click", function(e){
            e.stopPropagation()
            menuDown = menuDown? false : true
            if(menuDown){
                userLogo.style.opacity = "70%"
                optionsMenu.style.top = `${((document.querySelector("header").offsetHeight) * (100 / document.documentElement.clientWidth)) - 0.5}vw`;
                optionsMenu.style.display = "block";
            }else{
                optionsMenu.style.display = "none";
                userLogo.style.opacity = "100%"
            }
        })
    }

    userLogo.addEventListener("mouseover", function(e){
        userLogo.style.opacity = "70%"
    })

    userLogo.addEventListener("mouseout", function(e){
        if(!menuDown){
            userLogo.style.opacity = "100%"
        }
    })

    // SIGN OUT
    btnSignOut.addEventListener("click", function(e){
        localStorage.clear();
        sessionStorage.clear();
    })

    // BODY CLICKS AN GENERAL ACTIONS
    body.addEventListener("click", function(e){
        if(menuDown){
            menuDown = menuDown? false : true
            userLogo.style.opacity = "100%"
            optionsMenu.style.display = "none"
            document.querySelector("section.boardTasks div").style.filter = "blur(0px)"
        }
        stateBtnDate = false;
        iconDatePicker.style.opacity = "0.6"
        btnFilterState = false
        filterOptions.style.display = "none"
        btnSortState = false
        sortOptions.style.display = "none"
    })

    
    // for(let i = 1872; i<1875; i++){
    //     deleteTask(i, userToken)
    // }
}