async function cartToHtmlDiv(){
    let user = JSON.parse(sessionStorage.getItem("user"));
    let resp = await fetch('https://products-dasw.onrender.com/api/cart', {
        method: 'GET',
        headers: {
            'x-expediente': '744577',
            "x-user": user
        }
    })
    let data = await resp.json();
    let t = data.cart;
    
    let html = `<div class="container mb-3">
    <div class="row" >
        <div class="col-lg-7">
            <div class="container mb-3"> `
    
    let html2 ="";
    let total = 0;

    t.forEach(p => {
        html += /*html*/ `<div class="d-flex border mb-3">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="flex-grow-1 ms-3">
                        <h5 class="mt-3">${p.product.name} &nbsp;<button type="button" class="btn btn-danger" onclick="deleteProduct('${p.uuid}', '${user}')">  <i class="bi bi-trash-fill"></i> </button></h5>
                        <p>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Quantity:</span>
                                <input type="number" class="form-control" min="1" max="${p.product.stock}" readonly value="${p.amount}" id="quantity${p.uuid}"/> 
                                <a
                                    id="edit${p.uuid}"
                                    class="btn btn-info"
                                    href="#"
                                    onclick="editQuantity('${p.uuid}')" 
                                    role="button"
                                    ><i class="bi bi-pencil-fill"></i></a
                                >
                                <a
                                    id="save${p.uuid}"
                                    class="btn btn-success hidden"
                                    href="#"
                                    onclick="saveChanges('${p.uuid}', '${user}')" 
                                    role="button"
                                    ><i class="bi bi-check-lg"></i></a
                                >
                                <a
                                    id="cancel${p.uuid}"
                                    class="btn btn-danger hidden"
                                    href="#"
                                    onclick="cartToHtmlDiv()" 
                                    role="button"
                                    ><i class="bi bi-x-lg"></i></a
                                >
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Price:</span>
                                <input type="number" class="form-control" readonly value="${p.product.pricePerUnit}"/> 
                                <span class="input-group-text">MXN</span>
                            </div>
                        </p>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <img class="rounded-circle d-block mx-auto img-fluid img-thumbnail" src="${p.product.imageUrl}" alt=""/>
                </div>
            </div>
        </div> `
        html2 += /*html*/ `<p><b>${p.product.name}:</b> ${p.amount} x ${p.product.pricePerUnit} MXN</p>`; 
        total += p.amount*p.product.pricePerUnit;
    })  
    
    html += /*html*/ `</div></div><div class="col-lg-1"></div><div class="col-lg-4">
    <div class="d-flex border mb-3">
        <div class="flex-grow-1 ms-3">
            <h5 class="mt-3">Total Purchase</h5>`

    html += html2;
    
    html += /*html*/ `<h5>Total: ${total} MXN</h5>
    <button type="button" class="btn btn-primary d-block mx-auto m-3 col-6" data-bs-toggle="modal" data-bs-target="#PaymentModal">  Pay </button>
    <button type="button" class="btn btn-primary btn-danger d-block mx-auto m-3 col-6"> Cancel </button>
    </div>
    </div>
    </div> 
    </div>             
    <a href="P01_orders.html"><button type="button" class="btn btn-outline-info d-block mx-auto col-6">  Your Previous Orders </button></a>
    </div>`

    document.querySelector("#cart").innerHTML = html;
}

function deleteProduct(uuid, user){
    console.log(uuid, user)
    swal({
        title: "Are you sure you want to delete the product from your cart?",
        icon: "warning",
        buttons: ["Cancel", "Yes"],
    })
    .then(async c => {
        if (c) {
            swal({
                title: "The product has been removed from your cart",
                icon: "success",
            })
            await fetch('https://products-dasw.onrender.com/api/cart/'+uuid, {
                method: 'DELETE',
                headers: {
                    'x-expediente': '744577',
                    "x-user": user
                }
            })
            cartToHtmlDiv();
        }
    })
}

function editQuantity(uuid){
    console.log(uuid);
    let input = document.getElementById("quantity" +uuid);
    input.removeAttribute("readonly");
    let hide = document.getElementById("edit" +uuid);
    hide.classList += " hidden";
    let show = document.getElementById("save" +uuid);
    show.classList.remove("hidden");
    show = document.getElementById("cancel" +uuid);
    show.classList.remove("hidden");
}

async function saveChanges(uuid, user){
    let amount = document.querySelector("#quantity"+uuid).value;
    await fetch('https://products-dasw.onrender.com/api/cart/'+uuid, {
        method: 'POST',
        headers: {
            'x-expediente': '744577',
            "x-user": user,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "amount": Number(amount)
        })
    })
    swal({
        title: "Product amount updated",
        icon: "success",
    })
    cartToHtmlDiv();
}

cartToHtmlDiv()