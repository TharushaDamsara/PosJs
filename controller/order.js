import { Order } from "/model/order.js";
import { OrderDB } from "/db/order.js";
import { CustomerDB } from "/db/customer.js";
import { ItemDB } from "/db/item.js";

function populateSelects() {
    $("#order-customer").empty();
    CustomerDB.forEach(c => {
        $("#order-customer").append(`<option>${c.getcName()}</option>`);
    });

    $("#order-item").empty();
    ItemDB.forEach(i => {
        $("#order-item").append(`<option>${i.getItemName()}</option>`);
    });
}

$(document).ready(populateSelects);

$("#order-form").on("submit", function (e) {
    e.preventDefault();
    const customer = $("#order-customer").val();
    const item = $("#order-item").val();
    const qty = parseInt($("#order-qty").val());

    const itemObj = ItemDB.find(i => i.getItemName() === item);
    if (!itemObj || qty > itemObj.getItemQty()) {
        Swal.fire({ title: "Error", text: "Insufficient stock or item not found", icon: "error" });
        return;
    }

    const total = qty * itemObj.getItemPrice();
    const orderId = generateOrderId();
    const order = new Order(orderId, customer, item, qty, total);
    OrderDB.push(order);

    itemObj.setItemQty(itemObj.getItemQty() - qty);
    renderOrderTable();
    renderItemTable();
    $("#order-form")[0].reset();
});

function renderOrderTable() {
    $("#order-list").empty();
    OrderDB.forEach(order => {
        const row = `<tr>
            <td>${order.customerName}</td>
            <td>${order.itemName}</td>
            <td>${order.quantity}</td>
            <td>${order.total.toFixed(2)}</td>
        </tr>`;
        $("#order-list").append(row);
    });
}

function generateOrderId() {
    return "O" + String(OrderDB.length + 1).padStart(3, '0');
}
