// FUNCTIONS
function newNotice(notice){
    return `<div class="regularNew">
        <div class="newImage">
            <div class="scopeArea ${notice.tipoNacional? "nacional":"internacional"}">${notice.tipoNacional? "Nacional":"Internacional"}</div>
            <img src=${notice.imgUrl} alt="Image New">
        </div>
        <div class="newDescription">
            <h2>${notice.titulo}</h2>
            <p class="date">${notice.fecha}</p>
            <p class="description">${notice.descripcion}</p>
        </div>
    </div>`
}



function search(string){
    coincidence = {}
    string = string.split(" ")
    for(let i = 0; i<noticias.length; i++){
        noticiaTitle = noticias[i].titulo.split(/:*\s/g);
        noticiaDescription = noticias[i].descripcion.split(/"*:*\s/g)
        for(let x = 0, v = 0; x<noticiaTitle.length; x++){
            noticiaTitle[x].toLowerCase() == string[v].toLowerCase()? coincidence[i] = `indice ${i}` : v >= (string.length - 1)? v = 0 : v++
        }
        for(let x = 0, v = 0; x<noticiaDescription.length; x++){
            noticiaDescription[x].toLowerCase() == string[v].toLowerCase()? coincidence[i] = `indice ${i}` : v >= (string.length - 1)? v = 0 : v++
        }
    }
    return Object.keys(coincidence).length > 0? Object.keys(coincidence)[0] : "No Encontrado"
}

function result(index){
    // console.log(index)
    if(index == "empty"){
        inputSearch.style.display = "none"
    }
    else{
        inputSearch.style.display = "flex"
        if(index == "No Encontrado"){
            inputSearch.classList.add("notRefund")
            inputSearch.classList.remove("coincidence")
            inputSearch.innerHTML = `
            <h3>No Hay Coincidencias</h3>`
        }
        else{
            inputSearch.classList.remove("notRefund")
            inputSearch.classList.add("coincidence")
            index = parseInt(index)
            notice = noticias[index]
            inputSearch.innerHTML = `
            <img src=${notice.imgUrl} alt="Result Image">
            <a href=""><h3>${notice.titulo}</h3></a>
        `
        }
    }
}

// ADD NEW STOCK AN EXCHANGE VALUES
function newValue(value){
    return `
    <p>${value.nombre}:<span>${value.precio}</span> <i class="fas fa-sort-up ${value.variacion != "negativa"? "growP" : "growN"}"></i></p>
    `
}

// GROW INPUT SEARCH ANIMATION
function growInput(x){
    for(let i = 0; i<=30; i++){
        increase(i,x);
        divSearch.style.display = "flex";
    }
    function increase(i,h){
        setTimeout(function(){
            divSearch.style.width = `${x==0? 30 - i : i}vw`;
            if (i==30 && x==0){
                divSearch.style.display = "none"
            }
        },20*i)
    }
}

valores.forEach( valor=> document.querySelector("#divisas").innerHTML += newValue(valor))

// ELEMENTS
inputSearch = document.querySelector("#results")
divSearch = document.querySelector("#inputSearch")

// VARIABLES
let InputBarActivated = false;
let moreNewsButton = false;

// TAKE THE USER INPUT FOR SEARCH IN OUR DATA
divSearch.addEventListener("keydown",function(event){
    if(event.key == "Enter"){
        result(event.target.value == false? "empty" : search(event.target.value))
        event.preventDefault();
    }
    if(event.key == "Backspace"){
        result("empty")
    }
})


// CLEAR INPUT SEARCH IN DESKTOP AND HIDDE THE INPUT SEARCH IN MOBILE
window.addEventListener("click",function(e){
    e.stopPropagation()
    result("empty")
    if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && InputBarActivated == true){
        growInput(0)
        InputBarActivated = false;
        divSearch.value = ""
    }
}) 



// BUTTON FIND IN A MOBILE
document.querySelector(".lupa").addEventListener("click",function(e){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && InputBarActivated == false){
        growInput(1);
        InputBarActivated = true;
    }
    e.stopPropagation();
})
divSearch.addEventListener("click",function(e){
    e.stopPropagation();
})

// BOTTOM BAR MENU
document.querySelector(".barMenu").addEventListener("click",function(e){
    let ul = document.querySelector("ul")
    if (ul.style.display == "flex"){
        ul.style.display = "none";
    }
    else{
        ul.style.display = "flex"
    }
    e.stopPropagation();
})


// CHARGE QUANTITY OF NEWS DEPENDING OF NAVIGATOR
window.addEventListener("load",function(event){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        document.querySelector("#regularNews").innerHTML = newNotice(noticias[0]);
        // BUTTON MORE NEWS
        document.querySelector(".moreNewsArrow").addEventListener("click",e=>{
            if(moreNewsButton == false){
                document.querySelector(".moreNewsArrow").style.transform = "rotate(180deg)";
                document.querySelector("#regularNews").innerHTML = "";
                noticias.forEach(noticia => document.querySelector("#regularNews").innerHTML += newNotice(noticia));
                moreNewsButton = true;
            }
            else{
                document.querySelector(".moreNewsArrow").style.transform = "rotate(0deg)";
                document.querySelector("#regularNews").innerHTML = newNotice(noticias[0]);
                moreNewsButton = false;
            }
        })
    }
    else{
        noticias.forEach(noticia => document.querySelector("#regularNews").innerHTML += newNotice(noticia))
    }
})
