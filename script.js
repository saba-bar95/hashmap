class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.hashmap = new Array(3);
    this.numItems = 0;
  }

  hash(key, tableSize) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % tableSize;
    }
    return hashCode;
  }

  resize() {
    const loadFactor = this.numItems / this.hashmap.length;
    if (loadFactor < 0.75) return;
    const newArr = new Array(this.hashmap.length * 2);
    this.hashmap.forEach((el) => {
      if (!el) return;
      let currentNode = el;
      while (currentNode) {
        const hashCode = this.hash(currentNode.key, newArr.length);
        if (newArr[hashCode]) {
          let curr = newArr[hashCode];
          while (curr.next !== null) {
            curr = curr.next;
          }
          curr.next = new Node(currentNode.key, currentNode.value);
        } else {
          newArr[hashCode] = new Node(currentNode.key, currentNode.value);
        }
        currentNode = currentNode.next;
      }
      this.hashmap = newArr;
    });
  }

  set(key, value) {
    const hashCode = this.hash(key, this.hashmap.length);
    if (!this.hashmap[hashCode]) {
      this.hashmap[hashCode] = new Node(key, value);
      this.numItems++;
      this.resize();
      return;
    }
    if (this.hashmap[hashCode] && this.hashmap[hashCode].key !== key) {
      let currentNode = this.hashmap[hashCode];
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
        if (currentNode.key === key) {
          currentNode.value = value;
          return;
        }
      }
      currentNode.next = new Node(key, value);
      this.numItems++;
      this.resize();
      return;
    }
    if (this.hashmap[hashCode].key === key) {
      this.hashmap[hashCode].value = value;
      return;
    }
  }

  get(key) {
    const hashCode = this.hash(key, this.hashmap.length);
    if (!this.hashmap[hashCode]) return null;
    if (this.hashmap[hashCode].key === key) {
      return this.hashmap[hashCode].value;
    } else {
      let currentNode = this.hashmap[hashCode];
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
        if (currentNode.key === key) return currentNode.value;
      }
      return null;
    }
  }

  has(key) {
    const hashCode = this.hash(key, this.hashmap.length);
    if (this.hashmap[hashCode]) return true;
    return false;
  }

  length() {
    return this.numItems;
  }

  clear() {
    this.numItems = 0;
    return this.hashmap.fill(null);
  }

  keys() {
    const keysArr = [];
    this.hashmap.forEach((el) => {
      if (el !== null) {
        keysArr.push(el.key);
        let currentNode = el;
        while (currentNode.next !== null) {
          currentNode = currentNode.next;
          keysArr.push(currentNode.key);
        }
      }
    });
    return keysArr;
  }

  values() {
    const valuesArr = [];
    this.hashmap.forEach((el) => {
      if (el !== null) {
        valuesArr.push(el.value);
        let currentNode = el;
        while (currentNode.next !== null) {
          currentNode = currentNode.next;
          valuesArr.push(currentNode.value);
        }
      }
    });
    return valuesArr;
  }

  entries() {
    const entriesArr = [];
    this.hashmap.forEach((el) => {
      if (el !== null) {
        entriesArr.push([el.key, el.value]);
        let currentNode = el;
        while (currentNode.next !== null) {
          currentNode = currentNode.next;
          entriesArr.push([currentNode.key, currentNode.value]);
        }
      }
    });
    return entriesArr;
  }

  remove(key) {
    const hashCode = this.hash(key, this.hashmap.length);
    if (!this.hashmap[hashCode]) return;
    if (this.hashmap[hashCode].key === key) {
      this.hashmap[hashCode] = this.hashmap[hashCode].next;
      this.numItems--;
      return;
    }
    if (this.hashmap[hashCode].key !== key) {
      let currentNode = this.hashmap[hashCode];
      let previousNode;
      while (currentNode.next !== null) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        if (currentNode.key === key) {
          previousNode.next = currentNode.next;
          this.numItems--;
          return;
        }
      }
      if (currentNode.key !== key) return;
    }
    this.hashmap[hashCode] = undefined;
    this.numItems--;
  }
}
const hashmap = new HashMap();
