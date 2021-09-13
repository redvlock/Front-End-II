import { InputNameException, InputPasswordException, InputEmailException } from "./exceptions.js";
import { signUpAPI, signInAPI, waitResponse, getTasks, createTask, deleteTask, getUserData } from "./callAPI.js";
import { checkName, checkPassword, checkEmail,  check, dataInvalid } from "./regex.js";


window.onload = async function(e){
    const photoServer = "https://res.cloudinary.com/juanrojasc/image/upload/"
    let divForm = document.querySelector("div#form");
    let form = document.querySelector("div#form form");
    let formHeaderAlert = document.querySelector("div.form-header");
    let divPhoto = document.querySelector("div.image");
    let userPhoto = divPhoto.querySelector("img")
    let inputEmail = form.querySelector("input#user");
    let inputPassword = form.querySelector("input#password");
    let viewPassword = document.querySelector("i#eyeOn");
    let hidePassword = document.querySelector("i#eyeOff");
    let divRememberMe = document.querySelector("label#rememberme");
    let rememberMe = document.querySelector("input#rememberme");
    let btnSubmit = document.querySelector("button");
    let signUp = form.querySelector("a")
    let height = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)? 7.5 : 0.9
    let waitTime = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)? 1000 : 550
    let userEmail, password="";
    let divFormHeight = getComputedStyle(divForm).height;
    let divFormHeightVw = (divForm.offsetHeight) * (100 / document.documentElement.clientWidth)

    // REMEMBER ME
    let userCredential = {
        email: localStorage.getItem("userToDo"),
        password: localStorage.getItem("userToDoAccess"),
        photo: localStorage.getItem("userPhotoUrl")? decrypt(localStorage.getItem("userPhotoUrl")).split(" ® ")[0] : "",
        token: localStorage.getItem("userToDoToken")
    }
    let userToken = sessionStorage.getItem("userToDoToken")
    
    if(userCredential.email && userCredential.password){
        console.log(decrypt(userCredential.photo))
        displayForm("HIDE")
        divPhoto.style.display = "flex"
        userPhoto.style.display = "block";
        userToken = userCredential.token;
        let userName = await getUserData("https://ctd-todo-api.herokuapp.com/v1/users/getMe",userToken);
        document.querySelector("h2.userName").textContent = `${userName.firstName} ${userName.lastName}`
        btnSubmit.style.display = "block";
        btnSubmit.style.marginTop = "1vw";
        signUp.style.marginTop = "-0.75vw"
        signUp.style.display = "block";
        // signUp.style.fontSize = "0.9vw";
        signUp.textContent = "¿No es tu cuenta?"
        signUp.setAttribute("href","index.html")
        form.style.justifyContent = "space-between"
        userPhoto.setAttribute("src",userCredential.photo? photoServer + userCredential.photo : "/assets/profilePhotoDefault.png")
        userPhoto.style.opacity = userCredential.photo? "100%" : "50%"
        inputEmail.value = userCredential.email;
        inputPassword.value = decrypt(userCredential.password);

        signUp.addEventListener("click", function(e){
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "index.html"
        })
        userPhoto.addEventListener("click",function(e){
            btnSubmit.click()
        })
    }else{
        displayForm("SHOW")
        inputEmail.style.display = "inline-block"
        inputPassword.style.display = "inline-block"
        divRememberMe.style.display = "flex"
        rememberMe.style.display = "inline-block"
    }

    form.addEventListener("submit", function(e){
        e.preventDefault()
        // ELEMENTS AND VARIABLES
        let errors = [];
        inputEmail = form.querySelector("input#user");
        inputPassword = form.querySelector("input#password");

        // VERIFICATIONS
        if(check(checkEmail, inputEmail.value)){
            userEmail = check(checkEmail,inputEmail.value);
            dataInvalid(inputEmail, "CORRECT", height)
        }else{
            errors.push({id:"InputEmailException",description:"Email Invalido"})
            dataInvalid(inputEmail, "INVALID", height, "*Email Invalido")
        }

        // CALL API
        if(errors.length == 0){
            let status, message;
            async function signIn(){
                let response =  await signInAPI("https://ctd-todo-api.herokuapp.com/v1/users/login", userEmail, decrypt(password)? decrypt(password) : inputPassword.value)
                status = response[0];
                message = response[1];
                let token = message.jwt
                let alert = document.querySelector("span#alert")
                if(status>=200 && status<300){
                    sessionStorage.setItem("userToDoToken", token);
                    sessionStorage.setItem("userToDoAccess", password);
                    if(rememberMe.checked){
                        localStorage.setItem("userToDo",userEmail);
                        localStorage.setItem("userToDoAccess", password);
                        localStorage.setItem("userToDoToken", token);
                    }
                    alert? alert.textContent = "" : ""
                    window.location.href = "lista-tareas.html";
                }else{
                    alert? alert.textContent = `${message}` : formHeaderAlert.innerHTML += `<span id="alert">${message}</span>`
                }
            }

            signIn()
        }

        
             
    })

    // ENCRYPT PASSWORD 
    inputPassword.addEventListener("blur", function(e){
        if(getComputedStyle(viewPassword).display == "block"){ 
            password = encrypt(inputPassword.value, inputPassword)
        }
    })

    // SHOW OR HIDE PASSWORD
    viewPassword.addEventListener("click", function(e){
        decrypt(password, inputPassword)
        inputPassword.setAttribute("type", "text")
        viewPassword.style.display = "none";
        hidePassword.style.display = "block"
    })
    hidePassword.addEventListener("click", function(e){
        inputPassword.setAttribute("type", "password")
        viewPassword.style.display = "block";
        hidePassword.style.display = "none"
    })

    // SHOW OR HIDE FORM'S INPUTS
    function displayForm(opt){
        function forEach(array, action){
            for(let i = 1; i<array.length-1; i+=2){                
                if(action == 1 && i!=1) array[i].style.display = "none";
                if(action == 2) array[i].style.display = i==1? "flex" : "block"
                if(action == 3) {
                    array[i].style.display = i == 1? "flex" : block
                }
            }
        }
        
        let childs = form.childNodes;

        if (opt == "HIDE") {
            forEach(childs, 1)
            form.style.height = `${divFormHeightVw}vw`
        }
        else if (opt == "SHOW") {
            forEach(childs, 2)
        }
        else if (opt == "REF"){
            forEach(childs, 3)
        }
    }
    
}