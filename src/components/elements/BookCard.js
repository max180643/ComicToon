import { Card, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'

const BookCard = (props) => {
  const router = useRouter()
  const { data } = props
  return (
    <Col xs={3} className="p-4">
      <div
        role="button"
        onClick={() =>
          router.push({
            pathname: '/comic/[cid]',
            query: { cid: data.id }
          })
        }
      >
        <Card className="bookCard">
          <Card.Img
            variant="top"
            src={data.cover}
            className="bookImageCard"
            alt={data.name}
          />
          <Card.Body>
            <Card.Title className="text-center font-weight-bold text-truncate">
              {data.name}
            </Card.Title>
            <Card.Text className="text-sm-center font-weight-bold text-truncate">
              {data.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  )
}

export default BookCard
