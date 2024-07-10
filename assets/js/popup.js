document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const response = await fetch('/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();

    if (result.message) {
        const popup = document.getElementById('popup');
        popup.classList.add('show');

        document.querySelector('.close').onclick = function () {
            popup.classList.remove('show');
        }

        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000);
    }
});
