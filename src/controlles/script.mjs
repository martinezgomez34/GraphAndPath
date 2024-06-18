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
            alert(`'${vertexInput}' exists.`);
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

function performDistrap() {
    const start = document.getElementById('start').value.trim();
    const end = document.getElementById('end').value.trim();
    if (start && end) {
        const result = graph.distrap(start, end);
        if (typeof result === 'string') {
            outputElement.innerText = result;
        } else {
            outputElement.innerText = `${result.path.join(' -> ')} distance ${result.distance}`;
        }
    } else {
        alert('Error.');
    }
}

function clearOutput() {
    outputElement.innerText = '';
}
window.addVertex = addVertex;
window.addEdge = addEdge;
window.performBFS = performBFS;
window.performDFS = performDFS;
window.performDistrap = performDistrap;