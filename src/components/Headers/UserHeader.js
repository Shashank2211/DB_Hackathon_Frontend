// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import useUserStore from "../../store/user";

const UserHeader = () => {
  const name = useUserStore((state) => state.name);

  return (
    <>
      <div
        className='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className='mask bg-gradient-default opacity-8' />
        {/* Header container */}
        <Container className='d-flex align-items-center' fluid>
          <Row>
            <Col lg='12' md='12'>
              <h1 className='display-2 text-white'>Hello {name}</h1>
              <p className='text-white mt-0 mb-5'>
                This is your profile page. You can see your personal information
                here.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
