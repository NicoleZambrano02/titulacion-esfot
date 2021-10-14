import React from "react";
import { Layout, Steps, Typography } from "antd";
import { useStudentProject } from "../data/useStudentProjects";
import Loading from "./Loading";

const { Step } = Steps;
const { Title } = Typography;
const { Sider } = Layout;

const SiderStudent = () => {
  const { projects, isLoading, isError } = useStudentProject();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  console.log(projects);

  const projectStatus = projects.length > 0 ? projects[0].status : "";
  const numbers =
    projects.length === 0 ||
    projectStatus === "plan_saved" ||
    projectStatus === "plan_rejected" ||
    projectStatus === "project_rejected" ||
    projectStatus === "plan_review_teacher"
      ? 0
      : projectStatus === "plan_sent" ||
        projectStatus === "plan_corrections_done"
      ? 1
      : projectStatus === "plan_approved_director"
      ? 2
      : projectStatus === "san_curriculum_1"
      ? 3
      : projectStatus === "plan_review_commission" ||
        projectStatus === "plan_corrections_done2"
      ? 4
      : projectStatus === "plan_approved_commission" ||
        projectStatus === "project_review_teacher"
      ? 5
      : projectStatus === "project_uploaded" ||
        projectStatus === "project_corrections_done"
      ? 6
      : projectStatus === "project_approved_director"
      ? 7
      : projectStatus === "san_curriculum_2"
      ? 8
      : projectStatus === "tribunal_assigned"
      ? 9
      : projectStatus === "project_graded"
      ? 10
      : projectStatus === "project_corrections_done_2"
      ? 11
      : projectStatus === "project_approved_send"
      ? 12
      : projectStatus === "test_defense_apt"
      ? 13
      : projectStatus === "date_defense_assigned"
      ? 14
      : 15;

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
        Progreso
      </Title>
      <Steps current={numbers} direction="vertical">
        <Step description="Plan enviado" />
        <Step description="Plan aprobado por director" />
        <Step description="Curriculum saneado 1" />
        <Step description="Plan revisado por comisión" />
        <Step description="Plan aprobado por comisión" />
        <Step description="Proyecto de titulación subido" />
        <Step description="Proyecto aprobado por director" />
        <Step description="Curriculum saneado 2" />
        <Step description="Tribunal asignado" />
        <Step description="Proyecto de titulación calificado (documento)" />
        <Step description="Proyecto corregido (correcciones del tribunal)" />
        <Step description="Proyecto aprobado (envío)" />
        <Step description="Declarado apto para defensa oral" />
        <Step description="Fecha de defensa asignada" />
        <Step description="¡Proyecto completado!" />
      </Steps>
    </Sider>
  );
};

export default SiderStudent;
