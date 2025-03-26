const form = document.getElementById('form')
const nameContent = document.getElementById('name')
const emailContent = document.getElementById('email')
const messageContent = document.getElementById('message')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let name = nameContent.value.trim()
    let email = emailContent.value.trim()
    let message = messageContent.value.trim()

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address (e.g., user@example.com)')
        return
    }

    let data = { name, email, message }
    sendMessage(data)
    form.reset()
})

async function sendMessage(data) {
    try {
        const request = await fetch('/route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        
        const response = await request.json()
        
        if (request.ok) {
            alert('Message sent')
        } else {
            alert(`Error occurred while sending the data: ${response.message}`)
        }
    } catch (error) {
        console.log(`Error occurred connecting to the server: ${error.message}`)
        alert('An error occurred while connecting to the server')
        return {
            error: true,
            message: error.message,
        }
    }
}