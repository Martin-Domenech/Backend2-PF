
const updateProduct = async (pid) => {
    if (!pid) {
        console.error('No se ha proporcionado un product ID')
        return
    }

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const code = document.getElementById('code').value
    const price = document.getElementById('price').value
    const stock = document.getElementById('stock').value
    const category = document.getElementById('category').value
    const thumbnails = document.getElementById('thumbnails').value
    const status = document.getElementById('status').checked

    const updatedProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status
    }

    const response = await fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    })
    if (response.ok) {
        alert('Producto actualizado con exito')
        window.location.href = '/'
    } else {
        const errorData = await response.json()
        console.error('Error:', errorData)
        alert(`Error al actualizar el producto: ${errorData.message}`)
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const updateButton = document.querySelector('.updateProductBtn')
    if (updateButton) {
        updateButton.addEventListener('click', () => {
            const pid = updateButton.getAttribute("product-id")
            updateProduct(pid)
        })
    }
})