
document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        if (username === 'administrador' && password === '123456') {
            window.location.href = 'inicio.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });