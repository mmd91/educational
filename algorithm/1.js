
//nums = [1,3,5,8,10,14,15,16,17,19,20,20,21];
//target = 8;


var search = function(nums, target) {
  
    let midArrIdx = Math.round(nums.length/2);//7
    let midArrayNumber = nums[midArrIdx];//14
    if (midArrayNumber==target){
       
        return midArrIdx;
    }else if (midArrayNumber<target){
        let newArray = subArray(nums,midArrIdx,nums.length);
       
        return search(newArray,target);         
    } else if (midArrayNumber>target){
        let newArray = subArray(nums,0,midArrIdx);
        
        return search(newArray,target); 
    }    
    
    return -1;
};

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
function subArray(array,startIdx,endIdx){
   return array.slice(startIdx, endIdx);
}

search([1,3,5,8,10,14,15,16,17,19,20,20,21],8);