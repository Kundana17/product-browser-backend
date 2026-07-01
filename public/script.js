let cursorTime = null;
let cursorId = null;

async function loadProducts(reset = false) {

    if (reset) {
        cursorTime = null;
        cursorId = null;
    }

    const category =
        document.getElementById("category").value;

    let url = "/products?limit=20";

    if (category) {
        url += `&category=${category}`;
    }

    if (cursorTime && cursorId) {
        url +=
            `&cursorTime=${encodeURIComponent(cursorTime)}&cursorId=${cursorId}`;
    }

    const response = await fetch(url);

    const data = await response.json();

    const container =
        document.getElementById("products");

    container.innerHTML = "";

    data.products.forEach(product => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p><b>ID:</b> ${product.id}</p>
            <p><b>Category:</b> ${product.category}</p>
            <p><b>Price:</b> ₹${product.price}</p>
            <p><b>Updated:</b> ${new Date(product.updated_at)
                .toLocaleString()}</p>
        `;

        container.appendChild(card);
    });

    if (data.nextCursor) {

        cursorTime =
            data.nextCursor.updated_at;

        cursorId =
            data.nextCursor.id;
    }
}

document
    .getElementById("nextBtn")
    .addEventListener("click", () => {
        loadProducts(false);
    });

loadProducts(true);