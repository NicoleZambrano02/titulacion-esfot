import React from "react";
import { Card, Layout, Typography } from "antd";

const { Sider } = Layout;
const { Title } = Typography;

const SiderSecretary = ({ projectsList }) => {
  const projectsSanCurriculum = projectsList.filter(
    (project) => project.status === "plan_approved_director"
  );
  const projectsCommissionReview = projectsList.filter(
    (project) =>
      project.status === "san_curriculum_1" ||
      project.status === "plan_corrections_done2"
  );
  const projectsSanCurriculum2 = projectsList.filter(
    (project) => project.status === "project_approved_director"
  );
  const projectsRegisterSaew = projectsList.filter(
    (project) => project.status === "plan_approved_director"
  );
  const projectsTestDefenseApt = projectsList.filter(
    (project) => project.status === "project_graded"
  );
  const projectsCompleted = projectsList.filter(
    (project) => project.status === "project_completed"
  );

  return (
    <Sider
      theme="light"
      width={300}
      style={{
        backgroundColor: "#dddddd",
        padding: 40,
      }}
    >
      <Title level={3} style={{ color: "#034c70" }}>
        Planes
      </Title>
      <Card
        className={"statistics-content"}
        title="Por revisar para ingreso a revisión de comisión"
        bordered={false}
      >
        <Title level={2}>{projectsSanCurriculum.length}</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Por registrar en SAEW"
        bordered={false}
      >
        <Title level={2}>{projectsRegisterSaew.length}</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Planes por revisar en comisión"
        bordered={false}
      >
        <Title level={2}>{projectsCommissionReview.length}</Title>
      </Card>

      <Title level={3} style={{ color: "#034c70", marginTop: 20 }}>
        Proyectos
      </Title>

      <Card
        className={"statistics-content"}
        title="Por revisar para asignar tribunal"
        bordered={false}
      >
        <Title level={2}>{projectsSanCurriculum2.length}</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Por revisar para asignar fecha de grado oral"
        bordered={false}
      >
        <Title level={2}>{projectsTestDefenseApt.length}</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Por enviar carpeta a Vicerrectorado"
        bordered={false}
      >
        <Title level={2}>{projectsCompleted.length}</Title>
      </Card>
    </Sider>
  );
};

export default SiderSecretary;
