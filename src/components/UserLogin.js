class UserLogin extends HTMLElement {
    constructor() {
        super();
        // Creamos un Shadow DOM para encapsular el estilo y el contenido del componente
        this.attachShadow({ mode: "open" });
    }

    // Se ejecuta cuando el componente se agrega al DOM
    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 60px;
                    border: 2px solid black;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    font-family: 'Arial', sans-serif;
                    font-size: 24px;
                    color: #333; /* Color de la fuente del título */
                    text-align: center;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                label {
                    font-family: 'Arial', sans-serif;
                    font-size: 16px;
                    color: #555; /* Color de la fuente de los labels */
                }
                input {
                    padding: 10px;
                    font-family: 'Arial', sans-serif;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                button {
                    padding: 10px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: 'Arial', sans-serif;
                    font-size: 16px;
                }
                button:hover {
                    background-color: #0056b3;
                }
            </style>
            <form id="login-form">
                <h2>Iniciar Sesión</h2>
                <div class="form-group">
                    <label for="username">Usuario:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">Ingresar</button>
            </form>
        `;

        // Escuchamos el evento 'submit' del formulario para procesarlo
        this.shadowRoot.querySelector('form').addEventListener('submit', this.submitForm.bind(this));
    }

    // Metodo que se ejecuta al enviar el formulario
    submitForm(event) {
        event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
        const username = this.shadowRoot.querySelector('#username').value;
        const password = this.shadowRoot.querySelector('#password').value;

        // Validamos las credenciales de usuario
        let result;
        if (username === 'admin' && password === 'admin') {
            result = 'success';
        } else {
            result = 'error';
        }        

        // Emitimos un evento personalizado con el resultado del inicio de sesion
        this.dispatchEvent(new CustomEvent('login-result', {
            detail: { result }, // Detalle del evento con el resultado
            bubbles: true, // Permitimos que el evento burbujee hacia elementos padres
            composed: true // Permitimos que atraviese el Shadow DOM
        }));
    }
}

customElements.define('user-login', UserLogin);
