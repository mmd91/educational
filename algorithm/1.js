/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var search = function (nums, target) {
  let left = 0;
  let right = nums.length;

<<<<<<< HEAD
  if (nums.length <= 2) {
    for (i = 0; i < nums.length; i++) {
      if (nums[i] == target) {
        return i;
      }
    }
=======



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
    
>>>>>>> 50a68e8befcdbf62250d438c97dbdae76a664fa0
    return -1;
  }

  while (left < right) {
    let midArrIdx = Math.round((left + right) / 2); //індекс 3

    if (nums[midArrIdx] == target) {
      return midArrIdx;
    }

    if (midArrIdx == left || midArrIdx == right) {
      return -1;
    }

    if (nums[midArrIdx] < target) {
      left = midArrIdx;
    } else {
      right = midArrIdx;
    }
  }
  return -1;
};
