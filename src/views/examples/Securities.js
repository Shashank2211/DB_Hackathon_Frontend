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
} from "reactstrap";
// core components
import SecurityHeader from "components/Headers/SecurityHeader.js";

import React, { useState, useEffect } from "react";
import { getAllSecurities } from "../../api/user-api";
import { useAlert } from "../../utils/AlertProvider";

const Securities = () => {
  const [securities, setSecurities] = useState([]);
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

  return (
    <>
      <SecurityHeader count={securities.length} />
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
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
