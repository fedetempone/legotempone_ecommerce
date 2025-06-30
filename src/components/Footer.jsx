import { useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import '../styles/footer.css';

const Footer = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    // validacion basica con regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email inválido',
        text: 'Por favor ingresa una dirección de correo válida.',
        confirmButtonColor: '#6885e1'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Gracias por suscribirte!',
      text: 'Te enviaremos información sobre descuentos y promociones.',
      confirmButtonColor: '#6885e1'
    });

    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src="/img/logohp.png" alt="Logo" />
          <p className="country">🌍 Argentina</p>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>QUIÉNES SOMOS</h4>
            <ul>
              <li><Link to="/info/grupo">The TempoLego Group</Link></li>
              <li><Link to="/info/noticias">Noticias TEMPOLEGO®</Link></li>
              <li><Link to="/info/sostenibilidad">Sostenibilidad</Link></li>
              <li><Link to="/info/transparencia">Transparencia</Link></li>
              <li><Link to="/info/certificacion">Certificación de productos</Link></li>
              <li><Link to="/info/empleo">Empleo</Link></li>
              <li><Link to="/info/compliance">TEMPOLEGO Compliance Line</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>ATENCIÓN AL CLIENTE</h4>
            <ul>
              <li><Link to="/info/contacto">Contacto</Link></li>
              <li><Link to="/info/instrucciones">Instrucciones</Link></li>
              <li><Link to="/info/repuestos">Piezas de repuesto</Link></li>
              <li><Link to="/info/envios">Envíos y devoluciones</Link></li>
              <li><Link to="/info/pagos">Métodos de pago</Link></li>
              <li><Link to="/info/terminos">Términos y condiciones</Link></li>
              <li><Link to="/info/retirados">Productos retirados</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>ATRACCIONES</h4>
            <ul>
              <li><Link to="/info/house">TEMPOLEGO® House</Link></li>
              <li><Link to="/info/parks">TEMPOLEGOLAND® Parks</Link></li>
              <li><Link to="/info/discovery">Discovery Centers</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>MÁS INFORMACIÓN</h4>
            <ul>
              <li><Link to="/info/magazine">TEMPOLEGO® Magazine (GRATIS)</Link></li>
              <li><Link to="/info/education">TEMPOLEGO Education</Link></li>
              <li><Link to="/info/ideas">TEMPOLEGO Ideas</Link></li>
              <li><Link to="/info/foundation">TEMPOLEGO Foundation</Link></li>
              <li><Link to="/info/estudiantes">Ofertas para estudiantes</Link></li>
              <li><Link to="/info/socios">Programa para socios</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="newsletter">
          <h4>SUSCRÍBETE AL CORREO ELECTRÓNICO DE TEMPOLEGO® SHOP</h4>
          <form className="newsletter-input" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Tu dirección de correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">→</button>
          </form>
        </div>

        <div className="social-media">
          <h4>SÍGUENOS</h4>
          <div className="icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <ul>
          <li>
            <a
              href="https://www.privacypolicies.com/live/0cafbd3d-29de-4aae-a4c0-94c65a22d237"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de privacidad
            </a>
          </li>
          <li>
            <Link to="/safedata">Protección de datos</Link>
          </li>
          <li>
            <Link to="/info/terminos-y-condiciones">Términos y condiciones</Link>
          </li>
          <li>
            <Link to="/contact">Atención al cliente</Link>
          </li>
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="/register">Registrarse</Link>
          </li>
        </ul>
        <p>
          Industrias Sarasa, Avenida Siempre Viva 123, Springfield. Donde la realidad se toma vacaciones y la imaginación es la jefa.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
