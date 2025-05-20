export class Order {
    constructor(orderId, customerName, itemName, quantity, total) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.itemName = itemName;
        this.quantity = quantity;
        this.total = total;
    }
}
