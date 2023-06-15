/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var search = function (nums, target) {
  let left = 0;
  let right = nums.length;

  if (nums.length <= 2) {
    for (i = 0; i < nums.length; i++) {
      if (nums[i] == target) {
        return i;
      }
    }
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
