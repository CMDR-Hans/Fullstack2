function Seccion({ clase,titulo, children }) {
  return (
    <section className={clase}>
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}

export default Seccion;