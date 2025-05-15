// Helper functions for localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Function to toggle loading state
function toggleLoading(show) {
    const loading = document.getElementById('loading');
    loading.classList.toggle('modal-hidden', !show);
}

// Customer Management Functions
function registerCustomer() {
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;

    if (!name || !email) {
        alert('Please fill in all fields');
        return;
    }

    const customers = getFromLocalStorage('customers');
    customers.push({ name, email });
    saveToLocalStorage('customers', customers);
    alert('Customer registered successfully');
}

function unregisterCustomer() {
    const email = document.getElementById('customer-email').value;
    if (!email) {
        alert('Please enter email to unregister');
        return;
    }

    const customers = getFromLocalStorage('customers');
    const updatedCustomers = customers.filter(c => c.email !== email);
    saveToLocalStorage('customers', updatedCustomers);
    alert('Customer unregistered');
}

function findCustomer() {
    const email = document.getElementById('customer-email').value;
    if (!email) {
        alert('Please enter email to find');
        return;
    }

    const customers = getFromLocalStorage('customers');
    const customer = customers.find(c => c.email === email);
    if (customer) {
        alert(`Found customer: ${customer.name} - ${customer.email}`);
    } else {
        alert('Customer not found');
    }
}

function updateCustomer() {
    const email = document.getElementById('customer-email').value;
    if (!email) {
        alert('Please enter email to update');
        return;
    }

    const customers = getFromLocalStorage('customers');
    const customer = customers.find(c => c.email === email);
    if (customer) {
        const newName = prompt('Enter new name', customer.name);
        const newEmail = prompt('Enter new email', customer.email);
        customer.name = newName;
        customer.email = newEmail;
        saveToLocalStorage('customers', customers);
        alert('Customer updated successfully');
    } else {
        alert('Customer not found');
    }
}

function getAllCustomers() {
    const customers = getFromLocalStorage('customers');
    if (customers.length > 0) {
        alert('All customers:\n' + customers.map(c => `${c.name} - ${c.email}`).join('\n'));
    } else {
        alert('No customers found');
    }
}

// Item Management Functions
function addItem() {
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);

    if (!name || isNaN(price)) {
        alert('Please provide valid item details');
        return;
    }

    const items = getFromLocalStorage('items');
    items.push({ name, price });
    saveToLocalStorage('items', items);
    alert('Item added');
}

function removeItem() {
    const name = document.getElementById('item-name').value;
    if (!name) {
        alert('Please enter item name to remove');
        return;
    }

    const items = getFromLocalStorage('items');
    const updatedItems = items.filter(i => i.name !== name);
    saveToLocalStorage('items', updatedItems);
    alert('Item removed');
}

function searchItem() {
    const name = document.getElementById('item-name').value;
    if (!name) {
        alert('Please enter item name to search');
        return;
    }

    const items = getFromLocalStorage('items');
    const item = items.find(i => i.name === name);
    if (item) {
        alert(`Item found: ${item.name} - $${item.price}`);
    } else {
        alert('Item not found');
    }
}

function updateItem() {
    const name = document.getElementById('item-name').value;
    if (!name) {
        alert('Please enter item name to update');
        return;
    }

    const items = getFromLocalStorage('items');
    const item = items.find(i => i.name === name);
    if (item) {
        const newName = prompt('Enter new item name', item.name);
        const newPrice = parseFloat(prompt('Enter new price', item.price));
        item.name = newName;
        item.price = newPrice;
        saveToLocalStorage('items', items);
        alert('Item updated');
    } else {
        alert('Item not found');
    }
}

function getAllItems() {
    const items = getFromLocalStorage('items');
    if (items.length > 0) {
        alert('All items:\n' + items.map(i => `${i.name} - $${i.price}`).join('\n'));
    } else {
        alert('No items found');
    }
}

// Order Management Functions
function saveOrder() {
    const customerEmail = document.getElementById('order-customer-email').value;
    const itemName = document.getElementById('order-item-name').value;
    const quantity = parseInt(document.getElementById('order-quantity').value);

    if (!customerEmail || !itemName || isNaN(quantity)) {
        alert('Please provide valid order details');
        return;
    }

    const items = getFromLocalStorage('items');
    const item = items.find(i => i.name === itemName);
    if (!item) {
        alert('Item not found');
        return;
    }

    const orders = getFromLocalStorage('orders');
    orders.push({ customerEmail, item, quantity });
    saveToLocalStorage('orders', orders);
    alert('Order saved');
}

function searchOrder() {
    const email = document.getElementById('order-customer-email').value;
    if (!email) {
        alert('Please enter customer email');
        return;
    }

    const orders = getFromLocalStorage('orders');
    const customerOrders = orders.filter(o => o.customerEmail === email);
    if (customerOrders.length > 0) {
        alert('Orders for ' + email + ':\n' + customerOrders.map(o => `${o.item.name} - Quantity: ${o.quantity}`).join('\n'));
    } else {
        alert('No orders found');
    }
}

function updateOrder() {
    const email = document.getElementById('order-customer-email').value;
    const orders = getFromLocalStorage('orders');
    const order = orders.find(o => o.customerEmail === email);
    if (order) {
        const newItemName = prompt('Enter new item name', order.item.name);
        const newQuantity = parseInt(prompt('Enter new quantity', order.quantity));
        order.item.name = newItemName;
        order.quantity = newQuantity;
        saveToLocalStorage('orders', orders);
        alert('Order updated');
    } else {
        alert('Order not found');
    }
}

function deleteOrder() {
    const email = document.getElementById('order-customer-email').value;
    const orders = getFromLocalStorage('orders');
    const updatedOrders = orders.filter(o => o.customerEmail !== email);
    saveToLocalStorage('orders', updatedOrders);
    alert('Order deleted');
}

function getAllOrders() {
    const orders = getFromLocalStorage('orders');
    if (orders.length > 0) {
        alert('All orders:\n' + orders.map(o => `${o.customerEmail}: ${o.item.name} - Quantity: ${o.quantity}`).join('\n'));
    } else {
        alert('No orders found');
    }
}

// Section switching logic
document.querySelectorAll('.nav-link').forEach(button => {
    button.addEventListener('click', function () {
        const sectionId = button.getAttribute('data-section');
        document.querySelectorAll('.spa-section').forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    });
});

// Initialize the page with the default section visible
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('customer-section').style.display = 'block';
});
