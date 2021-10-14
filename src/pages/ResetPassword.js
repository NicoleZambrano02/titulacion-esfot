import React, { useState } from "react";
import Routes from "../constants/routes";
import { useAuth } from "../providers/Auth";
import { Button, Col, Form, Input, message, Row } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons/lib";
import withoutAuth from "../hocs/withoutAuth";
import { useHistory, useLocation } from "react-router-dom";

import "../styles/login.css";

const ResetPasswordPage = () => {
  const location = useLocation();
  const history = useHistory();
  let token;
  const { confirmPasswordReset } = useAuth();
  const [loading, setLoading] = useState(false);

  const onResetPassword = async ({
    email,
    password,
    password_confirmation,
  }) => {
    token = location.pathname.split("/");
    try {
      setLoading(true);
      await confirmPasswordReset(
        email,
        password,
        password_confirmation,
        token[2]
      );
      setLoading(false);
      message.success(
        "Tu clave se ha restablecido correctamente, puedes iniciar sesión"
      );
      history.push(Routes.LOGIN);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        message.error(
          `No se guardaron los datos:¨${error.response.data.status}`
        );

        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        message.error("Ocurrió un error al realizar la petición.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        message.error("Ocurrió un error desconocido :(");
      }
      console.log(error.config);
    }
  };

  return (
    <>
      {
        <Row justify="center" className="onResetPassword">
          <Col span={8}>
            <div>
              <Form
                name="onResetPassword-form"
                className="onResetPassword-form"
                initialValues={{
                  remember: true,
                  email: "",
                  password: "",
                }}
                onFinish={onResetPassword}
              >
                <Form.Item
                  name="email"
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

                <Form.Item
                  name="password_confirmation"
                  rules={[
                    {
                      required: true,
                      message: "Confirmar contraseña",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    placeholder="Password Confirmation"
                    autoComplete="password_confirmation"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="onResetPassword-form-button"
                    disabled={loading}
                  >
                    Enviar
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      }
    </>
  );
};

export default withoutAuth(ResetPasswordPage);
