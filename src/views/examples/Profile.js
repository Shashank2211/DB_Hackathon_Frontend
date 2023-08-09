// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import useUserStore from "store/user";

const Profile = () => {
  const email = useUserStore((state) => state.email);
  const role = useUserStore((state) => state.role);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className='mt--7' fluid>
        <Row>
          <Col className='order-xl-1' xl='12'>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='8'>
                    <h3 className='mb-0'>My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className='heading-small text-muted mb-4'>
                    User information
                  </h6>
                  <div className='pl-lg-4'>
                    <Row>
                      <Col lg='6'>
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-email'
                          >
                            Email address
                          </label>
                          <Input
                            className='form-control-alternative'
                            id='input-email'
                            placeholder='jesse@example.com'
                            type='email'
                            value={email}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg='6'>
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-phone-number'
                          >
                            Role
                          </label>
                          <Input
                            className='form-control-alternative'
                            defaultValue='9876543210'
                            id='input-phone-number'
                            placeholder='Role'
                            type='text'
                            value={role}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className='my-4' />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
