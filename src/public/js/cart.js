const deleteProductCart = async (pid) => {
    const response = await fetch(`/api/cart/${pid}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    if (response.ok){
        alert('Producto eliminado exitosamente')
        window.location.href = '/api/cart'
    }else {
        const errorData = await response.json()
        console.error('Error:', errorData)
        alert(`Error al eliminar el producto: ${errorData.message}`)
    }

}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => {
            const pid = button.getAttribute("delete-product")
            console.log(pid)
            deleteProductCart(pid)
        })
    })
})

document.querySelector('.back-products').addEventListener('click',() => {
        window.location.href = '/api/products'
})
