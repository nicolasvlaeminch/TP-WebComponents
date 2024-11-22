class LoginPage extends HTMLElement {
    constructor() {
        super();
        // Creamos un Shadow DOM para encapsular el estilo y el contenido del componente
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                user-login, alert-message {
                    margin: 10px;
                }
            </style>
            <user-login></user-login>
            <alert-message></alert-message>
        `;
    }

    // Se ejecuta cuando el componente se agrega al DOM
    connectedCallback() {
        // Escuchamos el evento personalizado 'login-result' emitido por el componente UserLogin
        this.shadowRoot.querySelector('user-login').addEventListener('login-result', this.handleLogin.bind(this));
    }

    // Metodo que maneja el evento de resultado del inicio de sesion
    handleLogin(event) {
        const alert = this.shadowRoot.querySelector('alert-message'); // Obtenemos el componente AlertMessage
        const { result } = event.detail; // Extraemos el resultado del detalle del evento

        if (result === 'success') {
            alert.setAttribute('type', 'success');
            alert.setAttribute('message', 'Inicio de sesión exitoso');
        } else {
            alert.setAttribute('type', 'error');
            alert.setAttribute('message', 'Credenciales incorrectas');
        }
    }
}

customElements.define('login-page', LoginPage);
