import List from "../models/List.mjs";
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
        const stack = new List();
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
}