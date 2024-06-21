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
    
    insert(value, priority) {
        const newNode = { value, priority, next: null };

        if (!this.head || priority < this.head.priority) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next && priority >= current.next.priority) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
    }

    poll() {
        if (!this.head) return null;
        const value = this.head.value;
        this.head = this.head.next;
        return value;
    }

    isEmpty() {
        return this.head === null;
    }
}