import React from "react";
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import type { Animation } from '../interfaces/Animation';
import './AlgorithmVisualizer.css';

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
        for (let i: number = 0; i < 280; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array: array});
    }

    /* ALGORITHMS */

    bubbleSort() {

    }

    quickSort() {
    
    }

    mergeSort() {
        const animations: (number[] | Animation[]) = sortingAlgorithms.mergeSort(this.state.array);
        // if animations stores numbers -> array is sorted, return now
        if (typeof animations[0] === 'number') {
            return;
        }
        else {
            const newAnimations: number[][] = [];
            // construct newAnimations as array of threes: comparison, comparison, swap for each animation
            // useful for animating properly later
            for (const animation of animations) {
                newAnimations.push((animation as Animation).comparison);
                newAnimations.push((animation as Animation).comparison);
                newAnimations.push((animation as Animation).swap);
            }
            for (let i = 0; i < newAnimations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                // i is a color change if we are on either of the comparisons (but never on a swap, since it's on indices 1 less than mult. of 3)
                const isColorChange: boolean = (i % 3 !== 2);
                if (isColorChange) {
                    const [barOneIdx, barTwoIdx] = newAnimations[i];
                    const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
                    const barTwoStyle = (arrayBars[barTwoIdx] as HTMLElement).style;
                    const color: string = i % 3 === 0 ? 'red' : 'pink';
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * 3);
                }
                // not on color change -> on swap, so swap bars by swapping the heights.
                else {
                    setTimeout(() => {
                        const [barOneIdx, newHeight] = newAnimations[i];
                        const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
                        barOneStyle.height = `${newHeight}px`;
                    }, i * 3);
                }
            }
        }
    }

    heapSort() {
        
    }

    testSortingAlgorithms() {
        //TODO: Implement on all algos
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