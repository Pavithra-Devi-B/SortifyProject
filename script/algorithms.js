class Frame {
    constructor(e, h) {
        this.elements = [];
        this.highlights = [];
        this.information = "";

        if (e != undefined && e.length) {
            this.elements = e;
        }

        if (h != undefined && h.length) {
            this.highlights = h;
        }
    }

    addHighlights(highlights) {
        for (const e of highlights) {
            this.highlights.push(e);
        }
    }

    addElements(elements) {
        for (const e of elements) {
            this.elements.push(e);
        }
    }
}

class Animation {
    constructor() {
        this.frames = [];
    }

    addFrame(frame) {
        const temp = JSON.parse(JSON.stringify(frame)); // Only store a copy
        this.frames.push(temp);
    }

    getFrames() {
        return this.frames;
    }
}

class Algorithms {
    static bubble(e, order) {
        let elements = e;
        let solution = new Animation();
        let swapped = false;

        for (let i = 0; i < elements.length; ++i) {
            swapped = false;
            for (let j = 0; j < elements.length - 1; ++j) {
                solution.addFrame(new Frame([], [j, j + 1]));

                if (order == "desc" ? elements[j] < elements[j + 1] : elements[j] > elements[j + 1]) {
                    swapped = true;

                    const temp = elements[j];
                    elements[j] = elements[j + 1];
                    elements[j + 1] = temp;

                    solution.addFrame(new Frame([j, j + 1], [j, j + 1]));
                }
            }

            if (!swapped) {
                break;
            }
        }
        return solution;
    }

    static comb(e, order) {
        const n = e.length;
        let gap = n;
        let swapped = true;
        let solution = new Animation();

        while (1 != gap || true == swapped) {
            gap = getNextGap(gap);
            swapped = false;

            for (let i = 0; i < n - gap; ++i) {
                solution.addFrame(new Frame([], [i, i + gap]));

                if (order == "desc" ? e[i] < e[gap + i] : e[i] > e[gap + i]) {
                    swapped = true;

                    const temp = e[i];
                    e[i] = e[gap + i];
                    e[i + gap] = temp;

                    solution.addFrame(new Frame([i, i + gap], [i, i + gap]));
                }
            }
        }

        function getNextGap(gap) {
            const local_gap = Math.floor((gap * 10) / 13);
            if (local_gap < 1) {
                return 1;
            }

            return local_gap;
        }

        return solution;
    }
    
    static merge(e, order) {
        if (e.length <= 1) {
            return e;
        }
        let elements = e;
    
        const mid = Math.floor(elements.length / 2),
            left = elements.slice(0, mid),
            right = elements.slice(mid);
    
        return mergeSort(merge(left), merge(right));
       }
    
        static mergeSort(left, right) {
        let solution = new Array(),
            li = 0,
            ri = 0;
    
        while (li < left.length && ri < right.length) {
            if (left[li] > right[ri]) {
                solution.push(left[li]);
                ++li;
    
                continue;
            }
    
            solution.push(right[ri]);
            ++ri;
        }
    
    return solution.concat(left.slice(li)).concat(right.slice(ri));
    }
//     static mergeSort(e, order) {
//         let elements = e;
//         let solution = new Animation();
      
//         mergeSortRecursive(elements, order, 0, elements.length - 1, solution);
      
//         return solution;
//       }
      
//       static mergeSortRecursive(elements, order, start, end, solution) {
//         if (start < end) {
//           const mid = Math.floor((start + end) / 2);
      
//           mergeSortRecursive(elements, order, start, mid, solution);
//           mergeSortRecursive(elements, order, mid + 1, end, solution);
      
//           merge(elements, order, start, mid, end, solution);
//         }
//       }
      
//       static merge(elements, order, start, mid, end, solution) {
//         const left = elements.slice(start, mid + 1);
//         const right = elements.slice(mid + 1, end + 1);
//         let i = 0;
//         let j = 0;
//         let k = start;
      
//         while (i < left.length && j < right.length) {
//           const leftIndex = start + i;
//           const rightIndex = mid + 1 + j;
      
//           solution.addFrame(new Frame([leftIndex, rightIndex], []));
      
//           if ((order === "desc" && left[i] >= right[j]) || (order === "asc" && left[i] <= right[j])) {
//             elements[k] = left[i];
//             i++;
//           } else {
//             elements[k] = right[j];
//             j++;
//           }
      
//           k++;
//         }
      
//         while (i < left.length) {
//           elements[k] = left[i];
//           i++;
//           k++;
//         }
      
//         while (j < right.length) {
//           elements[k] = right[j];
//           j++;
//           k++;
//         }

//      for (let x = start; x <= end; x++) {
//         solution.addFrame(new Frame([], [x]));
//      }
// }
    

    static insertion(e, order) {
        let elements = e;
        let solution = new Animation();

        for (let i = 1; i < elements.length; ++i) {
            let key = elements[i];
            let j = i - 1;

            solution.addFrame(new Frame([], [j, j + 1]));

            while (j >= 0 && (order == "desc" ? elements[j] < key : elements[j] > key)) {
                solution.addFrame(new Frame([], [j, j + 1]));
                elements[j + 1] = elements[j];
                solution.addFrame(new Frame([j, j + 1], [j, j + 1]));

                j = j - 1;
            }
            elements[j + 1] = key;
        }

        return solution;
    }
    static bucket(e, order) {
        let elements = e;
        let n = elements.length;
        let solution = new Animation();
    
        // Create buckets
        const numBuckets = Math.ceil(Math.sqrt(n));
        const minVal = Math.min(...elements);
        const maxVal = Math.max(...elements);
        const bucketRange = (maxVal - minVal + 1) / numBuckets;
    
        const buckets = Array.from({ length: numBuckets }, () => []);
    
        // Distribute elements into buckets
        for (let i = 0; i < n; ++i) {
          const bucketIndex = Math.floor((elements[i] - minVal) / bucketRange);
          buckets[bucketIndex].push(elements[i]);
          solution.addFrame(new Frame([], [i]));
          solution.addFrame(new Frame([], [i]));
        }
    
        // Sort each bucket
        let sortingAlgorithm = Algorithms.insertion; // Choose the sorting algorithm for sorting the buckets
    
        for (let i = 0; i < numBuckets; ++i) {
          const bucketStart = i * bucketRange;
          const sortedBucket = sortingAlgorithm(buckets[i], order);
    
          const bucketFrames = sortedBucket.getFrames();
    
          for (const frame of bucketFrames) {
            const elements = frame.elements.map((el) => el + bucketStart);
            const highlights = frame.highlights.map((hl) => hl + bucketStart);
            const newFrame = new Frame(elements, highlights);
            solution.addFrame(newFrame);
          }
        }
    // Concatenate sorted buckets into a single array
        let index = 0;
        for (let i = 0; i < numBuckets; ++i) {
          for (const element of buckets[i]) {
            elements[index++] = element;
    
            solution.addFrame(new Frame([], [index]));
          }
        }
    
        return solution;
    }
    // static bucket(e, order) {
    //     let elements = e;
    //     let solution = new Animation();
    
    //     const n = elements.length;
    //     const minVal = Math.min(...elements);
    //     const maxVal = Math.max(...elements);
    //     const bucketCount = Math.ceil((maxVal - minVal + 1) / n);
    //     const buckets = Array.from({ length: bucketCount }, () => []);
    
    //     for (let i = 0; i < n; i++) {
    //       const bucketIndex = Math.floor((elements[i] - minVal) / bucketCount);
    //       buckets[bucketIndex].push(elements[i]);
    //     }
    
    //     let index = 0;
    //     for (let i = 0; i < bucketCount; i++) {
    //       insertionSort(buckets[i], order,solution);
    //       for (const element of buckets[i]) {
    //         solution.addFrame(new Frame([index], [elements.indexOf(element)]));
    //         elements[index++] = element;
    //       }
    //     }
    
    //     return solution;
    // }
    // static insertionSort(arr, order, solution) {
    //     for (let i = 1; i < arr.length; ++i) {
    //       let key = arr[i];
    //       let j = i - 1;
      
    //       solution.addFrame(new Frame([], [arr.indexOf(key), arr.indexOf(arr[j])]));
      
    //       while (j >= 0 && (order == "desc" ? arr[j] < key : arr[j] > key)) {
    //         solution.addFrame(new Frame([], [arr.indexOf(key), arr.indexOf(arr[j])]));
    //         arr[j + 1] = arr[j];
    //         solution.addFrame(new Frame([arr.indexOf(arr[j]), arr.indexOf(key)], [arr.indexOf(key), arr.indexOf(arr[j])]));
      
    //         j = j - 1;
    //       }
    //       arr[j + 1] = key;
    //     }
    //   }

    static selection(e, order) {
        let elements = e;
        let solution = new Animation();

        for (let i = 0; i < elements.length - 1; ++i) {
            let current = i;

            solution.addFrame(new Frame([], [i, current]));

            let j = 0;
            for (j = i + 1; j < elements.length; ++j) {
                solution.addFrame(new Frame([], [i, j, current]));

                if (order == "desc" ? elements[j] > elements[current] : elements[j] < elements[current]) {
                    current = j;
                }
            }

            const temp = elements[current];
            elements[current] = elements[i];
            elements[i] = temp;

            solution.addFrame(new Frame([i, current], [j, current]));
        }

        return solution;
    }

    static shell(e, order) {
        let elements = e;
        const n = e.length;
        let solution = new Animation();

        for (let gap = parseInt(n / 2); gap > 0; gap = parseInt(gap / 2)) {
            for (let i = gap; i < n; ++i) {
                const temp = elements[i];
                let j;

                if (!isNaN(j - gap)) {
                    solution.addFrame(new Frame([], [i, j - gap]));
                }

                for (j = i; j >= gap && (order == "desc" ? elements[j - gap] < temp : elements[j - gap] > temp); j -= gap) {
                    solution.addFrame(new Frame([j, j - gap], [i, j - gap]));
                    elements[j] = elements[j - gap];
                    solution.addFrame(new Frame([], [j, j - gap]));
                }

                solution.addFrame(new Frame([], [j, i]));
                elements[j] = temp;
                solution.addFrame(new Frame([], [j, i]));
            }
        }

        return solution;
    }

    static heap(e, order) {
        let elements = e;
        const n = e.length;
        let solution = new Animation();

        for (let i = parseInt(n / 2) - 1; i >= 0; --i) {
            heapify(elements, n, i, solution, order);
        }

        for (let i = n - 1; i >= 0; --i) {
            const temp = elements[0];
            elements[0] = elements[i];
            elements[i] = temp;

            solution.addFrame(new Frame([0, i], [0, i]));

            heapify(elements, i, 0, solution, order);
        }

        function heapify(elements, n, i, solution, order) {
            let current = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n && (order == "asc" ? elements[left] > elements[current] : elements[left] < elements[current])) {
                current = left;
            }

            if (right < n && (order == "asc" ? elements[right] > elements[current] : elements[right] < elements[current])) {
                current = right;
            }

            solution.addFrame(new Frame([], [current, i]));

            if (current != i) {
                const temp = elements[i];
                elements[i] = elements[current];
                elements[current] = temp;
                solution.addFrame(new Frame([current, i], [current, i]));

                heapify(elements, n, current, solution, order);
            }
        }

        return solution;
    }
}
