/* Stores various array sorting algorithms for the visualizer */

/**
 * Merge Sort implementation specially designed for animation.
 * @param array array of values to sort
 */
export function mergeSort(array: number[]): number[][] | number[] {
    const animations: number[][] = [];
    // array too short -> already sorted
    if (array.length <= 1) {
        return array;
    }
    // otherwise, make auxiliary array and call on bounds with mergesorthelper
    const auxArray: number[] = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray: number[],
    startIdx: number,
    endIdx: number,
    auxArray: number[],
    animations: number[][]
) {
    // Nothing to sort -> return
    if (startIdx === endIdx) return;
    // Otherwise, perform split and search
    const middleIdx: number = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations);
    // finally, perform merge and animations on array
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations);
}

function doMerge(
    mainArray: number[],
    startIdx: number,
    middleIdx: number,
    endIdx: number,
    auxArray: number[],
    animations: number[][]
) {
    let k: number = startIdx;
    let i: number = startIdx;
    let j: number = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]); // push comparison to change color
        animations.push([i, j]); // push comparison to revert color
        if (auxArray[i] <= auxArray[j]) {
            animations.push([k, auxArray[i]]); // push swap to overwrite height values
            mainArray[k++] = auxArray[i++];
        }
        else {
            animations.push([k, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }

    // animate swaps for values less than middleIdx
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }

    // animate swaps for values less than endIdx
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }

}