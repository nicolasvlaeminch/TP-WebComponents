class AlertMessage extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'message'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" }); // Se crea un Shadow DOM para encapsular estilos y contenido
    }

    connectedCallback() {
        this.render(); // Se renderiza el contenido inicial
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'message') {
            // Hacemos visible el componente si hay un mensaje
            this.style.display = newValue ? 'block' : 'none';
        }
        this.render(); // Volvemos a renderizar el contenido
    }

    render() {
        const type = this.getAttribute('type') || 'info';
        const message = this.getAttribute('message') || '';
        const colors = {
            success: 'green',
            warning: 'orange',
            error: 'red',
            info: 'blue'
        };

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: none; /* Oculto inicialmente */
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 5px;
                    color: white;
                    background-color: ${colors[type]};
                }
            </style>
            ${message}
        `;
    }
}

customElements.define('alert-message', AlertMessage);
