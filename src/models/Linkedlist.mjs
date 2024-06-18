export default class Linkedlist{
    constructor() {
        this.head = null;
        this.tail = null;
    }

    push(value) {
        const newNode = { value, next: null };
        if (this.tail) {
            this.tail.next = newNode;
        } else {
            this.head = newNode;
        }
        this.tail = newNode;
    }

    pop() {
        if (!this.head) return null;
        if (this.head === this.tail) {
            const value = this.head.value;
            this.head = this.tail = null;
            return value;
        }
        let current = this.head;
        while (current.next && current.next !== this.tail) {
            current = current.next;
        }
        const value = this.tail.value;
        this.tail = current;
        this.tail.next = null;
        return value;
    }
    
    pushFront(value) {
        const newNode = { value, next: this.head };
        if (!this.head) {
            this.tail = newNode;
        }
        this.head = newNode;
    }
    
    getElements() {
        const elements = [];
        let current = this.head;
        while (current) {
            elements.push(current.value);
            current = current.next;
        }
        return elements;
    }

    isEmpty() {
        return this.head === null;
    }
}