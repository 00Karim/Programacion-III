import { useEffect, useState } from "react";
import ListaTarjetas from "./ListaTarjetas";

const ObtenerPersonas = () => {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    fetch("/api/personas")
      .then(res => res.json())
      .then(data => setPersonas(data))
      .catch(err => console.error("Error al obtener personas:", err));
  }, []);

  return <ListaTarjetas personas={personas} />;
};

export default ObtenerPersonas;
