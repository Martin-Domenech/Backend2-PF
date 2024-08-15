
const addToCart = async (pid, cid) => {
    if (!cid) {
        console.error('No se ha proporcionado un card id')
        return
    }
    const response = await fetch(`/api/cart/${cid}/product/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pid })
    })
    
    if (response.ok) {
        alert('Producto agregado al carrito')
        window.location.href = '/cart'
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
            const cid = button.getAttribute("cart-id")

            addToCart(pid, cid)
        })
    })
})


document.querySelector('.delete-filter').addEventListener('click',() => {
    document.getElementById('category').value = ''
    document.getElementById('sort').value = ''
    window.location.href = '/'
})