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

    addEdge(start, end, weight = 1) {
        if (this.#map.has(start) && this.#map.has(end)) {
            const startIndex = this.#map.get(start);
            const endIndex = this.#map.get(end);
            this.#adjacencyMatrix[startIndex][endIndex] = weight;
            return true;
        }
        return false;
    }

    bfs(callback) {
        const queue = [];
        const visited = new Array(this.#adjacencyMatrix.length).fill(false);
        const entries = [...this.#map.entries()];
        const [startVertex] = entries[0];
        const startIndex = this.#map.get(startVertex);
        
        queue.push(startIndex);
        visited[startIndex] = true;
        
        while (queue.length > 0) {
            const currentIndex = queue.shift();
            const currentVertex = entries[currentIndex][0];
            callback(currentVertex);
            
            for (let i = 0; i < this.#adjacencyMatrix[currentIndex].length; i++) {
                if (this.#adjacencyMatrix[currentIndex][i] && !visited[i]) {
                    visited[i] = true;
                    queue.push(i);
                }
            }
        }
    }

    dfs(callback) {
        const stack = [];
        const visited = new Array(this.#adjacencyMatrix.length).fill(false);
        const entries = [...this.#map.entries()];
        const [startVertex] = entries[0];
        const startIndex = this.#map.get(startVertex);

        stack.push(startIndex);
        
        while (stack.length > 0) {
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

    getGraphRepresentation() {
        let representation = '';
        this.#map.forEach((index, vertex) => {
            representation += `${vertex}: `;
            this.#adjacencyMatrix[index].forEach((weight, adjIndex) => {
                if (weight !== undefined) {
                    const adjVertex = [...this.#map.keys()][adjIndex];
                    representation += `${adjVertex}(${weight}) `;
                }
            });
            representation += '\n';
        });
        return representation;
    }
}