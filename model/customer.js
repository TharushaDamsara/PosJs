export class Customer {
    #id;
    #name;
    #tel;

    constructor(id, name, tel) {
        this.#id = id;
        this.#name = name;
        this.#tel = tel;
    }

    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getTel() {
        return this.#tel;
    }

    setTel(tel) {
        this.#tel = tel;
    }
}
