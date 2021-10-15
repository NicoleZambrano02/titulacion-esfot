import React, { useState } from "react";
import { useTeachersIdeasList } from "../data/useTeachersIdeasList";
import Loading from "./Loading";
import { Col, Layout, Modal, Row, Table, Typography } from "antd";
import SearchColumnFilter from "./SearchColumnFilter";
import { useAuth } from "../providers/Auth";
import { useLocation } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

const TeachersIdeasList = () => {
  const { ideas, isLoading, isError } = useTeachersIdeasList();
  let location = useLocation();

  const { isAuthenticated } = useAuth();
  const [menuState, setMenuState] = useState({
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: [],
  });

  React.useEffect(() => {
    setMenuState({
      ...menuState,
      current: location.pathname,
    });
  }, [location, isAuthenticated]);

  const openModalInFo = (text, record) => {
    console.log(text, record);
    Modal.info({
      title: "Tema propuesto por docente ESFOT",
      content: (
        <div>
          <Row>
            <Col>
              <p>
                <strong>Tema: </strong>
              </p>
            </Col>
            <Col style={{ paddingLeft: 5 }}>
              <p> {record.title}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <strong>Problema a resolver: </strong>
              </p>
            </Col>
            <Col style={{ paddingLeft: 5 }}>
              <p> {record.problem}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <strong>Solución: </strong>
              </p>
            </Col>
            <Col style={{ paddingLeft: 5 }}>
              <p> {record.solution}</p>
            </Col>
          </Row>
          <p>
            Contáctate directamente con el profesor a cargo para indicarle que
            deseas realizar este tema de titulación
          </p>
        </div>
      ),
      width: 500,
      okButtonProps: {
        style: {
          backgroundColor: "#034c70",
          marginRight: 130,
        },
        href: "https://outlook.office.com/",
        target: "_blank",
      },
      okText: "Enviar e-mail al profesor",
      maskClosable: true,
      centered: true,
    });
  };

  const columns = [
    {
      title: "Título del proyecto",
      dataIndex: "title",
      key: "title",
      width: 500,
      ...SearchColumnFilter("title"),
      render: (text, record) => (
        <a
          onClick={() => {
            openModalInFo(text, record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Profesor",
      dataIndex: "teacher_name",
      key: "teacher_name",
      width: 225,
      ...SearchColumnFilter("teacher_name"),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  const data = ideas.map((idea, index) => {
    return {
      key: index,
      title: idea.title,
      teacher_name: idea.teacher_name,
      problem: idea.problem,
      solution: idea.solution,
    };
  });

  return (
    <>
      <Layout>
        <Content
          style={{
            padding: 50,
            marginTop: -65,
          }}
        >
          <Row>
            <Col>
              <Title level={3} style={{ color: "#034c70" }}>
                Temas para proyectos de titulación propuestos por docentes ESFOT
              </Title>
            </Col>
          </Row>
          <br />
          <Row justify="center">
            <Col>
              <Table columns={columns} dataSource={data} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default TeachersIdeasList;
