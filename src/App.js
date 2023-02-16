import "./styles.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import MovieList from "./components/MovieList";
import { useEffect, useState } from "react";
import { apiKey, apiPath } from "./api/api";
import ApiContext from "./contexts/apiContext";

export default function App() {
  const [apiConfig, setApiConfig] = useState();
  const [query, setQuery] = useState();

  useEffect(() => {
    try {
      fetch(apiPath + "/configuration?api_key=" + apiKey).then((resp) => {
        resp.json().then((json) => {
          setApiConfig(json);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <ApiContext.Provider value={apiConfig}>
        <Navbar bg="dark" variant="dark" fixed="top" sticky="top">
          <Container>
            <Navbar.Brand>
              <FontAwesomeIcon icon={faClapperboard} /> {"Movies"}
            </Navbar.Brand>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                const query = new FormData(event.target).get("query");
                setQuery(query);
              }}
              className="d-flex"
              action="/"
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name="query"
              />
              <Button variant="light" type="submit">
                Search
              </Button>
            </Form>
          </Container>
        </Navbar>
        <MovieList query={query} />
      </ApiContext.Provider>
    </>
  );
}
