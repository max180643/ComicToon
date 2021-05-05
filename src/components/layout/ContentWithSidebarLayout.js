import { Container, Row, Col } from 'react-bootstrap'
import SideBar from './SideBar'

const ContentWithSidebarLayout = (props) => {
  const { title, children } = props

  return (
    <Container>
      <Row>
        <Col>
          <SideBar />
        </Col>
        <Col xs={9} className="contentBar" id="scroll_dark">
          <h2 className="m-2">{title}</h2>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default ContentWithSidebarLayout
