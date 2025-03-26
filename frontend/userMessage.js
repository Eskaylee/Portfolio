const form = document.getElementById('form');
const nameContent = document.getElementById('name');
const emailContent = document.getElementById('email');
const messageContent = document.getElementById('message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = nameContent.value;
    let email = emailContent.value;
    let message = messageContent.value;
    let data = { name, email, message };
    sendMessage(data);
    form.reset();
});

async function sendMessage(data) {
    try {
        const request = await fetch('/route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Corrected capitalization
            },
            body: JSON.stringify(data),
        });
        
        // Wait for the response to be parsed
        const response = await request.json();
        
        if (request.ok) { // Check if the response status is OK
            alert('Message sent');
        } else {
            alert(`Error occurred while sending the data: ${response.message}`);
        }
    } catch (error) {
        console.log(`Error occurred connecting to the server: ${error.message}`);
        alert('An error occurred while connecting to the server');
        return {
            error: true,
            message: error.message,
        };
    }
}
