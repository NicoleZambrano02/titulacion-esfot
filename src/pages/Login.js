import React from "react";
import Routes from "../constants/routes";
import { useAuth } from "../providers/Auth";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons/lib";
import withoutAuth from "../hocs/withoutAuth";
import { Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const { login } = useAuth();

  const onFinish = async (userData) => {
    login({
      email: userData.username,
      password: userData.password,
    });
  };

  return (
    <>
      {
        <Row justify="center" className="login">
          <Col span={8}>
            <div>
              <Form
                name="login-form"
                className="login-form"
                initialValues={{
                  remember: true,
                  username: "",
                  password: "",
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tu nombre de usuario",
                    },
                    {
                      type: "email",
                      message: "Ingresa un correo válido",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                    autoComplete="email"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tu clave",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    placeholder="Password"
                    autoComplete="password"
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Recordarme</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Link
                    className="login-form-forgot"
                    to={Routes.FORGET_PASSWORD}
                  >
                    ¡Olvidé mi clave!
                  </Link>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Ingresar
                  </Button>
                  <div>
                    <Link to={Routes.INDEX}>Regresar</Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      }
    </>
  );
};

export default withoutAuth(Login);
