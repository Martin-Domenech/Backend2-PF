
const addToCart = async (pid) => {
    const response = await fetch(`/api/cart/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pid })
    })
    
    if (response.ok) {
        alert('Producto agregado al carrito')
        window.location.href = '/api/cart'
    } else {
        const errorData = await response.json()
        console.error('Error:', errorData)
        alert(`Error al agregar el producto: ${errorData.message}`)
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const pid = button.getAttribute("product-id")
            addToCart(pid)
        });
    });
})

