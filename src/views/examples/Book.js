// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  FormGroup,
  Input,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import {
  getAllTradeByBook,
  reportTrade,
  addToWatchlist,
} from "../../api/user-api";
import { useAlert } from "../../utils/AlertProvider";
import useTradeStore from "../../store/trade";

const Book = () => {
  const filters = ["All", "Red Flags", "Orange Flags"];
  const [activeFilter, setActiveFilter] = useState(0);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const [allTrades, setAllTrades] = useState([]);

  const { showAlert } = useAlert();

  const trades = useTradeStore((state) => state.trades);
  const redFlags = useTradeStore((state) => state.redFlags);
  const orangeFlags = useTradeStore((state) => state.orangeFlags);
  const greenFlags = useTradeStore((state) => state.greenFlags);
  const setTrades = useTradeStore((state) => state.setTrades);
  const setRedFlags = useTradeStore((state) => state.setRedFlags);
  const setOrangeFlags = useTradeStore((state) => state.setOrangeFlags);
  const setGreenFlags = useTradeStore((state) => state.setGreenFlags);

  const fetchData = async () => {
    const res = await getAllTradeByBook(id);
    if (res.success) {
      setAllTrades(res.data);
      setTrades(res.data);
      setRedFlags(res.data);
      setOrangeFlags(res.data);
      setGreenFlags(res.data);
    } else {
      console.log(res.error);
      showAlert(res.message, "danger");
    }
  };

  const handleFilterData = (filter) => {
    setActiveFilter(filter);

    switch (filter) {
      case 0:
        setAllTrades(trades);
        break;
      case 1:
        setAllTrades(redFlags);
        break;
      case 2:
        setAllTrades(orangeFlags);
        break;
      case 3:
        setAllTrades(greenFlags);
        break;
      default:
        setAllTrades(trades);
        break;
    }
  };

  const handleAddToWatchlist = async (id) => {
    const res = await addToWatchlist(id);
    if (res.success) {
      console.log(res.data);
      showAlert(res.message, "success");
    } else {
      console.log(res.error);
      showAlert(res.message, "danger");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const AUTHORITY = ["Authority 1", "Authority 2"];

  const [authority, setAuthority] = useState("");
  const [message, setMessage] = useState("");
  const [reportId, setReportId] = useState();

  const handleReportTrade = async () => {
    if (!authority || !message) {
      showAlert("Please fill all the fields", "danger");
      return;
    }
    const res = await reportTrade(reportId, authority, message);

    if (res.success) {
      console.log(res.data);
      showAlert(res.message, "success");
      toggleModal();
    } else {
      console.log(res.error);
      showAlert(res.message, "danger");
    }
  };
  const [openModal, setOpenModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const toggleModal = () => {
    if (!openModal) {
      setReportId("");
    }
    setOpenModal(!openModal);
  };

  const toggleDetailModal = () => {
    setOpenDetailModal(!openDetailModal);
  };

  return (
    <>
      <Header
        redFlag={redFlags.length}
        orangeFlag={orangeFlags.length}
        totalTrades={trades.length}
        totalVolume={trades.reduce((acc, trade) => {
          return acc + trade.quantity * trade.price;
        }, 0)}
      />
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <div
                  className='row'
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <h3 className='mb-0'>Book</h3>
                  <div className='row pr-4'>
                    {filters.map((filter, index) => {
                      return (
                        <Button
                          key={index}
                          color={
                            activeFilter === index ? "primary" : "secondary"
                          }
                          size='sm'
                          type='button'
                          className='mr-2'
                          onClick={() => handleFilterData(index)}
                        >
                          {filter}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Bond</th>
                    <th scope='col'>Value</th>
                    <th scope='col'>Counter Party</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Maturity</th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {allTrades.map((trade, index) => {
                    const tradeDate = new Date(trade.tradeDate);
                    const settlementDate = new Date(trade.settlementDate);
                    const maturityDate = new Date(trade.security.maturityDate);
                    const today = new Date();
                    //  get percentage of maturity from trade date to maturity date
                    const maturityPercentage =
                      ((today - tradeDate) / (maturityDate - tradeDate)) * 100;

                    return (
                      <>
                        <tr key={index}>
                          <th scope='row'>
                            <Media className='align-items-center'>
                              <a
                                className='avatar rounded-circle mr-3'
                                href='#pablo'
                                onClick={toggleDetailModal}
                              >
                                <img
                                  alt='...'
                                  src={require("../../assets/img/theme/bootstrap.jpg")}
                                />
                              </a>
                              <Media>
                                <button
                                  style={{
                                    border: "none",
                                    backgroundColor: "transparent",
                                  }}
                                  onClick={toggleDetailModal}
                                >
                                  <span className='mb-0 text-sm'>
                                    ISIN: {trade.security.ISIN}
                                  </span>
                                </button>
                              </Media>
                            </Media>
                          </th>
                          <td>${trade.quantity * trade.price} USD</td>
                          <td>
                            <div
                              className='avatar-group'
                              // style={{
                              //   display: "flex",
                              //   justifyContent: "center",
                              // }}
                            >
                              <a
                                className='avatar avatar-sm'
                                href='#pablo'
                                id='tooltip996637554'
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt='...'
                                  className='rounded-circle'
                                  src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                />
                              </a>
                              <UncontrolledTooltip
                                delay={0}
                                target='tooltip996637554'
                              >
                                {trade.counterparty.name}
                              </UncontrolledTooltip>
                            </div>
                          </td>
                          <td>
                            {today > settlementDate ? (
                              <Badge color='' className='badge-dot mr-4'>
                                <i
                                  className='bg-danger'
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                                Settlement Date Passed
                              </Badge>
                            ) : settlementDate < maturityDate ? (
                              <Badge color='' className='badge-dot mr-4'>
                                <i
                                  className='bg-danger'
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                                Incorrect Settlement Date
                              </Badge>
                            ) : today > maturityDate &&
                              today < settlementDate ? (
                              <Badge color='' className='badge-dot mr-4'>
                                <i
                                  className='bg-warning'
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                                Settlement Date Approaching
                              </Badge>
                            ) : (
                              <Badge color='' className='badge-dot mr-4'>
                                <i
                                  className='bg-success'
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                                Active
                              </Badge>
                            )}
                          </td>
                          <td>
                            <div className='d-flex align-items-center'>
                              <span className='mr-2'>
                                {maturityPercentage.toFixed(2)}%
                              </span>
                              <div>
                                <Progress
                                  max='100'
                                  value={maturityPercentage}
                                  barClassName={
                                    maturityPercentage > 80
                                      ? "bg-danger"
                                      : maturityPercentage > 50
                                      ? "bg-warning"
                                      : "bg-success"
                                  }
                                />
                              </div>
                            </div>
                          </td>
                          <td className='text-right'>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className='btn-icon-only text-light'
                                href='#pablo'
                                role='button'
                                size='sm'
                                color=''
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className='fas fa-ellipsis-v' />
                              </DropdownToggle>
                              <DropdownMenu
                                className='dropdown-menu-arrow'
                                right
                              >
                                {trade.isReported ? (
                                  <DropdownItem>Already Reported</DropdownItem>
                                ) : (
                                  <DropdownItem
                                    href='#pablo'
                                    onClick={(e) => {
                                      toggleModal();
                                      setReportId(trade.id);
                                    }}
                                  >
                                    Report
                                  </DropdownItem>
                                )}

                                <DropdownItem
                                  href='#pablo'
                                  onClick={(e) =>
                                    handleAddToWatchlist(trade.id)
                                  }
                                >
                                  Add to Watchlist
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>

                        <Modal
                          className='modal-dialog-centered'
                          isOpen={openDetailModal}
                          toggle={toggleDetailModal}
                        >
                          <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLabel'>
                              Trade Details
                            </h5>
                            <button
                              aria-label='Close'
                              className='close'
                              data-dismiss='modal'
                              type='button'
                              onClick={toggleDetailModal}
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>

                          <div className='modal-body' style={{display:"grid", gridTemplateColumns:"auto auto", rowGap:20}}>
                            <div className="grid-item"><strong>ISIN: </strong> {trade.security.ISIN}</div>
                            <div className="grid-item"><strong>CUSIP: </strong> {trade.security.CUSIP}</div>
                            <div className="grid-item"><strong>buy_sell: </strong> {trade.buy_sell}</div>
                            <div className="grid-item"><strong>tradeDate: </strong> {trade.tradeDate}</div>
                            <div className="grid-item"><strong>settlementDate: </strong>{" "} {trade.settlementDate}</div>
                            <div className="grid-item"><strong>quantity: </strong> {trade.quantity}</div>
                            <div className="grid-item"><strong>price: </strong> {trade.price}</div>
                            <div className="grid-item"><strong>issuer: </strong> {trade.security.issuer}</div>
                            <div className="grid-item"><strong>issuer: </strong> {trade.security.issuer}</div>
                            <div className="grid-item"><strong>coupon: </strong> {trade.security.coupon}</div>
                            <div className="grid-item"><strong>maturityDate: </strong>{" "} {trade.security.maturityDate}</div>
                            <div className="grid-item"><strong>faceValue: </strong>{" "} {trade.security.faceValue}</div>
                            <div className="grid-item"><strong>typeOfSecurity: </strong>{" "} {trade.security.typeOfSecurity}</div>
                            <div className="grid-item"><strong>status: </strong> {trade.security.status}</div>
                            <div className="grid-item"><strong>counterparty: </strong>{" "} {trade.counterparty.name}</div>
                            <div className="grid-item"><strong>Book: </strong> {trade.book.name}</div>
                          </div>

                          <div className='modal-footer'>
                            <Button
                              color='secondary'
                              data-dismiss='modal'
                              type='button'
                              onClick={toggleDetailModal}
                            >
                              Close
                            </Button>
                          </div>
                        </Modal>
                      </>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className='py-4'>
                <nav aria-label='...'>
                  <Pagination
                    className='pagination justify-content-end mb-0'
                    listClassName='justify-content-end mb-0'
                  >
                    <PaginationItem className='disabled'>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                        tabIndex='-1'
                      >
                        <i className='fas fa-angle-left' />
                        <span className='sr-only'>Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='active'>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className='sr-only'>(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className='fas fa-angle-right' />
                        <span className='sr-only'>Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}
      </Container>

      <Modal
        className='modal-dialog-centered'
        isOpen={openModal}
        toggle={toggleModal}
      >
        <div className='modal-header'>
          <h5 className='modal-title' id='exampleModalLabel'>
            Report to Authority
          </h5>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={toggleModal}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>

        <div className='modal-body'>
          <FormGroup>
            <label htmlFor='exampleFormControlSelect1'>
              Concerned Authority
            </label>
            <Input
              id='exampleFormControlSelect1'
              type='select'
              value={authority}
              onChange={(e) => setAuthority(e.target.value)}
            >
              <option value='' disabled>
                Select Authority
              </option>
              {AUTHORITY.map((authority, index) => {
                return (
                  <option key={index} value={authority}>
                    {authority}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <label htmlFor='exampleFormControlTextarea1'>Message</label>
            <Input
              className='form-control-alternative'
              id='exampleFormControlTextarea1'
              rows='3'
              type='textarea'
              placeholder="What's the issue?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormGroup>
        </div>

        <div className='modal-footer'>
          <Button
            color='secondary'
            data-dismiss='modal'
            type='button'
            onClick={toggleModal}
          >
            Close
          </Button>
          <Button color='primary' type='button' onClick={handleReportTrade}>
            Send
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Book;
