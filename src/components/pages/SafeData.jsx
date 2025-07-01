import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import '../../styles/safedata.css'

const DataSafe = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad | LEGO Tempone</title>
        <meta name="description" content="Conocé cómo protegemos y usamos tus datos personales en LEGO Tempone." />
      </Helmet>
      <div className='data-safe'>
        <Link to="/contact" style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }}>
          ← Atrás
        </Link>

        <h1 style={{ marginTop: '20px' }}>Cómo mantenemos tus datos seguros</h1>

        <p>
          Desde los inicios de LEGOTEMPONE en 2018, nuestro lema ha sido “Sólo lo mejor es suficientemente bueno”. Nos inspiramos en esas palabras en todo lo que hacemos y especialmente en cómo protegemos su información.
        </p>

        <p>
          Cuando se pone en contacto con el Servicio de Atención al Cliente de LEGOTEMPONE, podemos recopilar, utilizar, almacenar y compartir los siguientes datos sobre usted:
        </p>

        <ul>
          <li>
            Su nombre, dirección de entrega, dirección de facturación y datos de contacto, incluidos su número de teléfono y dirección de correo electrónico.
          </li>
          <li>
            Si tiene una Cuenta LEGOTEMPONE, registraremos su cuenta con el pedido y su historial de pedidos.
          </li>
          <li>
            Si es un usuario de LEGOTEMPONE Insider, registraremos su número de tarjeta Insider con el pedido y, si procede, registraremos los puntos que haya ganado o los premios que haya canjeado.
          </li>
          <li>
            Si es un miembro de LEGOTEMPONE Magazine, registraremos su número de miembro.
          </li>
          <li>
            Si le ayudamos a realizar un pedido en nuestro sitio, es posible que procesemos sus datos de pago y los compartamos con el proveedor de pagos que haya elegido y con nuestro socio de procesamiento de pagos. La información personal que proporcione a algunos proveedores de servicios de pago, incluido PayPal, puede suscribirse bajo los datos de facturación que tenemos registrados para usted.
          </li>
        </ul>

        <p>
          Si no nos ha dado su consentimiento, también podemos recopilar datos adicionales sobre usted (por ejemplo, si ha aceptado el uso de cookies o se ha suscrito a LEGOTEMPONE Insiders, Cuenta LEGOTEMPONE o a nuestros boletines informativos).
        </p>

        <p>
          Siempre utilizamos, almacenamos y compartimos su información personal de acuerdo con nuestra Política de privacidad. Si le estamos ayudando con un pedido, podemos utilizar y compartir la información personal que nos proporcione, para:
        </p>

        <ul>
          <li>
            Cumplir y gestionar su pedido utilizando servicios de terceros de confianza que prestan servicios de almacenamiento, embalaje, envío, entrega, detección de fraudes, prevención de fraudes y cobro de deudas.
          </li>
          <li>
            Cambiar su saldo de puntos LEGOTEMPONE Insiders si es necesario actualizarlo.
          </li>
          <li>
            Almacenar su información personal con nuestros socios de almacenamiento en la nube de confianza.
          </li>
          <li>
            Enviarle catálogos de productos por correo postal compartiendo su información personal con servicios postales y de correo de terceros de confianza.
          </li>
        </ul>

        <p>
          Para poder proteger a nuestros clientes, trabajamos con un servicio asociado que utiliza procesos automatizados de toma de decisiones para detectar y prevenir el fraude. Si su pedido se ve afectado, se lo haremos saber y, si no está satisfecho con alguna decisión automatizada, puede pedirnos que llevemos a cabo una revisión.
        </p>

        <p>
          Si quiere saber más sobre cómo protege sus datos toda nuestra empresa, consulte nuestra{" "}
          <a href="https://www.privacypolicies.com/live/0cafbd3d-29de-4aae-a4c0-94c65a22d237" style={{ color: '#0071ce' }}>
            Política de privacidad
          </a>{" "}
          completa.
        </p>
      </div>
    </>
  );
};

export default DataSafe;
