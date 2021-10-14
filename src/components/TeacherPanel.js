import { Col, Row, Typography } from "antd";
import React, { useState } from "react";
import "../styles/teacher-panel.css";
import Table from "antd/es/table";
import Tag from "antd/es/tag";
import { useProjectsList } from "../data/useProjectsList";
import ShowError from "./ShowError";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/Auth";
import "../styles/home-teacher.css";
import SearchColumnFilter from "./SearchColumnFilter";
import PlanReviewCollapse from "./PlansReviewCollapse";

const { Title } = Typography;
const { Link } = Typography;

const TeacherPanel = () => {
  const [state, setState] = useState({
    idPlan: null,
    status: null,
    showPlanReview: false,
  });
  let location = useLocation();
  const { isAuthenticated } = useAuth();
  const { teachersProjects, isLoading, isError } = useProjectsList();

  const [menuState, setMenuState] = useState({
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: [],
  });
  //
  React.useEffect(() => {
    setMenuState({
      ...menuState,
      current: location.pathname,
    });
  }, [location, isAuthenticated]);

  const columns = [
    {
      title: "Nombre del Estudiante",
      dataIndex: "student_name",
      key: "student_name",
      width: 250,
      ...SearchColumnFilter("student_name"),
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
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 125,
      render: (status) => {
        let color = "";
        let name = "";
        {
          switch (status) {
            case "plan_saved":
              color = "orange";
              name = "Plan en desarrollo";
              break;

            case "plan_sent":
              color = "blue";
              name = "Por revisar";
              break;

            case "plan_corrections_done":
              color = "blue";
              name = "Correcciones de plan realizadas";
              break;

            case "plan_review_teacher":
              color = "orange";
              name = "Correcciones enviadas";
              break;

            case "plan_approved_director":
              color = "green";
              name = "Plan aprobado";
              break;

            case "plan_review_commission":
              color = "orange";
              name = "Correcciones de comisión enviadas";
              break;

            case "plan_corrections_done2":
              color = "blue";
              name = "Por revisar por comisión";
              break;

            case "plan_approved_commission":
              color = "green";
              name = "Plan aprobado por comisión";
              break;

            case "san_curriculum_1":
              color = "purple";
              name = "Curriculum saneado 1";
              break;

            case "san_curriculum_2":
              color = "purple";
              name = "Curriculum saneado 2";
              break;

            case "plan_rejected":
              color = "red";
              name = "Plan rechazado";
              break;

            case "project_uploaded":
              color = "cyan";
              name = "PDF por revisar";
              break;

            case "project_corrections_done":
              color = "cyan";
              name = "correcciones de PDF realizadas";
              break;

            case "project_review_teacher":
              color = "magenta";
              name = "Correcciones de PDF enviadas";
              break;

            case "project_approved_director":
              color = "green";
              name = "PDF aprobado";
              break;

            case "tribunal_assigned":
              color = "lime";
              name = "Tribunal asignado";
              break;

            case "project_graded":
              color = "yellow";
              name = "Proyecto calificado";
              break;

            case "project_corrections_done_2":
              color = "cyan";
              name = "Correcciones de PDF realizadas (tribunal)";
              break;

            case "project_approved_send":
              color = "cyan";
              name = "Aprobado para envío";
              break;

            case "test_defense_apt":
              color = "green";
              name = "Apto para defensa oral";
              break;

            case "date_defense_assigned":
              color = "geekblue";
              name = "Fecha de defensa asignada";
              break;

            case "project_completed":
              color = "gold";
              name = "Proyecto completado";
              break;

            case "project_rejected":
              color = "red";
              name = "Proyecto rechazado";
              break;

            default:
              break;
          }
          return (
            <Tag color={color} key={status}>
              {name.toUpperCase()}
            </Tag>
          );
        }
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

  const data = teachersProjects.map((project, index) => {
    return {
      key: index,
      title: project.title,
      student_name: project.student_name + " " + project.student_last_name,
      status: project.status,
      id: project.id,
    };
  });

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
                status: record.status,
                showPlanReview: true,
              });
            },
          };
        }}
      />
    );
  } else {
    content = (
      <PlanReviewCollapse planId={state.idPlan} status={state.status} />
    );
  }

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
            Director:
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>{titleTable}</Col>
      </Row>
      <Row>
        <Col>{content}</Col>
      </Row>
    </>
  );
};

export default TeacherPanel;
