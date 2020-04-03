export default class Heap {
  #data = [];
  #keyId = "";

  fixDown(i) {
    let j;
    let k = i;
    while (2 * k + 1 < this.#data.length) {
      j = 2 * k + 1;
      if (
        j !== this.#data.length - 1 &&
        this.#data[j + 1][this.#keyId] < this.#data[j][this.#keyId]
      ) {
        ++j;
      }
      if (this.#data[k][this.#keyId] <= this.#data[j][this.#keyId]) {
        break;
      }

      // Swap.
      const oldJ = this.#data[j];
      this.#data[j] = this.#data[k];
      this.#data[k] = oldJ;
      k = j;
    }
  }

  constructor(els, keyId) {
    this.#data = [...els];
    this.#keyId = keyId;

    for (let i = els.length - 1; i >= 0; --i) {
      this.fixDown(i);
    }
  }

  deleteMin() {
    if (!this.#data.length) return null;

    const removed = this.#data[0];
    this.#data[0] = this.#data[this.#data.length - 1];
    this.#data[this.#data.length - 1] = removed;
    this.#data = this.#data.slice(0, -1);
    this.fixDown(0);
    return removed;
  }

  getAll() {
    return this.#data;
  }
}
