import { Button, Col, Row, Typography, Modal, Form } from "antd";
import React, { useState } from "react";
import "../styles/teacher-panel.css";
import Table from "antd/es/table";
import { PlusOutlined, ReloadOutlined, StopOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/Auth";
import "../styles/home-teacher.css";
import SearchColumnFilter from "./SearchColumnFilter";
import AddCommissionForm from "./AddCommissionForm";
import EditCommissionForm from "./EditCommissionForm";
import Loading from "./Loading";
import { useCommissionsList } from "../data/useCommissionsList";
import { useCareersList } from "../data/useCareersList";

const { Title } = Typography;

const SecretaryCommitteeList = () => {
  let location = useLocation();
  const { isAuthenticated } = useAuth();
  const [form] = Form.useForm();
  const { commissions, isLoading, isError, mutate } = useCommissionsList();
  const { careers } = useCareersList();

  const [menuState, setMenuState] = useState({
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: [],
  });
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [commissionToEdit, setCommissionToEdit] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleEditOk = () => {
    form.submit();
  };

  const handleEditCancel = () => {
    setVisibleEdit(false);
  };

  React.useEffect(() => {
    setMenuState({
      ...menuState,
      current: location.pathname,
    });
  }, [location, isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return "Error";
  }

  console.log("commissions", commissions);

  // Columnas y datos para la tabla

  const columns = [
    {
      title: "Carrera",
      dataIndex: "career_id",
      key: "career_id",
      width: 150,
      ...SearchColumnFilter("career_id"),
    },
    {
      title: "Miembro 1",
      dataIndex: "first_member",
      key: "first_member",
      width: 150,
      ...SearchColumnFilter("first_member"),
    },
    {
      title: "Miembro 2",
      dataIndex: "second_member",
      key: "second_member",
      width: 150,
      ...SearchColumnFilter("second_member"),
    },
    {
      title: "Miembro 3",
      dataIndex: "third_member",
      key: "third_member",
      width: 150,
      ...SearchColumnFilter("third_member"),
    },
  ];

  const data = commissions.map((commission) => {
    return {
      key: commission.career_id,
      commission_id: commission.id,
      career_id: commission.career_name,
      first_member: commission.members[0]
        ? commission.members[0].name + " " + commission.members[0].last_name
        : "Por asignar",
      second_member: commission.members[1]
        ? commission.members[1].name + " " + commission.members[1].last_name
        : "Por asignar",
      third_member: commission.members[2]
        ? commission.members[2].name + " " + commission.members[2].last_name
        : "Por asignar",
      fourth_member: commission.members[3]
        ? commission.members[3].name + " " + commission.members[3].last_name
        : "Por asignar",
      commission_schedule: commission.commission_schedule,
    };
  });

  let content;
  let titleTable;
  let titleModal;
  let titleModalEdit;

  titleTable = (
    <Title level={3} style={{ color: "#034c70", fontSize: 50 }}>
      Carreras y comisiones de titulación
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
            setVisibleEdit(true);
            const commissionFormData = {
              career_id: record.key,
              commission_id: record.commission_id,
              commission_schedule: record.commission_schedule,
            };
            setCommissionToEdit(commissionFormData);
          },
        };
      }}
    />
  );

  titleModal = (
    <Title level={3} style={{ color: "#034c70" }}>
      Agregar comisión
    </Title>
  );

  titleModalEdit = (
    <Title level={3} style={{ color: "#034c70" }}>
      Editar comisión
    </Title>
  );

  const modalAddCommissionProps = {
    title: titleModal,
    visible: visible,
    className: "schedule-modal",
    onOk() {
      handleOk();
    },
    closable: true,
    destroyOnClose: true,
    confirmLoading: confirmLoading,
    onCancel() {
      handleCancel();
    },
    cancelButtonProps: { hidden: true },
    okButtonProps: {
      style: {
        marginRight: "40%",
        backgroundColor: "#034c70",
      },
      icon: <PlusOutlined />,
    },
    okText: "Agregar",
  };

  const modalEditCommissionProps = {
    title: titleModalEdit,
    visible: visibleEdit,
    destroyOnClose: true,
    className: "schedule-modal",
    onOk() {
      handleEditOk();
    },
    confirmLoading: confirmLoadingEdit,
    onCancel() {
      handleEditCancel();
    },
    onClose() {
      form.resetFields();
    },
    okText: "Actualizar",
    okButtonProps: {
      style: {
        backgroundColor: "#034c70",
      },
      icon: <ReloadOutlined />,
    },
    cancelText: "Suspender carrera",
    cancelButtonProps: {
      style: {
        backgroundColor: "#407088",
        color: "white",
        // marginRight:'5%'
      },
      icon: <StopOutlined />,
    },
  };

  return (
    <>
      <Row>
        <Col>{titleTable}</Col>
      </Row>
      <Row>
        <Button
          style={{ backgroundColor: "#034c70", color: "white" }}
          onClick={() => setVisible(true)}
        >
          <PlusOutlined />
          Agregar comisión
        </Button>
      </Row>
      <br />
      <Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Col>{content}</Col>
        </div>
      </Row>

      <Modal {...modalAddCommissionProps}>
        <AddCommissionForm
          form={form}
          careers={careers}
          closeModal={() => {
            setVisible(false);
          }}
          loadingModal={setConfirmLoading}
        />
      </Modal>

      <Modal {...modalEditCommissionProps}>
        <EditCommissionForm
          form={form}
          commission={commissionToEdit}
          loading={setConfirmLoadingEdit}
          careers={careers}
          closeModal={() => {
            setVisibleEdit(false);
          }}
          mutate={mutate}
        />
      </Modal>
    </>
  );
};

export default SecretaryCommitteeList;
