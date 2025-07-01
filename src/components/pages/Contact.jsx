import "../../styles/contact.css";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contacto | LEGO Tempone</title>
        <meta name="description" content="Ponete en contacto con nuestro equipo para consultas, soporte y más." />
      </Helmet>
      <section className="contact-section">
        <h2 className="contact-title">Ponte en contacto con un experto LEGOTEMPONE</h2>
        <div className="contact-box">
          <div className="contact-img">
            <img src="/img/legoContactTransparent.png" alt="LEGO" />

          </div>
          <div className="contact-content">
            <h3>Escríbanos</h3>
            <p>Cuéntenos sus dudas y obtenga ayuda. Estamos aquí para ayudarle.</p>
            <Link
              className="css-button-arrow--grey" to="/sendmessage">
              Envíe un mensaje
            </Link>
          </div>
        </div>
        <div className="learnBox">
          <h3>Cómo mantenemos tus datos seguros.</h3>
          <p>Nos comprometemos a tratar tu información personal con cuidado, confianza y respeto. Hemos creado nuestra política de privacidad para ofrecer transparencia sobre nuestras prácticas y políticas.</p>
          <li className="learnMoreLink"><Link to="/safedata">Aprende más ›</Link></li>
        </div>
      </section>
    </>
  );
};

export default Contact;
