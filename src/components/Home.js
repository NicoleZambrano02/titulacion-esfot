import React from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import "../styles/home.css";
import {
  BookOutlined,
  CopyOutlined,
  LoginOutlined,
  QuestionCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Routes from "../constants/routes";
import withoutAuth from "../hocs/withoutAuth";

const { Title } = Typography;

const DemoBox = (props) => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

const HomePage = () => {
  return (
    <>
      <Row className="first-part">
        <Col span={24}>
          <DemoBox value={120}></DemoBox>
          <Title className="first-part">
            TITULACIÓN <strong>ESFOT</strong>
          </Title>

          {/*<Divider orientation="left"></Divider>*/}

          <p>
            Todo el proceso de titulación <br />
            digitalizado y en un solo lugar
          </p>
          <Button
            className="home-button"
            type="primary"
            icon={<LoginOutlined />}
            href={Routes.LOGIN}
          >
            Iniciar sesión
          </Button>
        </Col>
      </Row>
      <Row justify="center" className="second-part">
        <Col span={24}>
          <Title>ESTUDIANTES</Title>

          <Row justify="center">
            <Col span={6}>
              <Card
                className="items main-items"
                title="Listado de temas"
                bordered={false}
              >
                <div>
                  <UnorderedListOutlined className={"big-icon"} />
                </div>
                <br />
                Revisa los temas de titulación disponibles
                <br />
                <br />
                <Button
                  className="home-button"
                  type="primary"
                  href={Routes.TEACHERS_IDEAS}
                >
                  Ver temas
                </Button>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="items main-items"
                title="Ingresar al sistema"
                bordered={false}
              >
                <div>
                  <LoginOutlined className={"big-icon"} />
                </div>
                <br />
                Empieza tu proceso de titulación
                <br />
                <br />
                <Button
                  className="home-button"
                  type="primary"
                  href={Routes.LOGIN}
                >
                  Empezar
                </Button>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="items main-items"
                title="Dudas adicionales"
                bordered={false}
              >
                <div>
                  <QuestionCircleOutlined className={"big-icon"} />
                </div>
                <br />
                Escríbenos, con gusto te ayudaremos
                <br />
                <br />
                <Button className="home-button" type="primary">
                  Enviar mail
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify={"center"} className="third-part">
        <Col span={24}>
          <Title>PROFESORES</Title>
          <Row justify="center">
            <Col span={6}>
              <Card
                className="items main-items"
                title="Normativos"
                bordered={false}
                style={{ margin: "0 auto" }}
              >
                <div>
                  <BookOutlined className={"big-icon"} />
                </div>
                <br />
                Mira los normativos más importantes
                <br />
                <br />
                <Button
                  className="home-button"
                  type="primary"
                  href={"https://www.epn.edu.ec/index/normativos-docencia/"}
                >
                  Ver normativos
                </Button>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="items main-items"
                title="Ingresar al sistema"
                bordered={false}
              >
                <div>
                  <LoginOutlined className={"big-icon"} />
                </div>
                <br />
                Ingresa al sistema
                <br />
                <br />
                <br />
                <Button
                  className="home-button"
                  type="primary"
                  href={Routes.LOGIN}
                >
                  Empezar
                </Button>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="items main-items"
                title="Documentación"
                bordered={false}
              >
                <div>
                  <CopyOutlined className={"big-icon"} />
                </div>
                <br />
                Mira los documentos más importantes
                <br />
                <br />
                <Button
                  className="home-button"
                  type="primary"
                  href={
                    "https://esfot.epn.edu.ec/index.php/solicitudes/documentos-solicitudes"
                  }
                >
                  Ver documentos
                </Button>
              </Card>
            </Col>
          </Row>
          <br />
        </Col>
      </Row>
    </>
  );
};

export default withoutAuth(HomePage);
