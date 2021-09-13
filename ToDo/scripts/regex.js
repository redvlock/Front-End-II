import { InputNameException, InputPasswordException, InputEmailException } from "./exceptions.js"

// VERIFY THE INPUT NAME AND ITS VALUE
const checkName = (text) => {
    let nameDB = []
    text = text.trim().split(" ").filter(name => name!="")
    for(let userName of text){
        if(/[^\wÀ-úÀ-ÿ]/i.test(userName)){
            throw new InputNameException("Caracteres no Permitidos")
        }
        userName = userName.toLowerCase()
        nameDB.push(userName.replace(userName[0], userName[0].toUpperCase()))
    }
    return nameDB.join(" ")
}

// VERIFY THE SAME VALUE FOR PASSWORD AND REPEAT PASSWORD
const checkPassword = ([password, passwordRepeat]) => {
    if(password == passwordRepeat){
        return password
    }else{
        throw new InputPasswordException("Las contraseñas no coinciden")
    }
}

// VERIFY INVALID CHARACTERS IN EMAIL INPUT
const checkEmail = (email) =>{
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
        return email
    }else{
        throw new InputEmailException("Correo invalido");;
    }
}

// TRY CHECK THE INPUT VERIFACTION FUCTION PASSED LIKE A CALLBACK
function check(callback,input){
    try{
        return callback(input);
    }catch(error){
        return false;
    }
}

// CLEAN TASK NAME 
function checkTaskName(string){
    let taskTitle = string.split(/\s\s*-\s\s|\s\s*-|-\s\s/)
    if(taskTitle.length > 1){
        taskTitle.forEach((word, index) => word == ""? taskTitle.splice(index,1) : taskTitle[index]= word.trim())
        taskTitle = taskTitle.join(" ")
    }
    else taskTitle = taskTitle[0]
    return taskTitle 
}

// LAUNCH ALERT VISUAL FOR INPUTS INVALID
// function dataInvalid(input, inputState, height, message=null){
//     if(inputState == "CORRECT"){
//         input.style.border = "none"
//         let currentTag = input.closest("label");
//         if(currentTag.querySelector("span#dataWrong")){
//             currentTag.querySelector("span#dataWrong").remove();
//             currentTag.nextElementSibling.style.marginTop = `${height}vw`;
//         }
//     }else{
//         input.style.border = "solid 0.1vw red";
//         let currentTag = input.closest("label");
//         if(!currentTag.querySelector("span#dataWrong")){
//             currentTag.innerHTML += `<span id="dataWrong">${message}</span>`;
//             currentTag.nextElementSibling.style.marginTop = `${(height/100) * 45}vw`;
//         }
//     }
// }
function dataInvalid(input, inputState, height, message=null){
    if(inputState == "CORRECT"){
        input.style.border = "none"
        let currentTag = input.closest("label");
        currentTag.querySelector("span#dataWrong").textContent = ""
        currentTag.nextElementSibling.style.marginTop = `${height+0.6}vw`;
    }else{
        input.style.border = "solid 0.1vw red";
        let currentTag = input.closest("label");
        currentTag.querySelector("span#dataWrong").innerText = `${message}`;
        currentTag.nextElementSibling.style.marginTop = `${(height/100) * 45}vw`;
    }
}


export { checkName, checkPassword, checkEmail, check, dataInvalid, checkTaskName };

