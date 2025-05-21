import { Item } from "/model/item.js";
import { ItemDB } from "/db/item.js";

let editMode = false;
let editItemId = null;

function generateItemId() {
    return "I" + String(ItemDB.length + 1).padStart(3, "0");
}

function clearItemForm() {
    $("#item-id").val("");
    $("#item-name").val("");
    $("#item-price").val("");
    $("#item-qty").val("");
    $("#item-form button[type='submit']").text("Add");
    editMode = false;
    editItemId = null;
}

function renderItemTable() {
    const tbody = $("#item_tBody");
    tbody.empty();

    ItemDB.forEach(item => {
        const row = `
            <tr>
                <td>${item.getItemId()}</td>
                <td>${item.getItemName()}</td>
                <td>${item.getItemPrice().toFixed(2)}</td>
                <td>${item.getItemQty()}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-item-btn" data-id="${item.getItemId()}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-item-btn" data-id="${item.getItemId()}">Delete</button>
                </td>
            </tr>`;
        tbody.append(row);
    });
}

function addItem(e) {
    e.preventDefault();

    const name = $("#item-name").val().trim();
    const price = parseFloat($("#item-price").val());
    const qty = parseInt($("#item-qty").val());

    if (!name || isNaN(price) || price <= 0 || isNaN(qty) || qty < 0) {
        alert("Please enter valid item details.");
        return;
    }

    if (editMode) {
        const item = ItemDB.find(i => i.getItemId() === editItemId);
        if (item) {
            item.setItemName(name);
            item.setItemPrice(price);
            item.setItemQty(qty);
        }
        clearItemForm();
        renderItemTable();
    } else {
        const id = generateItemId();
        const item = new Item(id, name, price, qty);
        ItemDB.push(item);
        clearItemForm();
        renderItemTable();
    }
}

function deleteItem(id) {
    const index = ItemDB.findIndex(i => i.getItemId() === id);
    if (index !== -1) {
        ItemDB.splice(index, 1);
        if(editMode && editItemId === id) clearItemForm();
        renderItemTable();
    }
}

function editItem(id) {
    const item = ItemDB.find(i => i.getItemId() === id);
    if (item) {
        $("#item-id").val(item.getItemId());
        $("#item-name").val(item.getItemName());
        $("#item-price").val(item.getItemPrice());
        $("#item-qty").val(item.getItemQty());
        $("#item-form button[type='submit']").text("Update");
        editMode = true;
        editItemId = id;
    }
}

$("#item-form").on("submit", addItem);

$("#item_tBody").on("click", ".delete-item-btn", function () {
    const id = $(this).data("id");
    deleteItem(id);
});

$("#item_tBody").on("click", ".edit-item-btn", function () {
    const id = $(this).data("id");
    editItem(id);
});

$(document).ready(() => {
    renderItemTable();
});

export {
    renderItemTable,
    addItem,
    editItem,
    deleteItem
};
