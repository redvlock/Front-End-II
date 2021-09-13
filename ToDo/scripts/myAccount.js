import { uploadPhoto, destroyPhoto, getPhotoId } from "./cloudinaryAPI.js";
import { loadUserData } from "./tasksFunctions.js";
import { getUserData, getTasks, updateTask } from "./callAPI.js";

window.onload = async function() {
    // VARIABLES & ELEMENTS
    let userToken = sessionStorage.getItem("userToDoToken");
    let userMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const CLOUDINARY = "https://res.cloudinary.com/juanrojasc/image/upload/";
    let userData = await getUserData("https://ctd-todo-api.herokuapp.com/v1/users/getMe", userToken);
    let userNameShort = `${userData.firstName.split(" ")[0]} ${userData.lastName.split(" ")[0]}`;
    let body = document.querySelector("body#settings");
    let main = document.querySelector("main")
    // NAV BAR
    let divUserDataNav = document.querySelector("div.user-info div.userData");
    let divUserDataNavMobile = document.querySelector("i.mobileMenu");
    let divUserPhotoNav = document.querySelector("div.user-image")
    let divUserPhotoNavImage = document.querySelector("div.user-image img");
    let divUserPhotoNavMobile = document.querySelector("div.drop-down-menu div.image img")
    let divUserNameNav = document.querySelector("div.user-info .userData p");
    let divUserNameNavMobile = document.querySelector("div.drop-down-menu div.image h2")
    // DROP-DOWN MENU
    let menuDown = false;
    let menuOptions = document.querySelector("div.drop-down-menu");
    // SECTION
    // WELCOME & PHOTO
    let divMainPhotoProfile = document.querySelector("section.user div.profilePhoto img");
    let divMainUserName = document.querySelector("section.user div.profilePhoto p");
    let divChoosePhoto = document.querySelector("label.chooseFile");
    let divChoosePhotoMobile = document.querySelector("i.camera");
    let chooseFile = document.querySelector("input#uploadPhoto");
    let invalidFileMessage = document.querySelector("small#weight");
    let photoID = false;
    // USER DATA
    let divCompleteName = document.querySelector("div.userName p");
    let divEmailUser = document.querySelector("div.userEmail p");
    let divPasswordUser = document.querySelector("div.userPassword p");
    let divJoinDateUser = document.querySelector("div.userJoined p");
    let watchPassword = document.querySelector("i#eyeOn");
    let hidePassword = document.querySelector("i#eyeOff");

    // LOAD PROFILE DATA
    if(localStorage.getItem("userPhotoUrl")){
        let URL = decrypt(localStorage.getItem("userPhotoUrl")).split(" ® ")[0]
        photoID = decrypt(localStorage.getItem("userPhotoUrl")).split(" ® ")[1]
        divMainPhotoProfile.setAttribute("src", CLOUDINARY+URL)
        if(userMobile){
            divUserNameNavMobile.innerText = userNameShort;
            divUserPhotoNavMobile.setAttribute("src", CLOUDINARY+URL)
            divUserDataNavMobile.style.opacity = "1"
        }else{
            divUserNameNav.innerText = userNameShort;
            divUserPhotoNavImage.setAttribute("src", CLOUDINARY+URL)
            divUserDataNav.style.opacity = "100%"
            divUserPhotoNav.style.opacity = "100%"
        }
    }

    // SET MAIN NAME USER
    divMainUserName.innerHTML = `<span>Bienvenido</span>${userNameShort}`
    // SET COMPLETE NAME USER
    divCompleteName.textContent = userData.firstName + " " + userData.lastName;
    // SET EMAIL USER
    divEmailUser.textContent = userData.email;
    // SET PASSWORD
    let charactersHide = decrypt(sessionStorage.getItem("userToDoAccess")).length
    divPasswordUser.textContent = "*".repeat(charactersHide)
    // SET DATE JOINED
    let date = await getTasks(true, userToken)
    date = await date[0][0]
    divJoinDateUser.textContent = await new Date(date.createdAt).toLocaleDateString();

    // OPEN DROP-DOWN MENU
    if (userMobile) {
        divUserDataNavMobile.addEventListener("click", function (e) {
            e.stopPropagation()
            menuDown = menuDown ? false : true
            if (menuDown) {
                divUserDataNavMobile.style.opacity = "70%"
                main.style.filter = "blur(10px)"
                menuOptions.style.display = "flex";
            } else {
                menuOptions.style.display = "none";
                divUserDataNavMobile.style.opacity = "100%"
                main.style.filter = "blur(0px)"
            }
        })
    } else {
        divUserDataNav.addEventListener("click", function (e) {
            e.stopPropagation()
            menuDown = menuDown ? false : true
            if (menuDown) {
                divUserDataNav.style.opacity = "70%"
                menuOptions.style.top = `${((document.querySelector("header").offsetHeight) * (100 / document.documentElement.clientWidth)) - 0.5}vw`;
                menuOptions.style.display = "block";
            } else {
                menuOptions.style.display = "none";
                divUserDataNav.style.opacity = "100%"
            }
        })
    }

    
    // WATCH PASSWORD
    watchPassword.addEventListener("click", function(e){
        watchPassword.style.display = "none";
        hidePassword.style.display = "block"
        divPasswordUser.textContent = decrypt(sessionStorage.getItem("userToDoAccess"))
    })
    // HIDE PASSWORD
    hidePassword.addEventListener("click", function(e){
        hidePassword.style.display = "none";
        watchPassword.style.display = "block"
        divPasswordUser.textContent = "*".repeat(charactersHide)
    })

    // UPDATE OR LOAD PHOTO PROFILE
    if(!userMobile){
        divMainPhotoProfile.addEventListener("mouseover", function(e){
            divMainPhotoProfile.style.opacity = "70%";
            divChoosePhoto.style.display = "flex";
        })
        divMainPhotoProfile.addEventListener("mouseout", function(e){
            divMainPhotoProfile.style.opacity = "100%";
            divChoosePhoto.style.display = "none";
        })
        divChoosePhoto.addEventListener("mouseover", function(e){
            divMainPhotoProfile.style.opacity = "70%";
            divChoosePhoto.style.display = "flex";
        })
    }
    divChoosePhotoMobile.addEventListener("click", function(e){
        divChoosePhoto.click()
    })

    chooseFile.addEventListener("change", async function(e){
        var fileName = "";
        fileName = e.target.value.split('\\').pop()
        if(fileName){
            let file = chooseFile.files[0];
            let fileSize = file.size / 1000000
            if (fileSize >= 4) {
                invalidFileMessage.style.display = "inline";
            } else {
                invalidFileMessage.style.display = "none"
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = async function (e) {
                    divMainPhotoProfile.setAttribute("src", `${e.target.result}`);
                    divUserPhotoNavImage.setAttribute("src", `${e.target.result}`);
                    divUserPhotoNavMobile.setAttribute("src", `${e.target.result}`)
                    divMainPhotoProfile.style.opacity = "100%";
                    divChoosePhoto.style.display = "none";
                    let responseDestroy = false;
                    if(photoID!==false){
                        responseDestroy = await destroyPhoto(photoID)
                        if(responseDestroy[0] >= 200 && responseDestroy[0] < 300) responseDestroy = true
                    }
                    if(responseDestroy===true || photoID===false){
                        const responseUpload = await uploadPhoto(file)
                        let link = await responseUpload[1].split("upload/")[1]
                        photoID = await responseUpload[2]
                        let firstTask = link? `Registrarme en ToDo List®${link}` : false
                        if(firstTask){
                            const responseUpdate = await updateTask(false, userToken, firstTask, true, "profilePhotoUpdate")
                            console.log(responseUpdate[1])
                            localStorage.setItem("userPhotoUrl", encrypt(link + " ® " + photoID))
                        }
                    }
                }
            }
        }
        if(!userMobile){
            divMainPhotoProfile.style.opacity = "100%";
            divChoosePhoto.style.display = "none";
        }
    })

    // CLICKS ON BODY
    body.addEventListener("click", function(e){
        if(menuDown){
            menuDown = menuDown? false : true
            divUserDataNav.style.opacity = "100%"
            menuOptions.style.display = "none"
        }
    })

}