// reactstrap components
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
} from "reactstrap";
// core components

import React, { useState, useEffect } from "react";
import { getAllSecurities, searchRelatedSecutity } from "../../api/user-api";
import { useAlert } from "../../utils/AlertProvider";

const Securities = () => {
  const [securities, setSecurities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { showAlert } = useAlert();

  const fetchData = async () => {
    const response = await getAllSecurities();
    if (response.success) {
      setSecurities(response.data);
    } else {
      showAlert("Something went wrong", "danger");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(securities);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (searchQuery.length > 3) {
      const res = await searchRelatedSecutity(e.target.value);
      if (res.success) {
        setSecurities(res.data);
      } else {
        showAlert("Something went wrong", "danger");
      }
    }
  };

  return (
    <>
      <div className='header bg-gradient-info pb-8 pt-5 pt-md-8'>
        <Container fluid>
          <div className='header-body'>
            {/* Card stats */}
            <Row
              style={{
                justifyContent: "center",
              }}
            >
              <Form className='navbar-search navbar-search-dark form-inline'>
                <FormGroup className='mb-0'>
                  <InputGroup className='input-group-alternative'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='fas fa-search' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='Search by ISIN of Security'
                      type='text'
                      onChange={handleSearch}
                      value={searchQuery}
                    />
                  </InputGroup>
                </FormGroup>
              </Form>
            </Row>
          </div>
        </Container>
      </div>
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row
          style={{
            justifyContent: "center",
          }}
        >
          {securities.length === 0 && (
            <Col
              sm='12'
              lg='6'
              xl='6'
              style={{
                marginBottom: "20px",
              }}
            >
              <Card>
                <CardBody>
                  <CardTitle tag='h5'>No Securities Found</CardTitle>
                  <CardText>
                    Please try searching with different keywords
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          )}
          {securities.map((security, index) => {
            return (
              <Col
                sm='12'
                lg='6'
                xl='3'
                key={index}
                style={{
                  marginBottom: "20px",
                }}
              >
                <Card>
                  <CardImg
                    alt='...'
                    src={
                      "https://demos.creative-tim.com/argon-dashboard-pro-react/static/media/img-1-1000x600.3869811c.jpg"
                    }
                    top
                  />
                  <CardBody>
                    <CardText>ISIN: {security.ISIN}</CardText>
                    <CardText>CUSIP: {security.CUSIP}</CardText>
                    <CardText>issuer: {security.issuer}</CardText>
                    <CardText>coupon: {security.coupon}</CardText>
                    <CardText>faceValue: {security.faceValue}</CardText>
                    <CardText>maturityDate: {security.maturityDate}</CardText>
                    <CardText>
                      typeOfSecurity: {security.typeOfSecurity}
                    </CardText>
                    <CardText>status: {security.status}</CardText>
                    <CardText>
                      <small className='text-muted'>
                        Last updated 3 mins ago
                      </small>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Securities;
