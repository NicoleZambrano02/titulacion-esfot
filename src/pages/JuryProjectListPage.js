import React from "react";
import SubLayout from "../components/SubLayout";
import ProjectsListStatus from "../components/ProjectsListStatus";
import Loading from "../components/Loading";
import ShowError from "../components/ShowError";
import { useJuries } from "../data/useJuries";
import { useAuth } from "../providers/Auth";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const JuryProjectsListPage = () => {
  const { juries, isLoading, isError } = useJuries();
  const { currentUser } = useAuth();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ShowError />;
  }

  let project = {};
  let juriesList = [];
  juriesList = juries.map((jury) => {
    for (let i = 0; i < jury.teachers.data.length; i++) {
      if (jury.teachers.data[i].id === currentUser.userable.id) {
        project = {
          originalData: jury.project,
          title: jury.project.title,
          student_name: `${jury.project.student_name} ${jury.project.student_last_name}`,
          teacher_name: `${jury.project.teacher_name} ${jury.project.teacher_lastName}`,
          created_at: jury.project.created_at,
          status: jury.project.status,
          tribunalSchedule: jury.tribunalSchedule,
        };
      }
    }
    return project;
  });

  return (
    <SubLayout>
      <Row>
        <Col>
          <Title level={4} style={{ color: "#034c70", fontSize: 50 }}>
            Proyectos Tribunal
          </Title>
        </Col>
      </Row>
      <ProjectsListStatus projectsList={juriesList} isTribunal={true} />
    </SubLayout>
  );
};

export default JuryProjectsListPage;
