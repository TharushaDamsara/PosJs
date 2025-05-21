export class Order {
    constructor(customer, item, qty) {
        this.customer = customer;
        this.item = item;
        this.qty = qty;
    }

    getCustomer() {
        return this.customer;
    }

    getItem() {
        return this.item;
    }

    getQty() {
        return this.qty;
    }

    setCustomer(customer) {
        this.customer = customer;
    }

    setItem(item) {
        this.item = item;
    }

    setQty(qty) {
        this.qty = qty;
    }
}
