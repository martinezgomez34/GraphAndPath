export default class List{
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

    isEmpty() {
        return this.head === null;
    }
}