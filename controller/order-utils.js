import { CustomerDB } from "/db/customer.js";
import { ItemDB } from "/db/item.js";

export function populateSelects() {
    const customerSelect = $("#order-customer");
    const itemSelect = $("#order-item");

    customerSelect.empty().append(`<option disabled selected>Select Customer</option>`);
    itemSelect.empty().append(`<option disabled selected>Select Item</option>`);

    CustomerDB.forEach(customer => {
        const option = $("<option>")
            .val(customer.getId())
            .text(customer.getName());
        customerSelect.append(option);
    });

    ItemDB.forEach(item => {
        if (item.getItemQty() > 0) {
            const option = $("<option>")
                .val(item.getItemName())
                .text(item.getItemName());
            itemSelect.append(option);
        }
    });
}
