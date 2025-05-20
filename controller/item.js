import { Item } from "../model/item.js";
import { ItemDB } from "../db/item.js";

let isEditingItem = false;
let editingItemId = null;

$(document).ready(() => {
    generateNextItemId();
    renderItemTable();

    // Handle item form submission
    $("#item-form").on("submit", function (e) {
        e.preventDefault();

        const id = $("#item-id").val();
        const name = $("#item-name").val().trim();
        const price = parseFloat($("#item-price").val());
        const qty = parseInt($("#item-qty").val());

        if (!name || isNaN(price) || isNaN(qty)) {
            Swal.fire({
                title: "Warning",
                text: "Please fill out all fields correctly.",
                icon: "warning",
                width: "300px",
            });
            return;
        }

        if (isEditingItem) {
            // Update existing item
            const index = ItemDB.findIndex(item => item.getItemId() === editingItemId);
            if (index !== -1) {
                ItemDB[index].setItemName(name);
                ItemDB[index].setItemPrice(price);
                ItemDB[index].setItemQty(qty);
            }
            isEditingItem = false;
            editingItemId = null;
        } else {
            // Save new item
            const newItem = new Item(id, name, price, qty);
            ItemDB.push(newItem);
        }

        console.log(ItemDB);

        clearItemFields();
        renderItemTable();
        generateNextItemId();
    });

    // Edit button handler
    $(document).on("click", ".btn-edit-item", function () {
        const row = $(this).closest("tr");
        const id = row.find("td:eq(0)").text();
        const name = row.find("td:eq(1)").text();
        const price = row.find("td:eq(2)").text();
        const qty = row.find("td:eq(3)").text();

        $("#item-id").val(id);
        $("#item-name").val(name);
        $("#item-price").val(price);
        $("#item-qty").val(qty);

        isEditingItem = true;
        editingItemId = id;
    });

    // Delete button handler
    $(document).on("click", ".btn-delete-item", function () {
        const id = $(this).closest("tr").find("td:eq(0)").text();
        const index = ItemDB.findIndex(item => item.getItemId() === id);
        if (index !== -1) {
            ItemDB.splice(index, 1);
            renderItemTable();
            generateNextItemId();
        }
    });
});

// Utility functions
function clearItemFields() {
    $("#item-name").val("");
    $("#item-price").val("");
    $("#item-qty").val("");
}

function renderItemTable() {
    $("#item_tBody").empty();
    ItemDB.forEach(item => {
        const row = `<tr>
            <td>${item.getItemId()}</td>
            <td>${item.getItemName()}</td>
            <td>${item.getItemPrice().toFixed(2)}</td>
            <td>${item.getItemQty()}</td>
            <td>
                <button class='btn btn-sm btn-warning btn-edit-item me-1'>Update</button>
                <button class='btn btn-sm btn-danger btn-delete-item'>Delete</button>
            </td>
        </tr>`;
        $("#item_tBody").append(row);
    });
}

function generateNextItemId() {
    if (ItemDB.length === 0) {
        $("#item-id").val("I001");
    } else {
        const lastId = ItemDB[ItemDB.length - 1].getItemId();
        const next = parseInt(lastId.substring(1)) + 1;
        $("#item-id").val("I" + String(next).padStart(3, '0'));
    }
}
