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
                  <CardBody className="container">
                    <div className="row" style={{marginBottom:-10}}>
                      <CardText className="col">
                        <p className="" style={{fontSize:12,marginBottom:0}}>ISIN:</p>
                        <p className="" style={{fontSize:16,fontWeight:"bold"}}>{security.ISIN}</p>
                      </CardText>
                      <CardText className="col">
                        <p className="" style={{fontSize:12,marginBottom:0}}>CUSIP:</p>
                        <p className="" style={{fontSize:16,fontWeight:"bold"}}>{security.CUSIP}</p>
                      </CardText>
                    </div>
                    <div className="row" style={{marginBottom:-10}}>
                      <CardText className="col">
                        <p className="" style={{fontSize:12,marginBottom:0}}>issuer:</p>
                        <p className="" style={{fontSize:16,fontWeight:"bold"}}>{security.issuer}</p>
                      </CardText>
                      <CardText className="col">
                        <p className="" style={{fontSize:12,marginBottom:0}}>coupon:</p>
                        <p className="" style={{fontSize:16,fontWeight:"bold"}}>{security.coupon}</p>
                      </CardText>
                    </div>
                    <div className="row" style={{marginBottom:-10}}>
                      <CardText className="col">
                        <p className="" style={{fontSize:12,marginBottom:0}}>faceValue:</p>
                        <p className="" style={{fontSize:16,fontWeight:"bold"}}>{security.faceValue}</p>
                      </CardText>
                      <CardText className="col">
                        <p className="" style={{fontSize:12,marginBottom:0}}>maturityDate:</p>
                        <p className="" style={{fontSize:16,fontWeight:"bold"}}>{security.maturityDate}</p>
                      </CardText>
                    </div>
                    <div className="row" style={{marginBottom:-10}}>
                      <CardText className="col">
                        <p className="" style={{fontSize:12,marginBottom:0}}>typeOfSecurity:</p>
                        <p className="" style={{fontSize:16,fontWeight:"bold"}}>{security.typeOfSecurity}</p>
                      </CardText>
                      <CardText className="col">
                        <p className="" style={{fontSize:12,marginBottom:0}}>status:</p>
                        <p className="" style={{fontSize:16,fontWeight:"bold"}}>{security.status}</p>
                      </CardText>
                    </div>
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
