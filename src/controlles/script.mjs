import Graph from "../models/Graph.mjs";

const graph = new Graph();
const outputElement = document.getElementById('traversal-output');

function addVertex() {
    const vertexInput = document.getElementById('vertex').value.trim(); 
    if (vertexInput) {
        const added = graph.addVertex(vertexInput);
        if (added) {
            document.getElementById('vertex').value = '';
            updateGraphRepresentation();
        } else {
            alert(`El vértice '${vertexInput}' ya existe.`);
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
            document.getElementById('weight').value = '1'; 
            updateGraphRepresentation(); 
        } else {
            alert(`Los vértices '${start}' o '${end}' no se encontraron.`);
        }
    }
}

function updateGraphRepresentation() {
    const representation = graph.getGraphRepresentation(); 
    document.getElementById('graph-representation').innerText = representation; 
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

function clearOutput() {
    outputElement.innerText = '';
}
window.addVertex = addVertex;
window.addEdge = addEdge;
window.performBFS = performBFS;
window.performDFS = performDFS;
