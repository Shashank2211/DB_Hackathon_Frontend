// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useState } from "react";
import { loginApi } from "../../api/auth-api";
import { useAlert } from "../../utils/AlertProvider";
import { setStorage } from "utils/Storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const { showAlert } = useAlert();

  const handleLogin = async () => {
    setIsProcessing(true);
    console.log(email, password, remember);
    const res = await loginApi(email, password);
    if (res.success) {
      showAlert(res.message, "success");
      setStorage("token", res.token);
      window.location.href = "/admin/dashboard";
    } else {
      showAlert(res.message, "danger");
    }
    setIsProcessing(false);
  };

  return (
    <>
      <Col lg='5' md='7'>
        <Card className='bg-secondary shadow border-0'>
          <CardBody className='px-lg-5 py-lg-5'>
            <div className='text-center text-muted mb-4'>
              <small>Sign in with credentials</small>
            </div>
            <Form role='form'>
              <FormGroup className='mb-3'>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-email-83' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder='Username'
                    type='email'
                    autoComplete='new-email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-lock-circle-open' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder='Password'
                    type='password'
                    autoComplete='new-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className='custom-control custom-control-alternative custom-checkbox'>
                <input
                  className='custom-control-input'
                  id=' customCheckLogin'
                  type='checkbox'
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label
                  className='custom-control-label'
                  htmlFor=' customCheckLogin'
                >
                  <span className='text-muted'>Remember me</span>
                </label>
              </div>
              <div className='text-center'>
                {isProcessing ? (
                  <Button className='my-4' color='primary' type='button'>
                    Loading
                  </Button>
                ) : (
                  <Button
                    className='my-4'
                    color='primary'
                    type='button'
                    onClick={handleLogin}
                  >
                    Sign in
                  </Button>
                )}
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
