import React from "react";
import withAuth from "../hocs/withAuth";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { BarsOutlined, BulbOutlined, CheckOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Routes from "../constants/routes";

const { Title } = Typography;

const AdministrativeHome = () => {
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
                title="Tribunal"
                bordered={false}
              >
                <Space direction="vertical" size="large">
                  <div>
                    <BulbOutlined className={"big-icon"} />
                  </div>
                  <div>Proyectos por asignar tribunal</div>
                  <div>
                    <Button>
                      <Link
                        to={{
                          pathname: Routes.ADMINISTRATIVE_PANEL,
                          state: { assignTribunal: true },
                        }}
                      >
                        Ver proyectos
                      </Link>
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={6}>
              <Card
                className={"options main-options"}
                title="Fecha defensa"
                bordered={false}
              >
                <Space direction="vertical" size="large">
                  <div>
                    <BarsOutlined className={"big-icon"} />
                  </div>
                  <div>Asignación fecha de defensa</div>
                  <div>
                    <Button>
                      <Link
                        to={{
                          pathname: Routes.ADMINISTRATIVE_PANEL,
                          state: { assignDate: true },
                        }}
                      >
                        Asignar
                      </Link>
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={6}>
              <Card
                className={"options main-options"}
                title="Proyectos"
                bordered={false}
              >
                <Space direction="vertical" size="large">
                  <div>
                    <CheckOutlined className={"big-icon"} />
                  </div>
                  <div>Historial de proyectos</div>
                  <div>
                    <Button>
                      <Link
                        to={{
                          pathname: Routes.ADMINISTRATIVE_PANEL,
                          state: { allProjects: true },
                        }}
                      >
                        Ver proyectos
                      </Link>
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
    </>
  );
};

export default withAuth(AdministrativeHome);
