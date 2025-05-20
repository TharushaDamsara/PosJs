export class Item {
    #itemId;
    #itemName;
    #itemPrice;
    #itemQty;

    constructor(id, name, price, qty) {
        this._itemId = id;
        this._itemName = name;
        this._itemPrice = price;
        this._itemQty = qty;
    }

    getItemId() { return this._itemId; }
    setItemId(val) { this._itemId = val; }

    getItemName() { return this._itemName; }
    setItemName(val) { this._itemName = val; }

    getItemPrice() { return this._itemPrice; }
    setItemPrice(val) { this._itemPrice = val; }

    getItemQty() { return this._itemQty; }
    setItemQty(val) { this._itemQty = val; }

}
