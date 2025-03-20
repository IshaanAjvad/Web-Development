document.getElementById("addProduct").addEventListener("click", () => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <input type="text" placeholder="Product Name" class="productName" required>
        <input type="number" placeholder="Quantity" class="productQuantity" required>
        <input type="number" placeholder="Unit Price" class="productPrice" required>
        <button type="button" class="removeProduct">Remove</button>
    `;
    document.getElementById("products").appendChild(productDiv);

    productDiv.querySelector(".removeProduct").addEventListener("click", () => {
        productDiv.remove();
    });
});

document.getElementById("billForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let buyerName = document.getElementById("buyerName").value;
    let buyerAddress = document.getElementById("buyerAddress").value;
    let buyerContact = document.getElementById("buyerContact").value;
    let buyerEmail = document.getElementById("buyerEmail").value;
    let paymentMethod = document.getElementById("paymentMethod").value;

    let products = [];
    document.querySelectorAll(".product").forEach((product) => {
        let name = product.querySelector(".productName").value;
        let quantity = parseInt(product.querySelector(".productQuantity").value);
        let price = parseFloat(product.querySelector(".productPrice").value);
        let total = quantity * price;
        products.push({ name, quantity, price, total });
    });

    let subtotal = products.reduce((sum, p) => sum + p.total, 0);

    let billHTML = `
        <h3>Bill Preview</h3>
        <p>Buyer: ${buyerName} | ${buyerAddress} | ${buyerContact} | ${buyerEmail}</p>
        <table border="1">
            <tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr>
            ${products.map(p => `<tr><td>${p.name}</td><td>${p.quantity}</td><td>${p.price}</td><td>${p.total}</td></tr>`).join("")}
        </table>
        <h4>Subtotal: ${subtotal}</h4>
        <p>Payment Method: ${paymentMethod}</p>
    `;
    document.getElementById("billPreview").innerHTML = billHTML;
});
