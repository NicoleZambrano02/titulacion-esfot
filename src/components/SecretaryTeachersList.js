import { Button, Col, Row, Typography, Modal } from "antd";
import React, { useState } from "react";
import "../styles/teacher-panel.css";
import Table from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import "../styles/home-teacher.css";
import SearchColumnFilter from "./SearchColumnFilter";
import { useTeachers } from "../data/useTeachers";
import Loading from "./Loading";
import ShowError from "./ShowError";
import SecretaryAddTeacherForm from "./SecretaryAddTeacherForm";
import SecretaryUpdateTeacherForm from "./SecretaryUpdateTeacherForm";
import { useAuth } from "../providers/Auth";

const { Title } = Typography;

const SecretaryTeachersList = () => {
  let location = useLocation();
  const { isAuthenticated } = useAuth();
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const { teachers, isLoading, isError } = useTeachers();
  const [updateTeacher, setUpdateTeacher] = useState();
  const [updateTeacherId, setUpdateTeacherId] = useState();

  const [menuState, setMenuState] = useState({
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: [],
  });

  const showModal = () => {
    setVisible(true);
  };

  React.useEffect(() => {
    setMenuState({
      ...menuState,
      current: location.pathname,
    });
  }, [location, isAuthenticated]);

  // Columnas y datos para la tabla

  const columns = [
    {
      title: "Profesor",
      dataIndex: "name",
      key: "name",
      width: 550,
      ...SearchColumnFilter("name"),
    },
    {
      title: "Carrera",
      dataIndex: "career",
      key: "career",
      width: 250,
      ...SearchColumnFilter("career"),
    },
    {
      title: "Correo Electrónico",
      dataIndex: "email",
      key: "email",
      width: 550,
      ...SearchColumnFilter("email"),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

  //Consumo de datos de la base
  const getTeachersData = teachers.map((teacher, index) => {
    return {
      key: index,
      id: teacher.id,
      originalData: teacher,
      name: teacher.name + " " + teacher.last_name,
      last_name: teacher.last_name,
      career: teacher.career,
      email: teacher.email,
      schedule: teacher.schedule,
    };
  });

  let content = "";
  let titleTable = "";
  let titleModal = "";
  let titleModalEdit = "";

  titleTable = (
    <Title level={3} style={{ color: "#034c70", fontSize: 50 }}>
      Listado de profesores
    </Title>
  );

  content = (
    <Table
      dataSource={getTeachersData}
      columns={columns}
      rowKey={(data) => data.id}
      onRow={(record) => {
        return {
          onClick: (event) => {
            event.stopPropagation();
            setVisibleEdit(true);
            setUpdateTeacher(record.originalData);
            setUpdateTeacherId(record.id);
          },
        };
      }}
      style={{ overflowX: "auto" }}
    />
  );

  titleModal = (
    <Title level={3} style={{ color: "#034c70" }}>
      Agregar profesor
    </Title>
  );

  titleModalEdit = (
    <Title level={3} style={{ color: "#034c70" }}>
      Editar profesor
    </Title>
  );

  return (
    <>
      <Row>
        <Col>{titleTable}</Col>
      </Row>
      <Row>
        <Button
          style={{ backgroundColor: "#034c70", color: "white" }}
          onClick={showModal}
        >
          <PlusOutlined />
          Agregar profesor
        </Button>
      </Row>
      <br />
      <br />
      <Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Col>{content}</Col>
        </div>
      </Row>

      <Modal
        title={titleModal}
        visible={visible}
        className="schedule-modal"
        centered
        footer={null}
        closable={true}
        destroyOnClose={true}
        onCancel={() => setVisible(false)}
      >
        <SecretaryAddTeacherForm closeModal={() => setVisible(false)} />
      </Modal>

      <Modal
        title={titleModalEdit}
        visible={visibleEdit}
        className="schedule-modal"
        footer={null}
        closable={true}
        destroyOnClose={true}
        onCancel={() => setVisibleEdit(false)}
      >
        <SecretaryUpdateTeacherForm
          teacher={updateTeacher}
          teacherId={updateTeacherId}
          closeModal={() => setVisibleEdit(false)}
        />
      </Modal>
    </>
  );
};

export default SecretaryTeachersList;
