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
    distrap(start, end) {
        const distances = new Map();
        const visited = new Map();
        const previous = new Map();

        const startIndex = this.#map.get(start);
        const endIndex = this.#map.get(end);

        this.#map.forEach((value, key) => {
            distances.set(value, Infinity);
            visited.set(value, false);
            previous.set(value, null);
        });

        distances.set(startIndex, 0);

        for (let i = 0; i < this.#adjacencyMatrix.length; i++) {
            const u = this.#minDistance(distances, visited);
            if (u === null) break;
            visited.set(u, true);

            for (let v = 0; v < this.#adjacencyMatrix[u].length; v++) {
                if (!visited.get(v) && this.#adjacencyMatrix[u][v] && distances.get(u) + this.#adjacencyMatrix[u][v] < distances.get(v)) {
                    distances.set(v, distances.get(u) + this.#adjacencyMatrix[u][v]);
                    previous.set(v, u);
                }
            }
        }

        const path = new Linkedlist();
        for (let at = endIndex; at !== null; at = previous.get(at)) {
            path.pushFront([...this.#map].find(([key, value]) => value === at)[0]);
        }

        if (distances.get(endIndex) === Infinity) {
            return `No path from ${start} to ${end}`;
        } else {
            return {
                distance: distances.get(endIndex),
                path: path.getElements(), 
            };
        }
    }

    #minDistance(distances, visited) {
        let min = Infinity;
        let minIndex = null;

        distances.forEach((value, key) => {
            if (!visited.get(key) && value < min) {
                min = value;
                minIndex = key;
            }
        });

        return minIndex;
    }
}