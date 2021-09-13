CryptoJS = window["CryptoJS"]

// var encryptedAES = CryptoJS.AES.encrypt("Message", "My Secret Passphrase");
// var decryptedBytes = CryptoJS.AES.decrypt(encryptedAES, "My Secret Passphrase");
// var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
// console.log(decryptedBytes.toString())

function encrypt(content,input=null) {
    if (content != "") {
        var key = CryptoJS.enc.Utf8.parse('8080808080808080');
        var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    
        var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(content), key,{
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
        });

        input? input.value = encryptedpassword.toString().slice(0,content.length) : ""
    
        return encryptedpassword.toString();
    }

    return false;
} 

function decrypt(content, input=null){
    if (content != "") {
        var key = CryptoJS.enc.Utf8.parse('8080808080808080');
        var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    
        var decrypted = CryptoJS.AES.decrypt(content, key, {
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
            });

        input? input.value = decrypted.toString(CryptoJS.enc.Utf8) : ""
    
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    return false;
}


async function signature( str ) {
    const buffer = new TextEncoder( 'utf-8' ).encode( str + "xFHkqxEbv1D2Ghp5CBzLIx1o7AE");
    const digest = await crypto.subtle.digest('SHA-1', buffer);
  
    // Convert digest to hex string
    const result = Array.from(new Uint8Array(digest)).map( x => x.toString(16).padStart(2,'0') ).join('');
  
    return await result;
}


