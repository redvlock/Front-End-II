const _0x975d=['lastName','flex','userToDoToken','221074uvkesf','marginTop','blur','i#eyeOff','photo','token','420823crgpep','click','submit','innerHTML','index.html','h2.userName','href','push','test','REF','INVALID','justifyContent','password','HIDE','*Email\x20Invalido','type','setItem','8JEptRy','email','textContent','setAttribute','input#rememberme','span#alert','getItem','<span\x20id=\x22alert\x22>','userToDoAccess','location','div.image','none','display','inline-block','CORRECT','length','onload','\x20®\x20','¿No\x20es\x20tu\x20cuenta?','lista-tareas.html','262nlmZdf','https://ctd-todo-api.herokuapp.com/v1/users/login','userPhotoUrl','firstName','documentElement','103agxjFx','7qQHuCK','50%','style','addEventListener','https://res.cloudinary.com/juanrojasc/image/upload/','text','67871zbhRCi','button','362EIDRWT','SHOW','1111kqJIoC','space-between','value','block','height','https://ctd-todo-api.herokuapp.com/v1/users/getMe','split','opacity','input#password','clear','src','2394cKYYRt','userToDo','518328IRmqOr','querySelector'];function _0xa628(_0x1cec4f,_0x43ae61){return _0xa628=function(_0x975d21,_0xa628f7){_0x975d21=_0x975d21-0xf1;let _0x40f529=_0x975d[_0x975d21];return _0x40f529;},_0xa628(_0x1cec4f,_0x43ae61);}const _0x54784e=_0xa628;(function(_0xe09a5,_0x259153){const _0xc8b8f9=_0xa628;while(!![]){try{const _0x35997d=-parseInt(_0xc8b8f9(0x106))*-parseInt(_0xc8b8f9(0x114))+parseInt(_0xc8b8f9(0x112))*-parseInt(_0xc8b8f9(0x10c))+-parseInt(_0xc8b8f9(0x10b))*-parseInt(_0xc8b8f9(0x116))+-parseInt(_0xc8b8f9(0x128))+parseInt(_0xc8b8f9(0x12e))+parseInt(_0xc8b8f9(0x123))+-parseInt(_0xc8b8f9(0x121))*parseInt(_0xc8b8f9(0xf2));if(_0x35997d===_0x259153)break;else _0xe09a5['push'](_0xe09a5['shift']());}catch(_0x23c290){_0xe09a5['push'](_0xe09a5['shift']());}}}(_0x975d,0x69bd1));import{InputNameException,InputPasswordException,InputEmailException}from'./exceptions.js';import{signUpAPI,signInAPI,waitResponse,getTasks,createTask,deleteTask,getUserData}from'./callAPI.js';import{checkName,checkPassword,checkEmail,check,dataInvalid}from'./regex.js';window[_0x54784e(0x102)]=async function(_0x9d085b){const _0x550010=_0x54784e,_0x1eff78=_0x550010(0x110);let _0x1344ae=document[_0x550010(0x124)]('div#form'),_0x395ef7=document[_0x550010(0x124)]('div#form\x20form'),_0x533e12=document[_0x550010(0x124)]('div.form-header'),_0x19d1eb=document[_0x550010(0x124)](_0x550010(0xfc)),_0x170e1e=_0x19d1eb[_0x550010(0x124)]('img'),_0x153aa2=_0x395ef7['querySelector']('input#user'),_0x351a28=_0x395ef7[_0x550010(0x124)](_0x550010(0x11e)),_0x2c5665=document[_0x550010(0x124)]('i#eyeOn'),_0x1c78a2=document['querySelector'](_0x550010(0x12b)),_0x27c634=document[_0x550010(0x124)]('label#rememberme'),_0x271698=document[_0x550010(0x124)](_0x550010(0xf6)),_0x4a9460=document['querySelector'](_0x550010(0x113)),_0x8f3d19=_0x395ef7[_0x550010(0x124)]('a'),_0x169f26=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i[_0x550010(0x136)](navigator['userAgent'])?7.5:0.9,_0x4d54c2=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i[_0x550010(0x136)](navigator['userAgent'])?0x3e8:0x226,_0x1aae2d,_0x48769a='',_0x14b908=getComputedStyle(_0x1344ae)[_0x550010(0x11a)],_0x2ebc97=_0x1344ae['offsetHeight']*(0x64/document[_0x550010(0x10a)]['clientWidth']),_0xdc61e8={'email':localStorage[_0x550010(0xf8)]('userToDo'),'password':localStorage[_0x550010(0xf8)](_0x550010(0xfa)),'photo':localStorage[_0x550010(0xf8)](_0x550010(0x108))?decrypt(localStorage[_0x550010(0xf8)](_0x550010(0x108)))[_0x550010(0x11c)](_0x550010(0x103))[0x0]:'','token':localStorage['getItem'](_0x550010(0x127))},_0x5064f4=sessionStorage[_0x550010(0xf8)]('userToDoToken');if(_0xdc61e8[_0x550010(0xf3)]&&_0xdc61e8[_0x550010(0x13a)]){console['log'](decrypt(_0xdc61e8[_0x550010(0x12c)])),_0x1ad260(_0x550010(0x13b)),_0x19d1eb[_0x550010(0x10e)][_0x550010(0xfe)]=_0x550010(0x126),_0x170e1e['style'][_0x550010(0xfe)]='block',_0x5064f4=_0xdc61e8[_0x550010(0x12d)];let _0x42d681=await getUserData(_0x550010(0x11b),_0x5064f4);document[_0x550010(0x124)](_0x550010(0x133))[_0x550010(0xf4)]=_0x42d681[_0x550010(0x109)]+'\x20'+_0x42d681[_0x550010(0x125)],_0x4a9460[_0x550010(0x10e)]['display']=_0x550010(0x119),_0x4a9460[_0x550010(0x10e)][_0x550010(0x129)]='1vw',_0x8f3d19['style'][_0x550010(0x129)]='-0.75vw',_0x8f3d19[_0x550010(0x10e)][_0x550010(0xfe)]=_0x550010(0x119),_0x8f3d19[_0x550010(0xf4)]=_0x550010(0x104),_0x8f3d19[_0x550010(0xf5)](_0x550010(0x134),_0x550010(0x132)),_0x395ef7[_0x550010(0x10e)][_0x550010(0x139)]=_0x550010(0x117),_0x170e1e[_0x550010(0xf5)](_0x550010(0x120),_0xdc61e8['photo']?_0x1eff78+_0xdc61e8[_0x550010(0x12c)]:'/assets/profilePhotoDefault.png'),_0x170e1e[_0x550010(0x10e)][_0x550010(0x11d)]=_0xdc61e8[_0x550010(0x12c)]?'100%':_0x550010(0x10d),_0x153aa2[_0x550010(0x118)]=_0xdc61e8[_0x550010(0xf3)],_0x351a28[_0x550010(0x118)]=decrypt(_0xdc61e8[_0x550010(0x13a)]),_0x8f3d19['addEventListener']('click',function(_0x532792){const _0x76af8f=_0x550010;localStorage[_0x76af8f(0x11f)](),sessionStorage[_0x76af8f(0x11f)](),window[_0x76af8f(0xfb)][_0x76af8f(0x134)]='index.html';}),_0x170e1e[_0x550010(0x10f)]('click',function(_0x5c4c36){const _0x2526e6=_0x550010;_0x4a9460[_0x2526e6(0x12f)]();});}else _0x1ad260(_0x550010(0x115)),_0x153aa2[_0x550010(0x10e)]['display']='inline-block',_0x351a28[_0x550010(0x10e)][_0x550010(0xfe)]=_0x550010(0xff),_0x27c634[_0x550010(0x10e)][_0x550010(0xfe)]='flex',_0x271698[_0x550010(0x10e)]['display']='inline-block';_0x395ef7['addEventListener'](_0x550010(0x130),function(_0x2d4d7c){const _0x5e6f62=_0x550010;_0x2d4d7c['preventDefault']();let _0x1ff4d6=[];_0x153aa2=_0x395ef7[_0x5e6f62(0x124)]('input#user'),_0x351a28=_0x395ef7[_0x5e6f62(0x124)](_0x5e6f62(0x11e));check(checkEmail,_0x153aa2['value'])?(_0x1aae2d=check(checkEmail,_0x153aa2['value']),dataInvalid(_0x153aa2,_0x5e6f62(0x100),_0x169f26)):(_0x1ff4d6[_0x5e6f62(0x135)]({'id':'InputEmailException','description':'Email\x20Invalido'}),dataInvalid(_0x153aa2,_0x5e6f62(0x138),_0x169f26,_0x5e6f62(0x13c)));if(_0x1ff4d6[_0x5e6f62(0x101)]==0x0){let _0x56ccf6,_0x1daa72;async function _0x2dc6c1(){const _0x5e8496=_0x5e6f62;let _0x459a5c=await signInAPI(_0x5e8496(0x107),_0x1aae2d,decrypt(_0x48769a)?decrypt(_0x48769a):_0x351a28[_0x5e8496(0x118)]);_0x56ccf6=_0x459a5c[0x0],_0x1daa72=_0x459a5c[0x1];let _0x199b56=_0x1daa72['jwt'],_0x4c5654=document[_0x5e8496(0x124)](_0x5e8496(0xf7));_0x56ccf6>=0xc8&&_0x56ccf6<0x12c?(sessionStorage[_0x5e8496(0xf1)](_0x5e8496(0x127),_0x199b56),sessionStorage[_0x5e8496(0xf1)](_0x5e8496(0xfa),_0x48769a),_0x271698['checked']&&(localStorage[_0x5e8496(0xf1)](_0x5e8496(0x122),_0x1aae2d),localStorage[_0x5e8496(0xf1)]('userToDoAccess',_0x48769a),localStorage[_0x5e8496(0xf1)](_0x5e8496(0x127),_0x199b56)),_0x4c5654?_0x4c5654[_0x5e8496(0xf4)]='':'',window[_0x5e8496(0xfb)][_0x5e8496(0x134)]=_0x5e8496(0x105)):_0x4c5654?_0x4c5654[_0x5e8496(0xf4)]=''+_0x1daa72:_0x533e12[_0x5e8496(0x131)]+=_0x5e8496(0xf9)+_0x1daa72+'</span>';}_0x2dc6c1();}}),_0x351a28['addEventListener'](_0x550010(0x12a),function(_0xb7aff0){const _0x26149f=_0x550010;getComputedStyle(_0x2c5665)[_0x26149f(0xfe)]=='block'&&(_0x48769a=encrypt(_0x351a28[_0x26149f(0x118)],_0x351a28));}),_0x2c5665['addEventListener'](_0x550010(0x12f),function(_0x5eaf23){const _0x28737d=_0x550010;decrypt(_0x48769a,_0x351a28),_0x351a28[_0x28737d(0xf5)](_0x28737d(0x13d),_0x28737d(0x111)),_0x2c5665['style'][_0x28737d(0xfe)]=_0x28737d(0xfd),_0x1c78a2[_0x28737d(0x10e)][_0x28737d(0xfe)]='block';}),_0x1c78a2[_0x550010(0x10f)](_0x550010(0x12f),function(_0x17f5e0){const _0x52dd1b=_0x550010;_0x351a28[_0x52dd1b(0xf5)](_0x52dd1b(0x13d),'password'),_0x2c5665[_0x52dd1b(0x10e)][_0x52dd1b(0xfe)]=_0x52dd1b(0x119),_0x1c78a2[_0x52dd1b(0x10e)][_0x52dd1b(0xfe)]=_0x52dd1b(0xfd);});function _0x1ad260(_0x58e78d){const _0x58d9fb=_0x550010;function _0xe92e7d(_0x5cbe26,_0x22d926){const _0x4b87e8=_0xa628;for(let _0x280919=0x1;_0x280919<_0x5cbe26[_0x4b87e8(0x101)]-0x1;_0x280919+=0x2){if(_0x22d926==0x1&&_0x280919!=0x1)_0x5cbe26[_0x280919][_0x4b87e8(0x10e)][_0x4b87e8(0xfe)]=_0x4b87e8(0xfd);if(_0x22d926==0x2)_0x5cbe26[_0x280919][_0x4b87e8(0x10e)][_0x4b87e8(0xfe)]=_0x280919==0x1?'flex':_0x4b87e8(0x119);_0x22d926==0x3&&(_0x5cbe26[_0x280919][_0x4b87e8(0x10e)][_0x4b87e8(0xfe)]=_0x280919==0x1?_0x4b87e8(0x126):block);}}let _0x3e4844=_0x395ef7['childNodes'];if(_0x58e78d=='HIDE')_0xe92e7d(_0x3e4844,0x1),_0x395ef7['style'][_0x58d9fb(0x11a)]=_0x2ebc97+'vw';else{if(_0x58e78d==_0x58d9fb(0x115))_0xe92e7d(_0x3e4844,0x2);else _0x58e78d==_0x58d9fb(0x137)&&_0xe92e7d(_0x3e4844,0x3);}}};