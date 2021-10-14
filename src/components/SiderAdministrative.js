import React from "react";
import { Card, Layout, Typography } from "antd";

const { Sider } = Layout;
const { Title } = Typography;

const SiderAdministrative = ({ projectsList }) => {
  const projectsToAssignTribunal = projectsList.filter(
    (project) => project.status === "san_curriculum_2"
  );
  const projectsToAssignDefenseDate = projectsList.filter(
    (project) => project.status === "test_defense_apt"
  );
  const projects = projectsList.filter(
    (project) =>
      !(
        project.status === "plan_rejected" ||
        project.status === "project_rejected" ||
        project.status === "project_completed"
      )
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
        Director
      </Title>
      <Card
        className={"statistics-content"}
        title="Proyectos sin tribunal"
        bordered={false}
      >
        <Title level={2}>{projectsToAssignTribunal.length}</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Proyectos sin defensa asignada"
        bordered={false}
      >
        <Title level={2}>{projectsToAssignDefenseDate.length}</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Proyectos en curso"
        bordered={false}
      >
        <Title level={2}>{projects.length}</Title>
      </Card>
    </Sider>
  );
};

export default SiderAdministrative;
