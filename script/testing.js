// this is a draft file to test functionalities of upcoming/ongoing algos

function runTest() {
    disableInput();
    var origin = getElements();
    var origin_copy = JSON.parse(JSON.stringify(origin));
    var solution = shell(origin_copy);
    if (solution) {
        try {
            animate(origin, solution);
            console.log(solution);
        } catch (e) {}
    }
}

function mergeSort(e) {
    if (e.length <= 1) {
        return e;
    }
    let elements = e;

    const mid = Math.floor(elements.length / 2),
        left = elements.slice(0, mid),
        right = elements.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
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


function bucket(e, order) {
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