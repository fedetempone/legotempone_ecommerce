import '../../styles/about.css'; 

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-image">
          <img src="/img/aboutLego.jpg" alt="Equipo de LEGOTEMPONE" />
        </div>
        <div className="about-content">
          <h2>Sobre LEGOTEMPONE</h2>
          <p>
            En <strong>LEGOTEMPONE</strong> somos una empresa innovadora creada como parte de un proyecto
            de TalentoTech. Nos dedicamos a desarrollar soluciones modulares y personalizables
            para estudiantes y docentes, brindando herramientas que facilitan el aprendizaje
            práctico y colaborativo.
          </p>

          <h3>Nuestra misión</h3>
          <p>
            Facilitar el acceso a herramientas educativas interactivas, que promuevan el
            pensamiento lógico, la creatividad y el trabajo en equipo. Creemos en un
            aprendizaje constructivo, tan sólido y versátil como nuestros bloques.
          </p>

          <h3>¿Qué hacemos?</h3>
          <ul>
            <li>Diseño y fabricación de kits modulares para talleres prácticos.</li>
            <li>Plataforma online para compartir proyectos y lecciones.</li>
            <li>Asesoramiento técnico y formación docente.</li>
            <li>Soporte permanente y actualizaciones gratuitas.</li>
          </ul>

          <h3>El equipo LEGOTEMPONE</h3>
          <p>
            Somos un grupo interdisciplinario de estudiantes de ingeniería, diseño gráfico
            y pedagogía, apasionados por la educación y la tecnología.
            Entre nosotros:  
            <em>Ana Martínez</em> (Ingeniera electrónica),  
            <em>Juan Pérez</em> (Diseñador UX/UI),  
            <em>María Gómez</em> (Especialista en contenido educativo).
          </p>

          <h3>Contacto</h3>
          <p>
            📍 Av. Siempre Viva 123, Ciudad Universitaria<br />
            ✉️ contacto@legotempone.edu.ar<br />
            📞 +54 11 1234‑5678
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
