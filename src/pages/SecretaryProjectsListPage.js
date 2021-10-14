import React, { useState } from "react";
import { Card, Col, Input, Row, Skeleton, Typography, Button } from "antd";
import "../styles/teacher-panel.css";
import Table from "antd/es/table";
import Tag from "antd/es/tag";
import ShowError from "../components/ShowError";
import { SearchOutlined } from "@ant-design/icons";
import "../styles/home-teacher.css";
import { useProjects } from "../data/useProjects";
import ProjectDetailSecretary from "../components/ProjectDetailSecretary";
import SubLayout from "../components/SubLayout";

const { Link } = Typography;
const { Title } = Typography;

const SecretaryProjectsListPage = () => {
  const { Search } = Input;
  const { projectsList, isLoading, isError } = useProjects();

  const [showProjectReview, setShowProjectReview] = useState(false);
  const [projectId, setProjectId] = useState(null);
  console.log("project", projectsList);

  if (isLoading) {
    return (
      <Row justify="center" gutter={30}>
        {[...new Array(9)].map((_, i) => (
          <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
            <div style={{ textAlign: "center" }}>
              <Skeleton.Image style={{ width: 200 }} />
              <Card title="" extra="" cover="" loading />
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  console.log("error", isError);

  if (isError) {
    return <ShowError error={isError} />;
  }

  const columns = [
    {
      title: "Director(a)",
      dataIndex: "teacher_name",
      key: "teacher_name",
    },
    {
      title: "Estudiante(s)",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          onClick={() => {
            setProjectId(record.id);
            setShowProjectReview(true);
          }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        let color = "";
        let name = "";
        {
          switch (value) {
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

            case "project_approved_send":
              color = "cyan";
              name = "Proyecto aprobado para envío";
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
            <Tag color={color} key={value}>
              {name.toUpperCase()}
            </Tag>
          );
        }
      },
    },
  ];

  let pagination = {
    current: 1,
    pageSize: 10,
    total: 10,
    showSizeChanger: false,
  };

  const getProjectsData = projectsList.map((project, index) => {
    return {
      key: index,
      id: project.id,
      teacher_name: `${project.teacher_name} ${project.teacher_lastName}`,
      student_name: `${project.student_name} ${project.student_last_name}`,
      title: project.title,
      status: project.status,
    };
  });

  const onSearch = (value) => console.log(value);
  let content = "";

  if (!showProjectReview) {
    content = (
      <SubLayout>
        <Row>
          <Col>
            <Title
              level={3}
              style={{
                color: "#034c70",
                marginLeft: -30,
              }}
            >
              Planes y proyectos de titulación:
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Search
              placeholder="búsqueda de tema o estudiantes"
              onSearch={onSearch}
              enterButton=<Button
                style={{
                  backgroundColor: "#034c70",
                  color: "white",
                }}
                icon={<SearchOutlined />}
              />
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Table columns={columns} dataSource={getProjectsData} />
          </Col>
        </Row>
      </SubLayout>
    );
  } else {
    content = (
      <SubLayout>
        <ProjectDetailSecretary id={projectId} />
      </SubLayout>
    );
  }

  return content;
};

export default SecretaryProjectsListPage;
