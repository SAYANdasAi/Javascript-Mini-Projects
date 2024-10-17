document.addEventListener('DOMContentLoaded',()=>{
    const product = [

        {id: 1 ,name: "Product 1", price:29.99},
        {id: 2 ,name: "Product 2", price:39.99},
        {id: 3 ,name: "Product 3", price:19.99},
    ];

    const cart = [];
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMsg = document.getElementById("empty-cart");
    const cartTotal = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    product.forEach(products => {
        const productDiv = document.createElement('div');
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <span>${products.name} - ${products.price.toFixed(2)}</span>
        <button data-id="${products.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });


    productList.addEventListener('click',(e)=>{
        
        if(e.target.tagName === 'BUTTON'){
            emptyCartMsg.classList.add('hidden');
            const productId  = parseInt(e.target.getAttribute("data-id"));
            const products = product.find(p=>p.id === productId);
            addToCart(products);
            
        }

    });

    cartItems.addEventListener('click',(e)=>{
        
        if(e.target.tagName === 'BUTTON'){
            const productId  = parseInt(e.target.getAttribute("remove-id"));
            const products = product.find(p=>p.id === productId);
            remove(products);
            
        }

    });

    

    function addToCart(p){
        cart.push(p);
        renderCart();
    }
    function renderCart(){
        cartItems.innerHTML ='';
        let totalPrice = 0;
        if(cart.length > 0){
            emptyCartMsg.classList.add('hidden');
            cartTotal.classList.remove('hidden');
            cart.forEach((item,index)=>{
                totalPrice += item.price;
                const addCartDiv = document.createElement('div');
                addCartDiv.innerHTML=`
                <span>${item.name} - ${item.price}</span>
                <button remove-id='${item.id}'>Remove</button>
                `;
                cartItems.appendChild(addCartDiv);
                totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
            })
        }else{
            emptyCartMsg.classList.remove('hidden');
            cartTotal.classList.add('hidden');
        }
        
    }
    checkoutButton.addEventListener('click',()=>{
        cart.length = 0;
        alert("Checkout Successfully");
        renderCart();
    })

    function removeItems(array,p){
        array.forEach((item,index)=>{
            if(item === p){
                array.splice(index,1)
            }
        });
        return array;
    }
    function remove(p){
        removeItems(cart,p);
        renderCart();

    }
    

})