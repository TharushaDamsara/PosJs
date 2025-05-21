import { Customer } from "/model/customer.js";
import { CustomerDB } from "/db/customer.js";

let editMode = false;
let editCustomerId = null;

function generateCustomerId() {
    return "C" + String(CustomerDB.length + 1).padStart(3, "0");
}

function clearCustomerForm() {
    $("#cId").val("");
    $("#name").val("");
    $("#tel").val("");
    $("#saveCustomerBtn").text("Add");
    editMode = false;
    editCustomerId = null;
}

function renderCustomerTable() {
    const tbody = $("#customer_tBody");
    tbody.empty();

    CustomerDB.forEach(customer => {
        const row = `
            <tr>
                <td>${customer.getId()}</td>
                <td>${customer.getName()}</td>
                <td>${customer.getTel()}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-btn" data-id="${customer.getId()}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${customer.getId()}">Delete</button>
                </td>
            </tr>`;
        tbody.append(row);
    });
}

function addCustomer() {
    const name = $("#name").val().trim();
    const tel = $("#tel").val().trim();

    if (!name || !tel) {
        alert("Please enter all customer details.");
        return;
    }

    if (editMode) {
        // Update existing customer
        const customer = CustomerDB.find(c => c.getId() === editCustomerId);
        if (customer) {
            customer.setName(name);
            customer.setTel(tel);
        }
        clearCustomerForm();
        renderCustomerTable();
    } else {
        // Add new customer
        const id = generateCustomerId();
        const customer = new Customer(id, name, tel);
        CustomerDB.push(customer);
        clearCustomerForm();
        renderCustomerTable();
    }
}

function deleteCustomer(id) {
    const index = CustomerDB.findIndex(c => c.getId() === id);
    if (index !== -1) {
        CustomerDB.splice(index, 1);
        if(editMode && editCustomerId === id) clearCustomerForm();
        renderCustomerTable();
    }
}

function editCustomer(id) {
    const customer = CustomerDB.find(c => c.getId() === id);
    if (customer) {
        $("#cId").val(customer.getId());
        $("#name").val(customer.getName());
        $("#tel").val(customer.getTel());
        $("#saveCustomerBtn").text("Update");
        editMode = true;
        editCustomerId = id;
    }
}

$("#saveCustomerBtn").on("click", addCustomer);

$("#customer_tBody").on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    deleteCustomer(id);
});

$("#customer_tBody").on("click", ".edit-btn", function () {
    const id = $(this).data("id");
    editCustomer(id);
});

$(document).ready(() => {
    renderCustomerTable();
});

export {
    renderCustomerTable,
    addCustomer,
    editCustomer,
    deleteCustomer
};
