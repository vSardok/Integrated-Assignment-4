async function getProducts(){
    let filter = JSON.parse(sessionStorage.getItem('category'));
    //console.log(filter);
    let resp = await fetch('https://products-dasw.onrender.com/api/products', {
        method: 'GET',
        headers: {
            "x-expediente": "744577",
            "x-auth": "admin"
        }
    })
    data =  await resp.json();
    sessionStorage.setItem('products', JSON.stringify(data));
    filterProducts(filter);
    loadPagination();
}

function toHtmlDiv(obj, hideProps) {
    let html=`<div class="col-lg-3 col-md-4 col-sm-6 mt-3">\n\t<div class="card text-start">\n`;
    if(hideProps == undefined || hideProps.length == 0){
        html+=`\t\t<img class="card-img-top" src="${obj.imageUrl}" style="max-height: 200px; max-width: 320px"/>\n\t\t<div class="card-body">\n`;
        Object.keys(obj).forEach(k => {
            if(k!="imageUrl"){ 
                if (k=="name") html+=`\t\t\t<h4 class="card-title">${obj[k]}</h4>\n`;
                else html+=`\t\t\t<p class="card-text">${obj[k]}</p>\n`;
            }             
        })
    }
    else {
        if (!hideProps.find((k) => k=="imageUrl")) html+=`\t\t<img class="card-img-top" src="${obj.imageUrl}"/>\n`;
        html+=`\t\t<div class="card-body">\n`;
        Object.keys(obj).forEach(k => {
            if((!hideProps.find((key) => key==k)) && k!="imageUrl"){ 
                if (k=="name") html+=`\t\t\t<h4 class="card-title">${obj[k]}</h4>\n`;
                else html+=`\t\t\t<p class="card-text">${obj[k]}</p>\n`;
            }             
        })
    }
    html+=/*html*/`<button
                    type="button"
                    class="btn btn-primary d-block mx-auto col-12"
                    onclick="AddToCart('${obj.uuid}')" 
                >
                <i class="bi bi-cart-fill"></i> Add to cart
                </button>\t\t</div>\n\t</div>\n</div>\n`;
    return html;
} 

function toHtmlList(list){
    return `<div class="container mb-3">\n\t<div class="row">\n${list.map(p=>toHtmlDiv(p, ["stock", "uuid", "unit", "_id", "stock", "pricePerUnit", "category"])).join("")}\t</div>\n</div>\n`;
}

function renderList(list, elementID){
    let html = toHtmlList(list); 
    document.querySelector(`#${elementID}`).innerHTML = html;
}

function showProducts(page){
    let products = JSON.parse(sessionStorage.getItem('products'));
    products=products.slice(((page-1)*4),(page*4));
    renderList(products, "pList");
}

function pagination(){
    let totalPages = Math.ceil(JSON.parse(sessionStorage.getItem('products')).length/4);
    let html = `<nav aria-label="Page navigation">
    <ul class="pagination justify-content-center mt-2">`
    for (let i = 1; i<=totalPages; i++){
        html += /*html*/ `<li class="page-item"><a class="page-link" id="pagination${i}" type="button" onclick="loadPagination('${i}')">${i}</a></li>`
    }
    html += `</ul></nav>`
    document.querySelector(`#navigation`).innerHTML = html;
}

function loadPagination(page=1){
    showProducts(page);
    pagination();
    document.querySelector(`[id="pagination${page}"]`).classList += " active";
}

function filterProducts(filter){
    let products = JSON.parse(sessionStorage.getItem('products'));
    if (filter=="Name"){
        let name = JSON.parse(sessionStorage.getItem('name'));
        if (name!="") products = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }
    else if (filter!="Season" && filter!="DLC") return;
    else products = products.filter(p => p.category==filter);
    //console.log(products);
    sessionStorage.setItem('products', JSON.stringify(products));
}

function AddToCart(uuid){
    if(!sessionStorage.getItem("user")){
        swal({
            title:"Log In to add products to your Cart",
            icon: "error",
            button: "Understood"
        });
    }
    else {
        let product = JSON.parse(sessionStorage.getItem("products")).find(p => p.uuid==uuid);
        swal({
            title: "How many products do you want to add to the cart?",
            content:  {
                element: "input",
                attributes: {
                    type: "number",
                },
            },
            buttons: ["Cancel", "Add to Cart"],
        })
        .then(async (amount) => {
            if (amount>0) addToCart(product, amount);
            else{
                swal({
                    title: "Please select an amount greater than zero",
                    icon: "error",
                    
                });
            }
        });
    }
}

async function addToCart(product, amount){
    let user = JSON.parse(sessionStorage.getItem("user"));
    let resp = await fetch('https://products-dasw.onrender.com/api/cart', {
        method: 'GET',
        headers: {
            'x-expediente': '744577',
            "x-user": user
        }
    })
    let data = await resp.json();
    let t = data.cart.filter(p=> p.uuid==product.uuid)[0];
    // console.log(t);
    // console.log(amount);
    // console.log(t+Number(amount));
    if (t!=undefined) amount=t.amount+Number(amount);
    if (amount<=product.stock) {
        await fetch('https://products-dasw.onrender.com/api/cart/'+product.uuid, {
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
            title: "Product successfully added to your cart",
            icon: "success",
        }); 
    }
    else {
        let string = "Please select an amount lower than " + product.stock;
        swal({
            title: string,
            icon: "error",
        });
    }
}

getProducts();







