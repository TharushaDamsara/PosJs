import { Order } from "/model/order.js";
import { OrderDB } from "/db/order.js";
import { CustomerDB } from "/db/customer.js";
import { ItemDB } from "/db/item.js";

let editIndex = -1; // tracks which order is being edited (-1 = no edit)

function populateSelects() {
    const customerSelect = $("#order-customer");
    const itemSelect = $("#order-item");

    customerSelect.empty().append(`<option disabled selected>Select Customer</option>`);
    itemSelect.empty().append(`<option disabled selected>Select Item</option>`);

    CustomerDB.forEach(customer => {
        customerSelect.append(
            $("<option>")
                .val(customer.getId())
                .text(customer.getName())
        );
    });

    ItemDB.forEach(item => {
        if (
            item.getItemQty() > 0 ||
            (editIndex >= 0 &&
                OrderDB[editIndex].getItem().getItemName() === item.getItemName())
        ) {
            itemSelect.append(
                $("<option>")
                    .val(item.getItemName())
                    .text(item.getItemName())
            );
        }
    });
}

function clearOrderForm() {
    $("#order-customer").val("");
    $("#order-item").val("");
    $("#order-qty").val("");
    editIndex = -1;
    $("#order-submit").text("Place Order");
}

function renderOrderTable() {
    const tbody = $("#order_tBody");
    tbody.empty();

    OrderDB.forEach((order, index) => {
        const total = order.getQty() * order.getItem().getItemPrice();
        const row = `
            <tr>
                <td>${order.getCustomer().getName()}</td>
                <td>${order.getItem().getItemName()}</td>
                <td>${order.getQty()}</td>
                <td>${total.toFixed(2)}</td>
                <td>
                    <button class="btn-edit" data-index="${index}">Update</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });

    $(".btn-edit").on("click", function () {
        const idx = parseInt($(this).data("index"));
        startEditOrder(idx);
    });
}

function startEditOrder(index) {
    const order = OrderDB[index];
    editIndex = index;

    $("#order-customer").val(order.getCustomer().getId());
    populateSelects(); // refresh dropdowns including selected item
    $("#order-item").val(order.getItem().getItemName());
    $("#order-qty").val(order.getQty());

    $("#order-submit").text("Update Order");
}

function placeOrder(e) {
    e.preventDefault();

    const customerId = $("#order-customer").val();
    const itemName = $("#order-item").val();
    const qty = parseInt($("#order-qty").val());

    if (!customerId || !itemName || isNaN(qty) || qty <= 0) {
        alert("Please fill all order details correctly.");
        return;
    }

    const customer = CustomerDB.find(c => c.getId() === customerId);
    const item = ItemDB.find(i => i.getItemName() === itemName);

    if (!customer || !item) {
        alert("Selected customer or item not found.");
        return;
    }

    if (editIndex === -1) {
        // New order
        if (item.getItemQty() < qty) {
            alert("Insufficient item quantity.");
            return;
        }
        item.setItemQty(item.getItemQty() - qty);
        const order = new Order(customer, item, qty);
        OrderDB.push(order);

        console.log("Order added:", order);
        console.log("Is Order object:", order instanceof Order);
    } else {
        // Updating existing order
        const oldOrder = OrderDB[editIndex];
        const oldItem = oldOrder.getItem();
        const oldQty = oldOrder.getQty();

        if (oldItem.getItemName() !== itemName) {
            // Item changed
            oldItem.setItemQty(oldItem.getItemQty() + oldQty);
            if (item.getItemQty() < qty) {
                alert("Insufficient quantity for selected item.");
                return;
            }
            item.setItemQty(item.getItemQty() - qty);
        } else {
            // Same item, adjust stock
            const diff = qty - oldQty;
            if (diff > 0 && item.getItemQty() < diff) {
                alert("Not enough quantity available.");
                return;
            }
            item.setItemQty(item.getItemQty() - diff);
        }

        oldOrder.setCustomer(customer);
        oldOrder.setItem(item);
        oldOrder.setQty(qty);

        editIndex = -1;
        $("#order-submit").text("Place Order");
    }

    clearOrderForm();
    populateSelects();
    renderOrderTable();
}

$("#order-form").on("submit", placeOrder);

$(document).ready(() => {
    populateSelects();
    renderOrderTable();
});

export {
    populateSelects,
    renderOrderTable,
    placeOrder
};
