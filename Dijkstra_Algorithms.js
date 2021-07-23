//jshint esversion: 6


class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    } 

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({node: vertex2, weight});
        this.adjacencyList[vertex2].push({node: vertex1, weight});
    }

    Dijkstra(start, end) {
        const node = new PriorityQueueGraph();
        const distances = {};
        const previous = {};
        let path = [];
        let smallest;

        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                node.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                node.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        while(node.values.length) {
            smallest = node.dequeue().value;
            if (smallest === end) {
                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    //calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        //update new smalles distance to neighbor
                        distances[nextNeighbor] = candidate;
                        //update previus - how we got to neighbor
                        previous[nextNeighbor] = smallest;
                        //enqueue in priority queue with new priority
                        node.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.values.length - 1;
        const element = this.values[index];
        while(index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.values[parentIndex];
            if (element.priority <= parent.priority) break;
                this.values[parentIndex] = element;
                this.values[index] = parent;
                index = parentIndex;
            
        }
    }

    dequeue() {
        const max = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return max;
    }

    sinkDown() {
        let index = 0;
        const length = this.values.length;
        const element = this.values[0];
        while(true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
            if (leftChildIndex < length) {
                leftChild = this.values[leftChildIndex];
                if (leftChild.priority > element.priority) {
                    swap = leftChildIndex;
                }
            }
            if  (rightChildIndex < length) {
                rightChild = this.values[rightChildIndex];
                if (
                (swap === null && rightChild.priority > element.priority) || 
                (swap !== null && rightChild.priority > leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) break;
            this.values[index] = this.values[swap];
            this.values[swap] = element;
            index = swap;
        }
    }
}

class Node {
    constructor(val, priority) {
      this.val = val;
      this.priority = priority;
   }
 }



var graphs = new WeightedGraph();

graphs.addVertex('A');
graphs.addVertex('B');
graphs.addVertex('C');
graphs.addVertex('D');
graphs.addVertex('E');
graphs.addVertex('F');

graphs.addEdge('A', 'B', 4);
graphs.addEdge('A', 'C', 2);
graphs.addEdge('B', 'E', 3);
graphs.addEdge('C', 'D', 2);
graphs.addEdge('C', 'F', 4);
graphs.addEdge('D', 'E', 3);
graphs.addEdge('D', 'F', 1);
graphs.addEdge('E', 'F', 1);

graphs.Dijkstra('A', 'E');