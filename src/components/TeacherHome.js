import React from "react";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import "../styles/home-teacher.css";
import {
  BarsOutlined,
  BulbOutlined,
  CheckOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import Routes from "../constants/routes";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/Auth";
import withAuth from "../hocs/withAuth";

const { Title } = Typography;

const TeacherHomePage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Row>
        <Col>
          <Title
            level={3}
            style={{
              color: "#034c70",
              marginLeft: -30,
            }}
          >
            Panel Principal:
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Row justify="center">
            <Col span={6}>
              <Card
                className={"options main-options"}
                title="Director"
                bordered={false}
              >
                <Space direction="vertical" size="large">
                  <div>
                    <BulbOutlined className={"big-icon"} />
                  </div>
                  <div>
                    Revisa los planes y proyectos de titulación que diriges
                  </div>
                  <div>
                    <Button>
                      <Link to={Routes.TEACHER_PANEL}>Ver proyectos</Link>
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={6}>
              <Card
                className={"options main-options"}
                title="Jurado calificador"
                bordered={false}
              >
                <Space direction="vertical" size="large">
                  <div>
                    <BarsOutlined className={"big-icon"} />
                  </div>
                  <div>Revisa los proyectos como jurado</div>
                  <div>
                    <Button>
                      <Link to={Routes.JURY_PROJECTS_LIST}>Ver proyectos</Link>
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={6}>
              <Card
                className={"options main-options"}
                title="Listado de temas"
                bordered={false}
              >
                <Space direction="vertical" size="large">
                  <div>
                    <CheckOutlined className={"big-icon"} />
                  </div>
                  <div>Registrar propuestas de temas</div>
                  <div>
                    <Button>
                      <Link to={Routes.TEACHERS_PLANS}>Registrar temas</Link>
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ marginTop: 120 }}>
        <Col>
          <Title
            level={3}
            style={{
              color: "#034c70",
              marginLeft: -30,
            }}
          >
            Otros recursos:
          </Title>
        </Col>
      </Row>

      <Row style={{ marginTop: 75 }}>
        <Col span={24}>
          <Row justify="center">
            <Col span={6}>
              <Card bordered={false} className="options resources-options">
                <Space direction="vertical" size="large">
                  <div>Mira las normativas de titulación de la EPN</div>
                  <div>
                    <Button
                      href={
                        "https://esfot.epn.edu.ec/index.php/unidad-titulacion/normativa-proyectos-titulacion"
                      }
                    >
                      Ver normativas
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} className="options resources-options">
                <Space direction="vertical" size="large">
                  <div>Mira los formatos de titulación de la EPN</div>
                  <div>
                    <Button
                      href={
                        "https://esfot.epn.edu.ec/index.php/solicitudes/documentos-solicitudes"
                      }
                    >
                      Ver formatos
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={6} />
          </Row>
        </Col>
      </Row>
      {currentUser.commission_id !== null && (
        <>
          <Row style={{ marginTop: 120 }}>
            <Col>
              <Title
                level={3}
                style={{
                  color: "#034c70",
                  marginLeft: -30,
                }}
              >
                Comisión titulación:{" "}
              </Title>
            </Col>
          </Row>

          <Row style={{ marginTop: 75 }}>
            <Col span={24}>
              <Row justify="center">
                <Col span={6}>
                  <Card
                    className={"options main-options"}
                    title="Planes Comisión"
                    bordered={false}
                  >
                    <Space direction="vertical" size="large">
                      <div>
                        <SelectOutlined className={"big-icon"} />
                      </div>
                      <div>
                        Revisa los planes que llegan a la comisión de titulación
                      </div>
                      <div>
                        <Button href={Routes.COMMITTEE_PLANS}>
                          Ver planes
                        </Button>
                      </div>
                    </Space>
                  </Card>
                </Col>
                <Col span={6} />
                <Col span={6} />
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default withAuth(TeacherHomePage);
