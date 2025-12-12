import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Form,
  InputGroup,
} from "react-bootstrap";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,languages,population"
    )
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
        setFiltered(sorted);
        setLoading(false);
      });
  }, []);

  
  useEffect(() => {
    const result = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, countries]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4 fw-bold" style={{ color: "#0d6efd" }}>
         Países del Mundo
      </h1>

    
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar país..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        {filtered.map((country, index) => (
          <Col key={index} md={4} lg={3} className="mb-4">
            <Card
              className="shadow-sm border-0"
              style={{ transition: "0.3s", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Card.Img
                variant="top"
                src={country.flags?.png}
                alt={country.name?.common}
                style={{ height: "160px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="text-center fw-bold">
                  {country.name?.common}
                </Card.Title>

                <hr />

                <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>

                <p>
                  <strong>Población:</strong>{" "}
                  {country.population?.toLocaleString()}
                </p>

                <p>
                  <strong>Idiomas:</strong>{" "}
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"}
                </p>

                <p>
                  <strong>Monedas:</strong>{" "}
                  {country.currencies
                    ? Object.values(country.currencies)
                        .map((c) => c.name)
                        .join(", ")
                    : "N/A"}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filtered.length === 0 && (
        <h4 className="text-center mt-5 text-muted">
          lo siento No se encontraron países con ese nombre 
        </h4>
      )}
    </Container>
  );
}

export default App;
