// UPLOAD A PHOTO
async function uploadPhoto(file){

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "j9hm67rk")
    formData.append("folder","ToDo Web")

    const response = await fetch("https://api.cloudinary.com/v1_1/juanrojasc/image/upload", {
        method: "POST",
        body: formData
    })
    const json = await response.json();
    const url = await json.url;
    const id = await json.public_id
    return [json, url, id]
}


// DELETE A PHOTO UPLOADED
async function destroyPhoto(id){
    let timestamp = Date.now()
    let sign = await signature(`public_id=${id}&timestamp=${timestamp}`)

    const formData = new FormData();
    formData.append("public_id",`${id}`)
    formData.append("timestamp", `${timestamp}`)
    formData.append("api_key","718563786378529")
    formData.append("upload_preset", "j9hm67rk")
    formData.append("signature", `${sign}`)
    

    const response = await fetch("https://api.cloudinary.com/v1_1/juanrojasc/image/destroy", {
        method: "POST",
        body: formData
    })
    const state = await response.status;
    const json = await response.json();
    return [state, json]
}


// GET PUBLIC ID
function getPhotoId(link){
    link = link.split("20Web/")
    return link[1]
}

export { uploadPhoto, destroyPhoto, getPhotoId }