export class Item {
    #itemId;
    #itemName;
    #itemPrice;
    #itemQty;

    constructor(id, name, price, qty) {
        this.#itemId = id;
        this.#itemName = name;
        this.#itemPrice = price;
        this.#itemQty = qty;
    }

    getItemId() {
        return this.#itemId;
    }

    setItemId(val) {
        this.#itemId = val;
    }

    getItemName() {
        return this.#itemName;
    }

    setItemName(val) {
        this.#itemName = val;
    }

    getItemPrice() {
        return this.#itemPrice;
    }

    setItemPrice(val) {
        this.#itemPrice = val;
    }

    getItemQty() {
        return this.#itemQty;
    }

    setItemQty(val) {
        this.#itemQty = val;
    }
}
