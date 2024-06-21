import Linkedlist from "./Linkedlist.mjs";
export default class Graph {
    #adjacencyMatrix = [];
    #map = new Map();

    addVertex(vertex) {
        if (!this.#map.has(vertex)) {
            const index = this.#adjacencyMatrix.length;
            this.#map.set(vertex, index);
            this.#adjacencyMatrix.push([]);
            return true;
        }
        return false;
    }

    addEdge(start, end, weight) {
        if (this.#map.has(start) && this.#map.has(end)) {
            const startIndex = this.#map.get(start);
            const endIndex = this.#map.get(end);
            this.#adjacencyMatrix[startIndex][endIndex] = weight;
            return true;
        }
        return false;
    }

    bfs(callback){
        let queue = []
        let list = []
        const entries = [...structuredClone(this.#map)];
        for (let i=0; i < this.#adjacencyMatrix.length;i++)
            list[i] = false
        
        let [key] = entries[0]
        queue.push(key)
        
        while (queue.length > 0) {
            let val = queue.shift() 
            callback(val) 
            list[this.#map.get(val)] = true 
            for (let i=0;i<this.#adjacencyMatrix[this.#map.get(val)].length;i++) {
                if (this.#adjacencyMatrix[this.#map.get(val)][i]){
                    let [key] = entries[i]
                    if (!list[this.#map.get(key)] && !queue.includes(key)) 
                        queue.push(key) 
                }
            }
        }

    }

    dfs(callback) {
        const stack = new Linkedlist();
        const visited = {}; 
        const entries = [...this.#map.entries()];
        const [startVertex] = entries[0];
        const startIndex = this.#map.get(startVertex);
    
        stack.push(startIndex);
        
        while (!stack.isEmpty()) {
            const currentIndex = stack.pop();
            const currentVertex = entries[currentIndex][0];
            if (!visited[currentIndex]) { 
                visited[currentIndex] = true;
                callback(currentVertex);
                
                for (let i = this.#adjacencyMatrix[currentIndex].length - 1; i >= 0; i--) {
                    if (this.#adjacencyMatrix[currentIndex][i] && !visited[i]) {
                        stack.push(i);
                    }
                }
            }
        }
    }

    dijkstra(startVertex) {
        const n = this.#adjacencyMatrix.length;
        const D = new Map();
        const V = {};
        const L_ = new Linkedlist();

        for (const vertex of this.#map.keys()) {
            D.set(vertex, Infinity);
            V[vertex] = false;
        }
        D.set(startVertex, 0);
        L_.insert({ value: startVertex, priority: 0 });

        while (!L_.isEmpty()) {
            const { value: vertex, priority: distance } = L_.poll();

            if (!V[vertex]) {
                V[vertex] = true;

                const vertexIndex = this.#map.get(vertex);

                for (let i = 0; i < n; i++) {
                    if (this.#adjacencyMatrix[vertexIndex][i] !== null) {
                        const adjacentVertex = [...this.#map.keys()][i];
                        const weight = this.#adjacencyMatrix[vertexIndex][i];
                        const newDistance = distance + weight;

                        if (newDistance < D.get(adjacentVertex)) {
                            D.set(adjacentVertex, newDistance);
                            L_.insert({ value: adjacentVertex, priority: newDistance });
                        }
                    }
                }
            }
        }

        return D;
    }

    getMap(startVertex) {
        return this.dijkstra(startVertex);
    }
}