async function getProducts(){
    let resp = await fetch('https://products-dasw.onrender.com/api/products', {
        method: 'GET',
        headers: {
            "x-expediente": "744577",
            "x-auth": "admin"
        }
    })
    data =  await resp.json();
    sessionStorage.setItem('products', JSON.stringify(data));
    filterProducts();
}

function filterProducts(){
    let products = JSON.parse(sessionStorage.getItem('products'));
    let category = document.getElementById("cat").value;
    let min = Number(document.getElementById("min").value);
    let max = Number(document.getElementById("max").value);
    products = products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    products = products.filter(p => p.pricePerUnit>=min);
    if (max>0) products = products.filter(p => p.pricePerUnit<=max);
    //console.log(products);
    sessionStorage.setItem('products', JSON.stringify(products));
    loadTable();
}

async function loadTable(){
    let html = /*html*/ `<div
    class="table-responsive m-3"
>
<h2>Products</h2>
<table
    class="table table-hover"  style="text-align: center;"
>
    <thead class="table-primary">
        <tr>
            <th>UUID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Description</th>
            <th>Unit</th>
            <th>Category</th>
            <th></th>
        </tr>
    </thead>
    <tbody>`
    let products = JSON.parse(sessionStorage.getItem('products'));
    products.forEach(p=>{
        html+= /*html*/ `<tr>
        <td>${p.uuid}</td>
        <td>${p.name}</td>
        <td><img src="${p.imageUrl}" style="width: 100px;"></td>
        <td>${p.stock}</td>
        <td>${p.pricePerUnit}</td>
        <td>${p.description}</td>
        <td>${p.unit}</td>
        <td>${p.category}</td>
        <td><a
                class="btn btn-primary"
                href="#"
                role="button"
                onclick = "editProduct('${p.uuid}')"
                ><i class="bi bi-pencil-fill"></i>
            </a></td>
    </tr>`
    })
    html += `</tbody>
    </table>
</div>`
    document.querySelector("#admin").innerHTML = html;
}

function editProduct(uuid){ 
    let product = JSON.parse(sessionStorage.getItem('products')).find(p => p.uuid == uuid);
    let myModal = new bootstrap.Modal(modalId, {});
    document.querySelector("#productModal").innerHTML = "Update Product";
    for (key in product) if (key != "_id" && key != "uuid") document.getElementById(key).value = product[key];
    sessionStorage.setItem('product', JSON.stringify(product.uuid));
    myModal.show();
}

function addProduct(){ 
    let myModal = new bootstrap.Modal(modalId, {});
    document.querySelector("#productModal").innerHTML = "Add Product";
    sessionStorage.setItem('product', JSON.stringify(""));
    document.getElementById("name").value ="";
    document.getElementById("description").value ="";
    document.getElementById("pricePerUnit").value ="";
    document.getElementById("stock").value ="";
    document.getElementById("category").value ="";
    document.getElementById("imageUrl").value ="";
    document.getElementById("unit").value ="";
    myModal.show();
}

async function updateProduct(){
    console.log("add-upp");
    let body = {
        "name": document.getElementById("name").value,
        "description": document.getElementById("description").value,
        "pricePerUnit": Number(document.getElementById("pricePerUnit").value),
        "stock": Number(document.getElementById("stock").value),
        "category": document.getElementById("category").value,
        "imageUrl": document.getElementById("imageUrl").value,
        "unit": document.getElementById("unit").value
        }
    let uuid = JSON.parse(sessionStorage.getItem('product'));
    if (uuid!="") await fetch('https://products-dasw.onrender.com/api/products/'+uuid, {
        method: 'PUT',
        headers: {
            "x-expediente": "744577",
            "x-auth": "admin",
            "Content-Type": "application/json"
        },
        body : JSON.stringify(body)
    })
    else await fetch('https://products-dasw.onrender.com/api/products', {
        method: 'POST',
        headers: {
            "x-expediente": "744577",
            "x-auth": "admin",
            "Content-Type": "application/json"
        },
        body : JSON.stringify(body)
    })
    loadAdminPage();
}

async function loadAdminPage(){
    await getProducts();
    await loadTable();
}

loadAdminPage();