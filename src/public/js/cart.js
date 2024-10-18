
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
        location.reload()
    }else {
        const errorData = await response.json()
        console.error('Error:', errorData)
        alert(`Error al eliminar el producto: ${errorData.message}`)
    }
}

const purchase = async (cid, amount) => {
    if (!cid) {
        console.error('No se ha proporcionado un cardId')
        return
    }
    if (!amount) {
        console.error('No se ha proporcionado un amount')
        return
    }
    const response = await fetch(`/api/cart/${cid}/purchase`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cid, amount })
    })
    if (response.ok){
        alert(`Compra realizada con exito, en los proximos minutos le llegaraa su mail los detalles de su compra.\n`)
        location.reload()
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

document.addEventListener("DOMContentLoaded", () => {
    const buttonPurchase = document.querySelector('.purchase')
    if (buttonPurchase) {
        buttonPurchase.addEventListener('click', () => {
            const cid = buttonPurchase.getAttribute("cart-id")
            const amount = buttonPurchase.getAttribute("amount")
            purchase(cid, amount)
        })
    }
})