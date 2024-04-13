function loadInterface(){
    let html =  /*html*/ `<!-- Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- Navbar -->
<nav
    class="navbar navbar-expand-sm navbar-dark bg-dark"
>
    <div class="container">
        <a class="navbar-brand" href="P01_index.html"><img src="https://www.freepnglogos.com/uploads/download-destiny-logo/destiny-2-icon-22.png" alt="HOME" width="50px" height="50px"></a>
        <button
            class="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" href="P01_index.html" aria-current="page"
                        >Home
                        <span class="visually-hidden">(current)</span></a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="P01_about_us.html">About Us</a>
                </li>
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="dropdownId"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        >Products</a
                    >
                    <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownId"
                    >
                        <a class="dropdown-item" href="P01_cat_A.html?category=DLC"
                            >DLCs</a
                        >
                        <a class="dropdown-item" href="P01_cat_B.html?category=Season"
                            >Seasons</a
                        >
                    </div>
                </li>
                <li>
                    <form class="d-flex my-2 my-lg-0">
                        <input
                            class="form-control me-sm-2"
                            type="text"
                            placeholder="Search Products"
                            id="searchBar"
                        />
                        <a
                            class="btn btn-outline-success my-2 my-sm-0"
                            type="submit"
                            onclick="sendName(); window.location.href='search.html';"
                        >
                            Search
                        </a>
                    </form>
                </li>
            </ul>
            <span class="navbar-text">
                <a class="nav-link active" href="#" aria-current="page" data-bs-toggle="modal" data-bs-target="#LogInModal">
                    <i class="bi bi-person-fill"></i> ${loginDisplay()}
                    <span class="visually-hidden">(current)</span>
                </a>
            </span>
            <span class="navbar-text">&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="navbar-text">
                <a class="nav-link active" href="P01_cart.html" aria-current="page">
                    <i class="bi bi-cart-fill"></i>
                    <span class="visually-hidden">(current)</span>
                </a>
            </span>
        </div>
    </div>
</nav>

<!-- Log In Modal -->
<div
    class="modal fade"
    id="LogInModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalTitleId"
    aria-hidden="true"
>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">
                    Log In
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <form action="" onsubmit="login(); loadInterface();">
                    <label for="email" class="form-label">Email</label>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" id="email" placeholder="Enter your email" required/> 
                        <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
                    </div>
                    <label for="password" class="form-label">Password</label>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" id="password" placeholder="Enter your password" required/>
                        <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
                    </div>
                    <input class="form-check-input" type="checkbox" value="" id="remember" />
                    <label class="form-check-label" for="remember"> Remember me</label>
                    <div style="text-align: center;">
                        <button
                            type="submit"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                        >
                            Login
                        </button>
                        
                    </div>
                </form>
            </div>
            <div class="modal-footer justify-content-center">
                <div>Don't have an account? <a href="" data-bs-toggle="modal" data-bs-target="#RegisterModal"> Sign up here</a></div>
            </div>
        </div>
    </div>
</div>

<!-- Registration Modal -->
<div
    class="modal fade"
    id="RegisterModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalTitleId"
    aria-hidden="true"
>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">
                    Sign Up 
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <form action="" onsubmit="sendData(); loadInterface();">
                <div class="modal-body">
                    <div class="container-fluid row">
                        <div class="mb-3 col-6">
                            <input
                                type="text"
                                class="form-control"
                                aria-describedby="helpId"
                                placeholder="First Name" required
                            />
                        </div>
                        <div class="mb-3 col-6">
                            <input
                                type="text"
                                class="form-control"
                                aria-describedby="helpId"
                                placeholder="Last Name" required
                            />
                        </div>
                        <div class="mb-3">
                            <input
                                type="email"
                                id="createEmail"
                                class="form-control"
                                aria-describedby="helpId"
                                placeholder="Your Email" required
                            />
                        </div>
                        <div class="mb-3">
                            <input
                                type="password"
                                class="form-control"
                                aria-describedby="helpId"
                                placeholder="Password" required
                            />
                        </div>
                        <div class="mb-3">
                            <input
                                type="password"
                                class="form-control"
                                aria-describedby="helpId"
                                placeholder="Confirm Password" required
                            />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary btn-success" data-bs-dismiss="modal">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
</div>`
    document.querySelector("#interface").innerHTML = html;
}

function loginDisplay(){
    return JSON.parse(sessionStorage.getItem('user'))? JSON.parse(sessionStorage.getItem('user')) : "Login";
}


function sendName(){
    event.preventDefault();
    let name = document.querySelector('#searchBar').value;
    sessionStorage.setItem("name", JSON.stringify(name));
    console.log(name);
}

async function login(){
    event.preventDefault();
    let user = document.querySelector('#email').value;
    let resp = await fetch('https://products-dasw.onrender.com/api/cart', {
        method: 'GET',
        headers: {
            'x-expediente': '744577',
            "x-user": user
        }
    })
    let data = await resp.json();
    console.log(data.user);
    if (data.user==undefined) {
        swal({
            title:"User doesn't exist",
            icon: "error"
        });
    }
    else {
        sessionStorage.setItem("user", JSON.stringify(user));
        swal({
            title:"Successfully logged in",
            icon: "success"
        });
    }
    loadInterface();
}

async function sendData(){
    event.preventDefault()
    let user = document.querySelector('#createEmail').value;
    sessionStorage.setItem("user", JSON.stringify(user));
    //console.log(sessionStorage.getItem("user"));
    if (user) {
        let resp = await fetch('https://products-dasw.onrender.com/api/cart', {
            method: 'GET',
            headers: {
                'x-expediente': '744577',
                "x-user": user
            }
        })
        let data = await resp.json();
        if (data.user!=undefined){
            swal({
                title:"User Already Exists",
                icon: "error",
                button: "Understood"
            });
        }
        else {
            // Create cart with 1 product
            resp = await fetch('https://products-dasw.onrender.com/api/cart/X1K6unmtTVVoWnQD7TT-y', {
                method: 'POST',
                headers: {
                    'x-expediente': '744577',
                    "x-user": user
                }
            })
            // Delete the product so the cart is empty
            resp = await fetch('https://products-dasw.onrender.com/api/cart/X1K6unmtTVVoWnQD7TT-y', {
                method: 'DELETE',
                headers: {
                    'x-expediente': '744577',
                    "x-user": user
                }
            })
            swal({
                title:"User successfully created",
                icon: "success"
            });
            sessionStorage.setItem("user", JSON.stringify(user));
        }
    }
    loadInterface();
}

loadInterface();





