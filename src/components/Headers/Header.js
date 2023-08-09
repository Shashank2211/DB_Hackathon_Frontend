// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = (props) => {
  return (
    <>
      <div className='header bg-gradient-info pb-8 pt-5 pt-md-8'>
        <Container fluid>
          <div className='header-body'>
            {/* Card stats */}
            <Row>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Number of Trades
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>
                          {props.totalTrades}
                        </span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
                          <i className='fas fa-chart-bar' />
                        </div>
                      </Col>
                    </Row>
                    <p className='mt-3 mb-0 text-muted text-sm'>
                      <span className='text-nowrap'> Total Trades </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Total Volume
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>
                          {props.totalVolume}
                        </span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-warning text-white rounded-circle shadow'>
                          <i className='fas fa-chart-pie' />
                        </div>
                      </Col>
                    </Row>
                    <p className='mt-3 mb-0 text-muted text-sm'>
                      <span className='text-nowrap'>
                        Total Volume of trades in the book
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Critical Trades
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>
                          {props.redFlag}/ {props.totalTrades}
                        </span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-yellow text-white rounded-circle shadow'>
                          <i className='fas fa-users' />
                        </div>
                      </Col>
                    </Row>
                    <p className='mt-3 mb-0 text-muted text-sm'>
                      <span className='text-nowrap'>
                        No. of Wrong Trades / No. of Trades
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Medium Risk
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>
                          {props.orangeFlag}/ {props.totalTrades}
                        </span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-info text-white rounded-circle shadow'>
                          <i className='fas fa-users' />
                        </div>
                      </Col>
                    </Row>
                    <p className='mt-3 mb-0 text-muted text-sm'>
                      <span className='text-success mr-2'>
                        <i className='fas fa-arrow-up' /> 12%
                      </span>{" "}
                      <span className='text-nowrap'>Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
