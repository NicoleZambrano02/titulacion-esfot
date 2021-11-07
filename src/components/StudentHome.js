import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, Modal, Row, Space, Typography } from "antd";
import {
  CheckCircleOutlined,
  CopyOutlined,
  FileTextOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import Routes from "../constants/routes";
import { Link } from "react-router-dom";
import withAuth from "../hocs/withAuth";
import "../styles/home-student.css";
import { useStudentProject } from "../data/useStudentProjects";
import Loading from "../components/Loading";
import API from "../data";
import { useJuries } from "../data/useJuries";

const { Title } = Typography;

const StudentHomePage = () => {
  const { projects, isLoading } = useStudentProject();
  const { juries, isLoadingJuries } = useJuries();
  const [modalVisible, setModalVisible] = useState(false);
  let schedule;

  if (isLoading) {
    return <Loading />;
  }

  if (isLoadingJuries) {
    return <Loading />;
  }

  if (projects[0] && projects[0].status === "date_defense_assigned") {
    for (let i = 0; i < juries.length; i++) {
      if (juries[i].project.id === projects[0].id) {
        schedule = juries[i].tribunalSchedule;
      }
    }
  }

  const getJuryInfo = () => {
    setModalVisible(true);
  };

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
                className="options main-options"
                title="Plan de titulación"
                bordered={false}
              >
                <Space direction="vertical" size="large">
                  <div>
                    <FileTextOutlined className={"big-icon"} />
                  </div>
                  <div>Registra tu plan de titulación</div>
                  <div>
                    <Button>
                      <Link to={Routes.PLAN_FORM}>Registrar plan</Link>
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={6}>
              <Card
                className="options main-options"
                title="Proyecto de titulación"
                bordered={false}
              >
                <Space direction="vertical" size="large">
                  <div>
                    <CopyOutlined className={"big-icon"} />
                  </div>
                  <div>Sube tu proyecto de titulación</div>
                  <div>
                    <Button
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_approved_commission" ||
                          projects[0].status === "project_uploaded" ||
                          projects[0].status === "project_review_teacher" ||
                          projects[0].status === "project_corrections_done" ||
                          projects[0].status === "project_approved_director" ||
                          projects[0].status === "san_curriculum_2" ||
                          projects[0].status === "tribunal_assigned" ||
                          projects[0].status === "project_graded" ||
                          projects[0].status === "project_corrections_done_2" ||
                          projects[0].status === "project_approved_send" ||
                          projects[0].status === "test_defense_apt" ||
                          projects[0].status === "date_defense_assigned" ||
                          projects[0].status === "project_completed"
                        )
                      }
                    >
                      <Link to={Routes.PROJECT_UPLOAD}>Subir proyecto</Link>
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={6}>
              <Card
                className="options main-options"
                title="Defensa de grado"
                bordered={false}
              >
                <Space direction="vertical" size="large">
                  <div>
                    <FileTextOutlined className={"big-icon"} />
                  </div>
                  <div>Mira la fecha de tu defensa de grado</div>
                  <div>
                    <Button
                      disabled={
                        !projects[0] ||
                        projects[0].status !== "date_defense_assigned"
                      }
                      onClick={getJuryInfo}
                    >
                      Ver fecha
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
                  <div>
                    Mira posibles temas de titulación propuestos por los
                    docentes de la ESFOT
                  </div>
                  <div>
                    <Button>
                      <Link to={Routes.TEACHERS_IDEAS}>Ver temas</Link>
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} className="options resources-options">
                <Space direction="vertical" size="large">
                  <div>Mira las normativas de titulación de la EPN</div>
                  <div>
                    <Button
                      style={{ marginTop: 25 }}
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
                      style={{ marginTop: 25 }}
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
          </Row>
        </Col>
      </Row>
      <Modal
        visible={modalVisible}
        icon={<CheckCircleOutlined />}
        title={
          <Title level={3} style={{ color: "#034c70" }}>
            ¡Buen trabajo!
          </Title>
        }
        okText="Entendido"
        closable={true}
        destroyOnClose={true}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        okButtonProps={{
          style: {
            backgroundColor: "#034c70",
            marginRight: 200,
          },
        }}
        cancelButtonProps={{ hidden: true }}
      >
        <>
          <Row justify="center">
            <Col>
              <Image src="boy.png" width={100} />
              <Image src="girl.png" width={100} />
            </Col>
          </Row>

          <Row justify="center">
            <Col>
              <p
                style={{
                  color: "#034c70",
                  fontSize: 18,
                }}
              >
                <br />
                La fecha asignada para tu defensa oral es:
                <br />
                {schedule}
              </p>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
};

export default withAuth(StudentHomePage);
