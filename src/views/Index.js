import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import { dashboard } from "api/user-api.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const [totalTrades, setTotalTrades] = useState(0);
  const [volume, setVolume] = useState(0);
  const [critialTrades, setCriticalTrades] = useState(0);
  const [mediumRisk, setMediumRisk] = useState(0);
  const [critialDistribution, setCriticalDistribution] = useState({});
  const [settlementDistribution, setSettlementDistribution] = useState({});
  const [settlementDistributionByYear, setSettlementDistributionByYear] =
    useState({});

  const fetchData = async () => {
    const response = await dashboard();
    if (response.success) {
      setTotalTrades(response.data.totalTrades);
      setVolume(response.data.volume);
      setCriticalTrades(response.data.critialTrades);
      setMediumRisk(response.data.mediumRisk);
      setCriticalDistribution(response.data.critialDistribution);
      setSettlementDistribution(response.data.settlementDistribution);
      setSettlementDistributionByYear(
        response.data.settlementDistributionByYear
      );
    }
  };

  console.log(settlementDistribution);
  console.log(settlementDistributionByYear);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header
        redFlag={critialTrades}
        orangeFlag={mediumRisk}
        totalTrades={totalTrades}
        totalVolume={volume}
      />
      {/* Page content */}
      <Container className='mt--7' fluid>
        <Row>
          <Col className='mb-5 mb-xl-0' xl='8'>
            <Card className='bg-gradient-default shadow'>
              <CardHeader className='bg-transparent'>
                <Row className='align-items-center'>
                  <div className='col'>
                    <h6 className='text-uppercase text-light ls-1 mb-1'>
                      Overview
                    </h6>
                    <h2 className='text-white mb-0'>Sales value</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className='chart'>
                  <Line
                    data={{
                      labels: Object.keys(settlementDistributionByYear),
                      datasets: [
                        {
                          label: "Settlements",
                          data: Object.values(settlementDistributionByYear),
                        },
                      ],
                    }}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl='4'>
            <Card className='shadow'>
              <CardHeader className='bg-transparent'>
                <Row className='align-items-center'>
                  <div className='col'>
                    <h6 className='text-uppercase text-muted ls-1 mb-1'>
                      Performance
                    </h6>
                    <h2 className='mb-0'>Critical Trades Distribution</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className='chart'>
                  <Bar
                    data={{
                      labels: Object.keys(critialDistribution),
                      datasets: [
                        {
                          label: "Critical Trades",
                          data: Object.values(critialDistribution),
                          maxBarThickness: 10,
                        },
                      ],
                    }}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
