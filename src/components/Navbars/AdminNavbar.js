import { useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

import { getUserFromToken } from "../../api/user-api";
import useUserStore from "../../store/user";

const AdminNavbar = (props) => {
  const setUser = useUserStore((state) => state.setUser);
  const name = useUserStore((state) => state.name);

  const fetchData = async () => {
    const response = await getUserFromToken();
    console.log(response);
    if (!response.success) {
      window.location.href = "/auth/login";
    } else {
      setUser(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <>
      <Navbar className='navbar-top navbar-dark' expand='md' id='navbar-main'>
        <Container fluid>
          <Link
            className='h4 mb-0 text-white text-uppercase d-none d-lg-inline-block'
            to='/'
          >
            {props.brandText}
          </Link>
          <Nav className='align-items-center d-none d-md-flex' navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className='pr-0' nav>
                <Media className='align-items-center'>
                  <span className='avatar avatar-sm rounded-circle'>
                    <img
                      alt='...'
                      src={require("../../assets/img/theme/team-4-800x800.jpg")}
                    />
                  </span>
                  <Media className='ml-2 d-none d-lg-block'>
                    <span className='mb-0 text-sm font-weight-bold'>
                      {name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-arrow' right>
                <DropdownItem className='noti-title' header tag='div'>
                  <h6 className='text-overflow m-0'>Welcome!</h6>
                </DropdownItem>
                <DropdownItem to='/admin/user-profile' tag={Link}>
                  <i className='ni ni-single-02' />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href='#pablo' onClick={handleLogout}>
                  <i className='ni ni-user-run' />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
