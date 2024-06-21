import Graph from "../models/Graph.mjs";
const graph = new Graph();
const outputElement = document.getElementById('traversal-output');

function addVertex() {
    const vertexInput = document.getElementById('vertex').value.trim(); 
    if (vertexInput) {
        const added = graph.addVertex(vertexInput);
        if (added) {
            document.getElementById('vertex').value = '';
        } else {
            alert(`'${vertexInput}' existe.`);
        }
    }
}

function addEdge() {
    const start = document.getElementById('start').value.trim();
    const end = document.getElementById('end').value.trim(); 
    const weight = parseInt(document.getElementById('weight').value, 10);
    if (start && end && !isNaN(weight)) {
        const added = graph.addEdge(start, end, weight);
        if (added) {
            document.getElementById('start').value = ''; 
            document.getElementById('end').value = ''; 
            document.getElementById('weight').value = ''; 
        } else {
            alert(`'${start}'  '${end}' Error.`);
        }
    }
}

function performBFS() {
    clearOutput(); 
    graph.bfs(vertex => {
        outputElement.innerText += `${vertex} `; 
    });
}

function performDFS() {
    clearOutput();
    graph.dfs(vertex => {
        outputElement.innerText += `${vertex} `;
    });
}

function performDijkstra() {
    clearOutput();
    const startVertex = prompt("Introduzca el vértice inicial:");
    const vertexD = startVertex;
    if (startVertex) {
        const distances = graph.dijkstra(startVertex);
        for (const [vertex, distance] of distances.entries()) {
            outputElement.innerText += `${vertexD} -> ${vertex}: ${distance}\n`;
        }
    }
}

function clearOutput() {
    outputElement.innerText = '';
}

window.addVertex = addVertex;
window.addEdge = addEdge;
window.performBFS = performBFS;
window.performDFS = performDFS;
window.performDijkstra = performDijkstra;