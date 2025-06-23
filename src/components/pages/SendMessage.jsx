import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/sendmessage.css";

const SendMessage = () => {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mensaje.trim().length < 10) {
            alert("Por favor, escriba un mensaje más completo (mínimo 10 caracteres).");
            return;
        }
        console.log("Mensaje enviado:", { email, mensaje });
        setShowPopup(true);
        setEmail("");
        setMensaje("");
        setTimeout(() => setShowPopup(false), 4000);
    };

    return (
        <section className="send-section">
            <Link to="/contact" style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }}>
                ← Atrás
            </Link>
            <div className="send-container">
                <div className="send-img">
                    <img
                        src="/img/sendMessage.png"
                        alt="LEGO Ayuda"
                    />
                </div>

                <form className="send-form" onSubmit={handleSubmit}>
                    <h2>Contáctanos</h2>

                    <input
                        type="email"
                        placeholder="Tu email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <textarea
                        placeholder="Escribe tu mensaje..."
                        minLength={10}
                        required
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    />

                    <button type="submit">Enviar</button>
                </form>
            </div>

            {showPopup && (
                <div className="popup">
                    <p>
                        ✅ ¡Mensaje enviado con éxito!<br />
                        Nos estaremos comunicando con usted a la brevedad. ¡Gracias!
                    </p>
                </div>
            )}
        </section>
    );
};

export default SendMessage;
