import React, { useState } from "react";
import { useAuth } from "../providers/Auth";
import { Button, Col, Form, Input, Row } from "antd";
import { UserOutlined } from "@ant-design/icons/lib";
import { message } from "antd";
import { Link, useHistory } from "react-router-dom";
import "../styles/login.css";
import Routes from "../constants/routes";

const SendPasswordResetEmailPage = () => {
  const { sendPasswordResetEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSendEmail = async ({ email }) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(email);
      setLoading(false);
      message.success(
        "Te hemos enviado un correo con instrucciones para restablecer tu clave."
      );
      history.push("/");
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
        message.error("Por favor ingresa un correo registrado");
      }
      console.log(error.config);
    }
  };

  return (
    <>
      {
        <Row justify="center" className="sendPasswordResetEmail">
          <Col span={8}>
            <div>
              <Form
                name="sendPasswordResetEmail-form"
                className="sendPasswordResetEmail-form"
                initialValues={{
                  remember: true,
                  email: "",
                }}
                onFinish={onSendEmail}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tu el correo registrado",
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

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="sendPasswordResetEmail-form-button"
                    disabled={loading}
                  >
                    Enviar
                  </Button>
                  <div>
                    <Link to={Routes.LOGIN}>Regresar</Link>
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

export default SendPasswordResetEmailPage;
