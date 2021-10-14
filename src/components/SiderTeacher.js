import React from "react";
import { Card, Layout, Typography } from "antd";
import { useProjectsList } from "../data/useProjectsList";
import Loading from "./Loading";
import ShowError from "./ShowError";

const { Sider } = Layout;
const { Title } = Typography;

const SiderTeacher = ({ user }) => {
  const { teachersProjects, isLoading, isError } = useProjectsList();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ShowError />;
  }

  const plansReview = teachersProjects.filter(
    (project) =>
      project.status === "plan_sent" ||
      project.status === "plan_corrections_done"
  );

  const projectsReview = teachersProjects.filter(
    (project) =>
      project.status === "project_uploaded" ||
      project.status === "project_corrections_done" ||
      project.status === "project_corrections_done_2"
  );

  const projectsTribunal = teachersProjects.filter(
    (project) => project.status === "tribunal_assigned"
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
        title="Tesis dirigidas"
        bordered={false}
      >
        <Title level={2}>{teachersProjects.length}</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Planes por revisar"
        bordered={false}
      >
        <Title level={2}>{plansReview.length}</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Proyectos por revisar"
        bordered={false}
      >
        <Title level={2}>{projectsReview.length}</Title>
      </Card>

      {user.jury_id !== null && (
        <>
          <Title level={3} style={{ color: "#034c70" }}>
            Jurado
          </Title>

          <Card
            className={"statistics-content"}
            title="Proyectos por revisar"
            bordered={false}
          >
            <Title level={2}>{projectsTribunal.length}</Title>
          </Card>
        </>
      )}
    </Sider>
  );
};

export default SiderTeacher;
