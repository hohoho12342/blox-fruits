let cart = [];
let cartOpen = false;

function toggleCart() {
    const cartBox = document.getElementById("cart");
    cartOpen = !cartOpen;
    cartBox.classList.toggle("open", cartOpen);
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const list = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");
    const count = document.getElementById("cart-count");

    list.innerHTML = "";
    let sum = 0;

    cart.forEach((item, index) => {
        sum += item.price;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} — ${item.price} грн
            <button onclick="removeItem(${index})" style="float:right;background:red;color:white;border:none;padding:5px;border-radius:4px;">X</button>
        `;
        list.appendChild(li);
    });

    total.textContent = "Итого: " + sum + " грн";
    count.textContent = cart.length;
}

function removeItem(i) {
    cart.splice(i, 1);
    updateCart();
}

/* ------------------------------------
   ✨ ФОРМА ОФОРМЛЕНИЯ ЗАКАЗА
------------------------------------- */

function checkout() {
    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }

    let form = document.getElementById('checkout-form');

    form.classList.remove("close");
    form.classList.add("open");
    form.style.display = "block";
}

function closeCheckout() {
    let form = document.getElementById('checkout-form');

    form.classList.remove("open");
    form.classList.add("close");

    setTimeout(() => {
        form.style.display = "none";
    }, 250);
}

function submitOrder() {
    const name = document.getElementById('customer-name').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();

    if (!name || !address || !phone) {
        alert("❗ Пожалуйста заполните все поля!");
        return;
    }

    alert(
        "Спасибо за заказ!\n\n" +
        "Имя: " + name + "\n" +
        "Адрес: " + address + "\n" +
        "Телефон: " + phone + "\n\n" +
        "Ваш заказ принят!"
    );


    cart = [];
    updateCart();

    closeCheckout();
}