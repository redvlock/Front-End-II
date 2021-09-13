import { signUpAPI, signInAPI, waitResponse, getTasks, createTask, deleteTask, getUserData } from "./callAPI.js";
import { uploadPhoto, destroyPhoto } from "./cloudinaryAPI.js";
import { InputNameException, InputPasswordException, InputEmailException } from "./exceptions.js";
import { checkName, checkPassword, checkEmail, check, dataInvalid } from "./regex.js";

window.onload = function (e) {
    const photoServerUrl = "https://res.cloudinary.com/juanrojasc/image/upload/";
    let divForm = document.querySelector("div#form")
    let form = document.querySelector("div#form form");
    let formHeader = form.querySelector("div.form-header");
    let inputName = form.querySelector("input#name");
    let inputLastName = form.querySelector("input#lastName")
    let inputPassword = form.querySelector("input#password");
    let inputPasswordRepeat = form.querySelector("input#passwordRepeat");
    let inputEmail = form.querySelector("input#email");
    let createAccount = form.querySelector("button");
    let fail = document.querySelector("div.form-header");
    let spinner = document.querySelector("div#spinner");
    let resultRegister = document.querySelector("div#resultRegister");
    let viewPassword = document.querySelector("i.eyeOnSignUpP");
    let hidePassword = document.querySelector("i.eyeOffSignUpP");
    let viewPasswordRepeat = document.querySelector("i.eyeOnSignUpPR");
    let hidePasswordRepeat = document.querySelector("i.eyeOffSignUpPR");
    let divPhoto = document.querySelector("div.loadImage");
    let photo = divPhoto.querySelector("img#photo")
    let loadPhoto = document.querySelector("input#addPhoto");
    let animationTime = 1000;
    let userName, userLastName, password, passwordRepeat, email, file, urlPhoto, photoId;
    let photoUploaded = false;
    let enter = false;
    let divFormHeight = divForm.offsetHeight
    let divFormHeightVw = (divForm.offsetHeight) * (100 / document.documentElement.clientWidth)
    let deviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    let height = deviceMobile ? 7.5 : 0.9
    let heightEyePassword = deviceMobile ? 6.6 : 1.8
    

    form.addEventListener("submit", e => {
        e.preventDefault();
        // USER'S LOCATION
        enter = enter && enter == 2? 3 : 1

        // ELEMENTS AND VARIABLES
        let errors = [];
        inputName = form.querySelector("input#name");
        inputLastName = form.querySelector("input#lastName")
        inputPassword = form.querySelector("input#password");
        inputPasswordRepeat = form.querySelector("input#passwordRepeat");
        inputEmail = form.querySelector("input#email");

        // VALIDATION OF INPUT NAME
        if (check(checkName, inputName.value)) {
            userName = check(checkName, inputName.value);
            dataInvalid(inputName, "CORRECT", height)
        } else {
            errors.push({ id: "InputNameException", description: "Caracteres Invalidos" })
            dataInvalid(inputName, "INVALID", height, "*Caracteres Invalidos")
        }

        // VALIDATION OF INPUT LASTNAME
        if (check(checkName, inputLastName.value)) {
            userLastName = check(checkName, inputLastName.value);
            dataInvalid(inputLastName, "CORRECT", height)
        } else {
            errors.push({ id: "InputNameException", description: "Caracteres Invalidos" })
            dataInvalid(inputLastName, "INVALID", height, "*Caracteres Invalidos")
        }

        // VALIDATION OF INPUT PASSWORD
        if (check(checkPassword, [inputPassword.value, inputPasswordRepeat.value])) {
            dataInvalid(inputPasswordRepeat, "CORRECT", height)
            viewPasswordRepeat.style.bottom = "0.5vw"
            hidePasswordRepeat.style.bottom = "0.5vw"
        } else {
            errors.push({ id: "InputPasswordException", description: "Las contraseñas no coinciden" });
            dataInvalid(inputPasswordRepeat, "INVALID", height, "*Las constraseñas no coinciden");
            viewPasswordRepeat.style.bottom = `${heightEyePassword}vw`
            hidePasswordRepeat.style.bottom = `${heightEyePassword}vw`
        }

        // VALIDATION OF INPUT EMAIL
        if (check(checkEmail, inputEmail.value)) {
            email = check(checkEmail, inputEmail.value)
            dataInvalid(inputEmail, "CORRECT", height + 0.8)
        } else {
            errors.push({ id: "InputEmailException", description: "Email Invalido" })
            dataInvalid(inputEmail, "INVALID", height + 2, "*Formato de email invalido")
        }

        errors = [];
        // SUBMIT FORM IF IS VALIDATE
        if (errors.length == 0) {
            // USER'S LOCATION 
            enter = enter == 1? 2 : 3

            // HIDE OR SHOW FORM'S INPUTS
            function displayForm(action) {
                function forEach(myArr, option){
                    for(let i = 1; i < myArr.length; i += 2){
                        if(option == 1) myArr[i].style.display = "none";
                        if(option == 2) myArr[i].style.display = i == 1? "flex" : "block"
                        if(option == 3){
                            myArr[i].style.display = i == 1? "flex" : "block"
                            spinner.style.display = "none"
                            divPhoto.style.display = "none"
                        } 
                    }
                }

                let childs = form.childNodes

                if (action == "HIDE") {
                    forEach(childs, 1)
                    form.style.height = `${divFormHeightVw}vw`
                }else if (action == "SHOW") {
                    forEach(childs, 2)
                }else if (action == "REF"){
                    forEach(childs, 3)
                }
            }
            
            
            // API 
            async function singUp() {
                let status, message;
                // ToDo API
                let response =  await signUpAPI("https://ctd-todo-api.herokuapp.com/v1/users",userName, userLastName, email, decrypt(password)? decrypt(password) : inputPassword.value);
                status = response[0];
                message = response[1];
                
                if (status >= 200 && status < 300) {
                    // Photo Storage API
                    if(photoUploaded){
                        const responseCloudinary = await uploadPhoto(file)
                        urlPhoto = responseCloudinary[1].split("upload/")[1]
                        photoId = responseCloudinary[2]
                        localStorage.setItem("userPhotoUrl",true);
                    }
                    
                    // SIGNUP SUCCESSFULLY SCREEN
                    form.style.filter = "opacity(100%)";
                    form.innerHTML = "";
                    form.style.height = `${divFormHeightVw}vw`;
                    form.appendChild(resultRegister)
                    resultRegister.style.display = "flex"

                    // CREATE FIRST TASK
                    let firstTask = urlPhoto? `Registrarme en ToDo List®${urlPhoto}` : "Registrarme en ToDo List"
                    createTask("https://ctd-todo-api.herokuapp.com/v1/tasks", message.jwt, firstTask, true);

                    // SESSION STORAGE CREDENTIALS
                    setTimeout(() => {
                        sessionStorage.setItem("userToDoToken", message.jwt)
                        window.location.href = "lista-tareas.html";
                    }, animationTime)

                } else {
                    form.style.filter = "opacity(100%)";
                    displayForm("REF")
                    enter = false;
                    let alert = document.querySelector("span#alert")
                    alert ? alert.textContent = `${message}` : fail.innerHTML += `<span id="alert">${message}</span>`
                }
                
            }

            // PAGE FOR UPLOAD A PROFILE PHOTO
            displayForm("HIDE");
            form.style.justifyContent = "space-between";
            document.querySelector("span#alert")? document.querySelector("span#alert").textContent = "" : ""
            hidePassword.style.display = "none"
            hidePasswordRepeat.style.display = "none"
            formHeader.style.display = "flex";
            divPhoto.style.display = "flex";
            createAccount.style.display = "block";
            createAccount.style.marginTop = "2.25vw"
            
            // CHARGING PAGE
            if(enter == 3){
                displayForm("HIDE")
                form.style.filter = "opacity(80%)";
                spinner.classList.add("spinner");
                spinner.style.display = "flex";
                form.appendChild(spinner);
                form.style.justifyContent = "center";
                form.style.alignItems = "center";

                setTimeout(()=>{singUp()},animationTime-1000)
                // singUp()
            }
        }
    })

    // ENCRYPT PASSWORD AND PASSWORDREPEAT
    inputPassword.addEventListener("blur",function(e){
        if(getComputedStyle(viewPassword).display == "block"){ 
            password = encrypt(inputPassword.value, inputPassword)
        }
    });
    inputPasswordRepeat.addEventListener("blur",function(e){
        if(getComputedStyle(viewPasswordRepeat).display == "block"){ 
            passwordRepeat = encrypt(inputPasswordRepeat.value, inputPasswordRepeat)
        }
    });


    // SHOW OR HIDE PASSWORD
    viewPassword.addEventListener("click", function(e){
        decrypt(password, inputPassword);
        inputPassword.setAttribute("type","text");
        viewPassword.style.display = "none";
        hidePassword.style.display = "block";
    })
    hidePassword.addEventListener("click", function(e){
        inputPassword.setAttribute("type", "password");
        viewPassword.style.display = "block";
        hidePassword.style.display = "none"
    })

    // SHOW OR HIDE PASSWORDREPEAT
    viewPasswordRepeat.addEventListener("click", function(e){
        decrypt(passwordRepeat, inputPasswordRepeat);
        inputPasswordRepeat.setAttribute("type", "text");
        viewPasswordRepeat.style.display = "none";
        hidePasswordRepeat.style.display = "block";
    })
    hidePasswordRepeat.addEventListener("click", function(e){
        inputPasswordRepeat.setAttribute("type", "password");
        viewPasswordRepeat.style.display = "block";
        hidePasswordRepeat.style.display = "none";
    })

    // SELECT FILE
    loadPhoto.addEventListener("change", function (e) {
        var fileName = " ";
        fileName = e.target.value.split('\\').pop()
        if (fileName) {
            file = loadPhoto.files[0];
            let fileSize = file.size / 1000000
            let fileAlert = document.querySelector("span#fileAlert");
            let fileTagName = document.querySelector("label#load");
            async function loadPhotoCloud() {
                if (fileSize >= 4) {
                    fileTagName.textContent = "Subir archivo"
                    photoUploaded = false;
                    fileAlert.textContent = "El peso del archivo deber ser menor a 4 Mb";
                    photo.setAttribute("src","./assets/profilePhotoDefault.png");
                    photo.style.opacity = "50%";
                } else {
                    fileTagName.textContent = fileName;
                    fileAlert.textContent = "";
                    photoUploaded = true;
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(e){
                        photo.setAttribute("src",`${e.target.result}`);
                        photo.style.opacity = "100%";
                    }
                }
            }
            loadPhotoCloud()
        }
    })

}
