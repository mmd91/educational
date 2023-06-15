///https://developer.salesforce.com/tools/vscode/en/user-guide/prettier

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
nums = [2,7,11,15];
target = 9;
var twoSum = function(nums, target) {
    for (let i=0; i<nums.length;i++){
        for(let j=i+1; j<nums.length; j++){
            if (nums[j] == target-nums[i]){
                return i,j;
            }
        }

    }
    return null;
    
};