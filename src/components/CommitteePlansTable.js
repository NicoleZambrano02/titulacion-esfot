import React, { useState } from "react";
import { Col, Row, Table, Tag, Typography } from "antd";
import "../styles/home-teacher.css";
import { useProjects } from "../data/useProjects";
import Loading from "./Loading";
import SearchColumnFilter from "./SearchColumnFilter";
import PlanReviewCommittee from "./PlanReviewCommittee";

const { Title } = Typography;
const { Link } = Typography;

const CommitteePlansTable = () => {
  const [state, setState] = useState({
    idPlan: null,
    showPlanReview: false,
  });

  const { projectsList, isLoading, isError } = useProjects();
  const columns = [
    {
      key: "students",
      dataIndex: "students",
      title: "Estudiante(s)",
      width: 250,
      ...SearchColumnFilter("students"),
    },
    {
      title: "Tema",
      dataIndex: "title",
      key: "title",
      width: 800,
      ...SearchColumnFilter("title"),
      render: (text) => <Link>{text}</Link>,
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Estado",
      width: 125,
      render: (status) => {
        let state = "";
        let color = "";
        switch (status) {
          case "san_curriculum_1":
            state = "Por revisar";
            color = "red";
            break;

          case "plan_corrections_done2":
            state = "Correcciones realizadas";
            color = "purple";
            break;

          case "plan_review_commission":
            state = "Correcciones enviadas";
            color = "blue";
            break;

          case "plan_approved_commission":
            state = "Plan aprobado";
            color = "green";
            break;

          default:
            break;
        }
        return (
          <Tag color={color} key={status}>
            {state.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h1>Error</h1>;
  }

  const data = [];

  for (let i = 0; i < projectsList.length; i++) {
    if (
      projectsList[i].status === "san_curriculum_1" ||
      projectsList[i].status === "plan_review_commission" ||
      projectsList[i].status === "plan_corrections_done2" ||
      projectsList[i].status === "plan_approved_commission"
    ) {
      data.push({
        key: projectsList[i].id,
        title: projectsList[i].title,
        status: projectsList[i].status,
        students: `${projectsList[i].student_name} ${projectsList[i].student_last_name}`,
        id: projectsList[i].id,
      });
    }
  }

  let content = "";
  let titleTable = "";
  if (!state.showPlanReview) {
    titleTable = (
      <Title level={3} style={{ color: "#034c70" }}>
        Planes y proyectos de titulación
      </Title>
    );

    content = (
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(data) => data.id}
        onRow={(record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
              setState({
                idPlan: record.id,
                showPlanReview: true,
              });
            },
          };
        }}
      />
    );
  } else {
    content = <PlanReviewCommittee idPlan={state.idPlan} />;
  }

  return (
    <>
      <Row>
        <Col>{titleTable}</Col>
      </Row>
      <Row justify="center">
        <Col>{content}</Col>
      </Row>
    </>
  );
};

export default CommitteePlansTable;
