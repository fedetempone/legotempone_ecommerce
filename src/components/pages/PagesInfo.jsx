import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import '../../styles/infoPages.css'


const sections = [
  { id: "grupo", title: "The TempoLego Group", content: "Somos una comunidad educativa enfocada en el desarrollo de soluciones modulares para potenciar el aprendizaje práctico y creativo." },
  { id: "noticias", title: "Noticias TEMPOLEGO®", content: "Lanzamos una nueva línea de kits para programación y electrónica. ¡Ya disponibles en nuestra tienda online!" },
  { id: "sostenibilidad", title: "Sostenibilidad", content: "Nuestros productos están fabricados con plásticos reciclables y procesos de baja emisión. Comprometidos con el planeta." },
  { id: "transparencia", title: "Transparencia", content: "Publicamos reportes trimestrales sobre nuestras acciones, alianzas y decisiones. La confianza se construye con datos." },
  { id: "certificacion", title: "Certificación de productos", content: "Todos nuestros kits cuentan con certificaciones nacionales e internacionales de calidad y seguridad educativa." },
  { id: "empleo", title: "Empleo", content: "Buscamos talentos apasionados por la educación, la tecnología y el diseño. Consultá nuestras vacantes activas." },
  { id: "compliance", title: "TEMPOLEGO Compliance Line", content: "Canal seguro y confidencial para reportar irregularidades. Tu voz ayuda a mejorar nuestra cultura." },

  { id: "contacto", title: "Contacto", content: "📍 Av. Siempre Viva 123, Ciudad Universitaria\n✉️ contacto@legotempone.edu.ar\n📞 +54 11 1234‑5678" },
  { id: "instrucciones", title: "Instrucciones", content: "Cada kit incluye una guía ilustrada. También podés acceder a tutoriales paso a paso en nuestro sitio web." },
  { id: "repuestos", title: "Piezas de repuesto", content: "¿Perdiste una pieza? Pedí repuestos gratuitos dentro de los primeros 6 meses de uso. Sin costo adicional." },
  { id: "envios", title: "Envíos y devoluciones", content: "Realizamos envíos a todo el país. Tenés 15 días para devolver el producto si no estás satisfecho." },
  { id: "pagos", title: "Métodos de pago", content: "Aceptamos tarjetas, transferencias, MercadoPago y pagos en cuotas sin interés en eventos especiales." },
  { id: "terminos", title: "Términos y condiciones", content: "El uso de nuestros productos implica la aceptación de las condiciones de uso publicadas en nuestra web." },
  { id: "retirados", title: "Productos retirados", content: "Conocé los productos que hemos descontinuado por mejoras técnicas o cambios en los programas educativos." },

  { id: "house", title: "TEMPOLEGO® House", content: "Un espacio físico interactivo donde los chicos pueden explorar, construir y aprender con nuestros kits." },
  { id: "parks", title: "TEMPOLEGOLAND® Parks", content: "Parques temáticos educativos donde el juego y el conocimiento van de la mano. ¡Próximamente en Buenos Aires!" },
  { id: "discovery", title: "Discovery Centers", content: "Centros de descubrimiento diseñados para escuelas y ferias de ciencias. Experiencias únicas de aprendizaje." },

  { id: "magazine", title: "TEMPOLEGO® Magazine (GRATIS)", content: "Recibí cada mes artículos, ideas de proyectos y entrevistas educativas. ¡Suscripción gratuita para estudiantes!" },
  { id: "education", title: "TEMPOLEGO Education", content: "Programas adaptados para instituciones educativas. Capacitación docente y kits institucionales." },
  { id: "ideas", title: "TEMPOLEGO Ideas", content: "Compartí tus ideas, creaciones o desafíos con toda la comunidad educativa." },
  { id: "foundation", title: "TEMPOLEGO Foundation", content: "Trabajamos en alianza con ONGs para llevar educación tecnológica a zonas vulnerables." },
  { id: "estudiantes", title: "Ofertas para estudiantes", content: "Beneficios exclusivos con acreditación universitaria o secundaria. ¡Consultá promociones activas!" },
  { id: "socios", title: "Programa para socios", content: "Empresas, instituciones o particulares pueden unirse a nuestro programa de socios y recibir kits especiales." },
];

const PagesInfo = () => {
  const { sectionId } = useParams();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (sectionId) {
      const index = sections.findIndex(sec => sec.id === sectionId);
      if (index !== -1) setCurrentPage(index);
    }
  }, [sectionId]);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < sections.length - 1) setCurrentPage(currentPage + 1);
  };

  const section = sections[currentPage];

  return (
    <>
      <Helmet>
        <title>Información | LEGO Tempone</title>
        <meta name="description" content="Consultá nuestras políticas, términos y toda la información legal." />
      </Helmet>
      <div className="info-page">
        <h2>{section.title}</h2>
        <p style={{ whiteSpace: "pre-line" }}>{section.content}</p>

        <div className="paginator" style={{ marginTop: "2rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <button onClick={handlePrev} disabled={currentPage === 0}>{"<"}</button>
          <span>Page {currentPage + 1} of {sections.length}</span>
          <button onClick={handleNext} disabled={currentPage === sections.length - 1}>{">"}</button>
        </div>
      </div>
    </>
  );
};

export default PagesInfo;
