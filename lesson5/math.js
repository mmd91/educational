let o1 = {name:''};
console.log(o1); //{name:''}

mutateStr = function(param){
   param.name = 'injection';
}

mutateStr(o1);
console.log(o1);//{name:'injection'}
//************************************************************ */
let str = 'hello';
console.log(str);//'hello'

addS = function(x){
    x = 'injection failed';   
}

addS(str); 
console.log(str);//'hello'
