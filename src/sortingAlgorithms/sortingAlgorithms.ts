/* Stores various array sorting algorithms for the visualizer */
export const mergeSort = (array: number[]) => {
    // Merge Sort Algorithm Implementation
    // base case: array is of length 1 or less -> return array
    if (array.length === 1) {
        return array;
    }

    // otherwise, divide the array into halves
    let middleIdx: number = Math.floor(array.length / 2);
    let leftHalf: number[] = array.slice(0, middleIdx);
    let rightHalf: number[] = array.slice(middleIdx);

    // sort each half
    let sortedLeft: number[] = mergeSort(leftHalf);
    let sortedRight: number[] = mergeSort(rightHalf);

    // merge the halves and return
    return merge(sortedLeft, sortedRight);
}

const merge = (sortedLeft: number[], sortedRight: number[]) => {
    let mergedArray: number[] = [];
    let l: number = 0;
    let r: number = 0;

    while (l < sortedLeft.length && r < sortedRight.length) {
        // compare values from left and right
        if (sortedLeft[l] < sortedRight[r]) {
            mergedArray.push(sortedLeft[l]);
            l++;
        }
        else {
            mergedArray.push(sortedRight[r]);
            r++;
        }
    }
    while (l < sortedLeft.length) {
        mergedArray.push(sortedLeft[l]);
        l++;
    }
    while (r < sortedRight.length) {
        mergedArray.push(sortedRight[r]);
        r++;
    }
    return mergedArray;
}