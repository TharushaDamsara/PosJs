import { CustomerDB } from "../db/customer.js";
import { Customer } from "../model/customer.js";

let isEditing = false;

$(document).ready(() => {
    loadNextId();
    loadCustomerTable();

    $("#saveBtn").on("click", () => {
        const id = $("#cId").val();
        const name = $("#name").val();
        const tel = $("#tel").val();

        if (!id || !name || !tel) {
            Swal.fire({
                title: "Warning",
                text: "Please fill out all the fields",
                icon: "warning",
                width: '250px',
            });
            return;
        }

        if (isEditing) {
            const index = CustomerDB.findIndex(c => c.getId() === id);
            if (index !== -1) {
                CustomerDB[index].setName(name);
                CustomerDB[index].setTel(tel);
            }
            isEditing = false;
        } else {
            const customer = new Customer(id, name, tel);
            CustomerDB.push(customer);
        }

        clearCustomerFields();
        loadCustomerTable();
        loadNextId();
    });

    $(document).on("click", ".btn-edit", function () {
        const row = $(this).closest("tr");
        const id = row.find("td:eq(0)").text();
        const name = row.find("td:eq(1)").text();
        const tel = row.find("td:eq(2)").text();
        $("#cId").val(id);
        $("#name").val(name);
        $("#tel").val(tel);
        isEditing = true;
    });

    $(document).on("click", ".btn-delete", function () {
        const id = $(this).closest("tr").find("td:eq(0)").text();
        const index = CustomerDB.findIndex(c => c.getId() === id);
        if (index !== -1) {
            CustomerDB.splice(index, 1);
            loadCustomerTable();
            loadNextId();
        }
    });
});

function clearCustomerFields() {
    $("#name").val("");
    $("#tel").val("");
}

function loadCustomerTable() {
    $('#customer_tBody').empty();
    CustomerDB.forEach(customer => {
        const row = `
            <tr>
                <td>${customer.getId()}</td>
                <td>${customer.getName()}</td>
                <td>${customer.getTel()}</td>
                <td>
                    <button class="btn btn-sm btn-warning btn-edit">Update</button>
                    <button class="btn btn-sm btn-danger btn-delete">Delete</button>
                </td>
            </tr>
        `;
        $('#customer_tBody').append(row);
    });
}

function loadNextId() {
    if (!CustomerDB.length) {
        $("#cId").val("C001");
    } else {
        const lastId = CustomerDB[CustomerDB.length - 1].getId();
        const num = parseInt(lastId.slice(1)) + 1;
        $("#cId").val(`C${String(num).padStart(3, '0')}`);
    }
}