
const deleteProductCart = async (pid, cid) => {
    if (!cid) {
        console.error('No se ha proporcionado un cardId')
        return
    }
    if (!pid) {
        console.error('No se ha proporcionado un productId')
        return
    }
    const response = await fetch(`/api/cart/${cid}/product/${pid}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    if (response.ok){
        window.location.href = '/cart'
    }else {
        const errorData = await response.json()
        console.error('Error:', errorData)
        alert(`Error al eliminar el producto: ${errorData.message}`)
    }

}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => {
            const pid = button.getAttribute("delete-productId")
            const cid = button.getAttribute("cid")
            deleteProductCart(pid, cid)
        })
    })
})
