
const logout = async () => {
    try {
        const response = await fetch('/api/sessions/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            window.location.href = '/'
        } else {
            const errorData = await response.json()
            console.error('Error:', errorData)
            alert('Error al cerrar sesión')
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error)
        alert('Ocurrió un error al cerrar sesión.')
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector('.logout-btn')
    if (button) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            logout()
        })
    }
})