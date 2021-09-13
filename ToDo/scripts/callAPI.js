

// SIGN IN & SIGN UP

// NORMAL VERSION OF GET A PROMISE RESPONSE
/*function singUpAPI(link, name, lastname, email, password){
    return fetch(link, {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({firstName: name, lastname: lastname, email: email, password: password})
    })
    .then(function(response){
        return response.json()
    })
    .then(function(token){
        return token
    })
    .catch(function(error){
        token = "Algo salio mal";
    })
}*/

// LIGTH VERSION OF GET A PROMISE RESPONSE
async function signUpAPI(link, name, lastname, email, password){
    const response =  await fetch(link, {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({firstName: name, lastName: lastname, email: email, password: password})
    }) 
    const status = await response.status;
    const json = await response.json();
    return [status, json]
}


// NORMAL VERSION OF GET A PROMISE RESPONSE
/*function signInAPI(link, email, password){
    return fetch(link, {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({email: email, password: password})
    })
    .then(function(response){
        return response.json()
    })
    .then(function(token){
        return token
    })
    .catch(function(error){
        return "Algo salio mal";
    })
}*/

// LIGTH VERSION OF GET A PROMISE RESULT
async function signInAPI(link, email, password){
    const response = await fetch(link, {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({email:email, password:password})
    })
    const status = await response.status;
    const json = await response.json();
    return [status, json]
}

// WAIT FOR PROMISE RESULT  
function waitResponse(variable){
    Array.isArray(variable)? variable.forEach(element => console.log(element)) : console.log(variable)
}



// MANAGMENT TASKS

// GET TASKS
async function getTasks(link, jwt){
    const response = await fetch("https://ctd-todo-api.herokuapp.com/v1/tasks",{
        headers:{
            "Authorization":`${jwt}`
        }
    })
    const status = await response.status
    const tasks = await response.json();
    const doneTasks = tasks.filter(task=> task.completed).sort((previous, next) => previous.id - next.id);
    const notDoneTasks = tasks.filter(task=> !task.completed).sort((previous, next) => previous.id - next.id);
    const mainTaskID = doneTasks[0].id
    const profilePhoto = doneTasks[0].description.split("®")[1];
    doneTasks[0].description = doneTasks[0].description.split("®")[0];
    return [doneTasks, notDoneTasks, profilePhoto, mainTaskID, status]
}

// CREATE TASK
async function createTask(link, jwt, taskDescription, complete=null){
    const response = await fetch(link, {
        method: "POST",
        headers: {
            "Authorization": `${jwt}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify({description:taskDescription, completed: complete? true : false})
    })
    const taskCreated = await response.json()
    return taskCreated;
}

// DELETE TASK
async function deleteTask(taskId, jwt){
    const mainTaskPrevention = await getTasks(true, jwt)
    if(taskId == mainTaskPrevention[3]){
        console.log("UNATHORIZED OPERATION");
        return false;
    }
    const response = await fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `${jwt}`,
            "Content-type": "application/json"
        }
    })
    const status = await response.status;
    const json = await response.json();
    return [status, json]
}

// GET SPECIFIC TASK
async function getTask(taskId, jwt){
    const response = await fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${taskId}`, {
        method:"GET",
        headers: {
            "Authorization" : `${jwt}`,
            "Content-type": "application/json"
        }    
    })
    const status = await response.status;
    const json = await response.json();
    return [status, json]
}

// UPDATE TASK
async function updateTask(taskId, jwt, taskDescription, taskState, key){
    const mainTaskPrevention = await getTasks(true, jwt)
    if(taskId == mainTaskPrevention[3] && key!=="profilePhotoUpdate"){
        console.log("UNATHORIZED OPERATION");
        return false;
    }
    if(taskId===false) taskId = await mainTaskPrevention[3]
    const response = await fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${taskId}`,{
        method: "PUT",
        headers:{
            "Authorization": `${jwt}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify({description: taskDescription, completed: taskState})
    })
    const status = await response.status;
    const json = await response.json();
    return [status, json]
}

// ACCOUNT INFORMATION
async function getUserData(link, jwt){
    const response = await fetch(link, {
        method: "GET",
        headers: {
            "Authorization": `${jwt}`,
            "Content-type": "application/json"
        }
    })
    return await response.json();
}

export { signUpAPI, signInAPI, waitResponse, getTasks, createTask, deleteTask, updateTask, getTask, getUserData }