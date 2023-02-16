import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import MovieCard from "./MovieCard";
import { apiPath, apiKey } from "../api/api";

export default function MovieList(props) {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchDiscoverData(page) {
    try {
      let requestPath = apiPath + "/discover/movie?api_key=" + apiKey;
      if (page != null) {
        requestPath += "&page=" + page;
      }
      let request = await fetch(requestPath);
      let json = await request.json();
      setMovieData(json.results);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePageChange(event) {
    event.stopPropagation();
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.preventDefault();
    console.log(event);
    return false;
  }

  useEffect(() => {
    fetchDiscoverData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (props.query != null && props.query !== "") {
        try {
          let request = await fetch(
            apiPath +
              "/search/movie?api_key=" +
              apiKey +
              "&query=" +
              props.query
          );
          let json = await request.json();
          setMovieData(json.results);
        } catch (error) {
          console.log(error);
        }
      } else {
        fetchDiscoverData();
      }
    }
    fetchData();
  }, [props.query]);

  return (
    <Container>
      <Row>
        {movieData?.map((movie) => {
          return (
            <Col
              key={movie.title}
              className="mt-4 pb-4"
              xxl={3}
              xl={3}
              lg={3}
              md={3}
              sm={6}
              xs={6}
            >
              <MovieCard
                key={movie.title}
                title={movie.title}
                overview={movie.overview}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
              />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <nav aria-label="...">
            <ul className="pagination">
              <li className={"page-item" + (page === 1 ? " disabled" : "")}>
                <Button onClick={handlePageChange}>Previous</Button>
              </li>
              <li className="page-item active" aria-current="page">
                <span className="page-link">{page}</span>
              </li>
              <li
                className="page-item"
                onClick={(event) => {
                  console.log(event);
                }}
              >
                <Button onClick={handlePageChange}>Next</Button>
              </li>
            </ul>
          </nav>
        </Col>
      </Row>
    </Container>
  );
}
