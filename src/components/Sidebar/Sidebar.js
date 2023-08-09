/*eslint-disable*/
import { useEffect, useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

import { getUserBooks } from "../../api/user-api";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import { useAlert } from "../../utils/AlertProvider";

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const { logo } = props;

  let navbarBrandProps;

  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  const [books, setBooks] = useState([]);

  const { showAlert } = useAlert();

  const fetchData = async () => {
    const response = await getUserBooks();
    if (response.success) {
      setBooks(
        response.data.map((i) => {
          return {
            id: i.id,
            name: i.book.name,
          };
        })
      );
    } else {
      console.log(response.error);
      showAlert(response.message, "danger");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Navbar
      className='navbar-vertical fixed-left navbar-light bg-white'
      expand='md'
      id='sidenav-main'
    >
      <Container fluid>
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggleCollapse}
        >
          <span className='navbar-toggler-icon' />
        </button>

        {logo ? (
          <NavbarBrand className='pt-0' {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className='navbar-brand-img'
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}

        <Nav className='align-items-center d-md-none'>
          <UncontrolledDropdown nav>
            <DropdownToggle nav className='nav-link-icon'>
              <i className='ni ni-bell-55' />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby='navbar-default_dropdown_1'
              className='dropdown-menu-arrow'
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className='align-items-center'>
                <span className='avatar avatar-sm rounded-circle'>
                  <img
                    alt='...'
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
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
              <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                <i className='ni ni-user-run' />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className='navbar-collapse-header d-md-none'>
            <Row>
              {logo ? (
                <Col className='collapse-brand' xs='6'>
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className='collapse-close' xs='6'>
                <button
                  className='navbar-toggler'
                  type='button'
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className='mt-4 mb-3 d-md-none'>
            <InputGroup className='input-group-rounded input-group-merge'>
              <Input
                aria-label='Search'
                className='form-control-rounded form-control-prepended'
                placeholder='Search'
                type='search'
              />
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <span className='fa fa-search' />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>
            <NavItem>
              <NavLink
                to={"/admin/index"}
                tag={NavLinkRRD}
                onClick={closeCollapse}
              >
                <i className='ni ni-tv-2 text-primary' />
                {"Dashboard"}
              </NavLink>
              {books.map((i, index) => (
                <NavLink
                  key={index}
                  to={"/admin/book?id=" + i.id}
                  tag={NavLinkRRD}
                  onClick={closeCollapse}
                >
                  <i className='ni ni-bullet-list-67 text-red' />
                  Book : {i.name}
                </NavLink>
              ))}
              <NavLink
                to={"/admin/watchlist"}
                tag={NavLinkRRD}
                onClick={closeCollapse}
              >
                <i className='ni ni-bullet-list-67 text-red' />
                {"Watchlist"}
              </NavLink>
              <NavLink
                to={"/admin/notification"}
                tag={NavLinkRRD}
                onClick={closeCollapse}
              >
                <i className='ni ni-bullet-list-67 text-red' />
                {"Notification"}
              </NavLink>
              <NavLink
                to={"/admin/user-profile"}
                tag={NavLinkRRD}
                onClick={closeCollapse}
              >
                <i className='ni ni-single-02 text-yellow' />
                {"User Profile"}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
