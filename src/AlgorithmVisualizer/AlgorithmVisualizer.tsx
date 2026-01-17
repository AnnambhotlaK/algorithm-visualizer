import React from "react";
import { mergeSort } from '../sortingAlgorithms/mergeSort';
import { bubbleSort } from '../sortingAlgorithms/bubbleSort';
import './AlgorithmVisualizer.css';

// This affects animation speed.
const ANIMATION_SPEED_MS = 1;

// This affects the number of bars in the array
const NUMBER_OF_ARRAY_BARS = 300;

// Stores active timeouts, or currently animating sorting processes.
// This is necessary for allowing the user to stop animations.
const activeTimeouts = new Set<number>();

// Define component interface
interface AlgorithmVisualizerState {
    // Visualizer requires current state of the array of data
    array: number[];
}

// Define the AlgorithmVisualizer component
export default class AlgorithmVisualizer extends React.Component<{}, AlgorithmVisualizerState> {

    // Basic Constructor
    constructor(props: any) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        // Generate a new array when the component mounts (app first loads)
        this.resetArray();
    }

    // Used to fill array with random integers in the given range
    // Used on component mounting
    resetArray() {
        const array: number[] = [];
        // Fill array with random values from 5 to 500
        for (let i: number = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array: array});
    }

    /* ALGORITHMS */

    bubbleSort() {
        const animations: number[][] = bubbleSort(this.state.array);
        // animations is empty -> array is sorted, return
        if (animations.length === 0) {
            return;
        }
        // otherwise -> visualize each comparison and swap
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            // i is a color change if we are on either of the comparisons (but never on a swap, since it's on indices 1 less than mult. of 3)
            const isColorChange: boolean = (i % 3 !== 2);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i] as number[];
                const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
                const barTwoStyle = (arrayBars[barTwoIdx] as HTMLElement).style;
                const color: string = i % 3 === 0 ? 'red' : 'pink';
                const id = setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
                activeTimeouts.add(id);
            }
            // not on color change -> on swap, so swap bars by swapping the heights.
            else {
                const id = setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i] as number[];
                    const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
                activeTimeouts.add(id);
            }
        }
    }

    quickSort() {
        //TODO: Implement
    }

    mergeSort() {
        const animations: number[][] = mergeSort(this.state.array);
        // animations is empty -> array is sorted, return
        if (animations.length === 0) {
            return;
        }
        // otherwise -> visualize each comparison and swap
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            // i is a color change if we are on either of the comparisons (but never on a swap, since it's on indices 1 less than mult. of 3)
            const isColorChange: boolean = (i % 3 !== 2);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i] as number[];
                const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
                const barTwoStyle = (arrayBars[barTwoIdx] as HTMLElement).style;
                const color: string = i % 3 === 0 ? 'red' : 'pink';
                const id = setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
                activeTimeouts.add(id);
            }
            // not on color change -> on swap, so swap bars by swapping the heights.
            else {
                const id = setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i] as number[];
                    const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
                activeTimeouts.add(id);
            }
        }
    }

    heapSort() {
        //TODO: Implement
    }

    testSortingAlgorithms() {
        //TODO: Implement on all algos
        // should generate many random arrays and run the sorting algorithm on each of them
    }

    // Immediately halt all sorting algorithms taking place
    stopAnimations() {
        // clear all timeouts
        activeTimeouts.forEach(id => clearTimeout(id));
        // empty activeTimeouts
        activeTimeouts.clear();
    }

    // Render visualizer component
    render() {
        // fetch array from this.state
        const {array} = this.state;

        return (
            <div className="array-container">
                {/* Generate Bars*/}
                {array.map((value: number, idx: number) => (
                    // array-bar is a single bar in the visualizer
                    // each is assigned a value from the array
                    // styled with height in px = value
                    <div 
                        className="array-bar"
                        key={idx}
                        style={{height: `${value}px`}}
                    >
                    </div>
                ))}
                {/* Generate New Array Button*/}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                {/* Algorithm Sort Buttons */}
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
                <button onClick={() => this.stopAnimations()}>Stop Animations</button>
            </div>
        );
    }

}

// Helper for resetArray()
// Generates random integer in given range (min and max inclusive)
function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Helper for sorting algorithms
// Decides if two arrays are exactly equal
function arraysAreEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i: number = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}