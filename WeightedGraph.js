//jshint esversion: 6

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }


//create empty array for vertex
    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    } 

//add edges with weights
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({node: vertex2, weight});
        this.adjacencyList[vertex2].push({node: vertex1, weight});
    }
}

const graph = new WeightedGraph();