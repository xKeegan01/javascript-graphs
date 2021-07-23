//jshint esversion: 6

//naive version of priority queue
class PriorityQueueGraph {
    constructor() {
        this.values = [];
    }

    enqueue(value, priority) {
        this.values.push({value, priority});
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}