import { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import ApiContext from '../contexts/apiContext';
import Badge from 'react-bootstrap/Badge';

export default function MovieCard(props) {
  const apiConfig = useContext(ApiContext);

  function getBadgeStyle() {
    if (props.vote_average <= 5.0) {
      return 'danger';
    } else if (props.vote_average <= 7.5) {
      return 'warning';
    } else {
      return 'success';
    }
  }

  return (
    <Card style={{ width: '100%', height: '100%' }}>
      <Card.Img
        variant="top"
        src={
          apiConfig?.images?.base_url +
          apiConfig?.images?.poster_sizes[4] +
          props.poster_path
        }
      />
      <Card.Body>
        <Card.Title>
          <div className="d-flex">
            {props.title}
            <Badge
              className="align-self-center ms-auto"
              style={{ height: 'fit-content' }}
              bg={getBadgeStyle()}
            >
              {props.vote_average}
            </Badge>
          </div>
        </Card.Title>
        <Card.Text>{props.overview}</Card.Text>
      </Card.Body>
    </Card>
  );
}
