/**
 * Bubble Sort implementation specially designed for animation.
 * @param array array of values to sort
 */
export function bubbleSort(array: number[]): number[][] {
    const animations: number[][] = [];
    // array too short -> already sorted
    if (array.length <= 1) {
        return animations;
    }
    // TODO: Sort and define animations array

    // Perform bubble sort
    for (let i = 0; i < array.length; i++) {
        for (let j = i; j < array.length; j++) {
            // push comparisons to animations
            animations.push([i, j]);
            animations.push([i, j]);
            // array[i] <= array[j] -> no swap, so add swap of [i, array[i]] (no change)
            if (array[i] <= array[j]) {
                animations.push([i, array[i]]);
            }
            // array[i] > array[j] -> swap values, add swap [i, array[j]] to animations
            else {
                // first, add the animation of swapping
                animations.push([i, array[j]]);
                // swap the underlying values
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }

    return animations;
}