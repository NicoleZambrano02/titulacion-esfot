import React, { useState } from "react";
import "../styles/home-teacher.css";
import "antd/dist/antd.css";
import { useTeachersPlansList } from "../data/useTeacherPlansList";
import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Row,
  Table,
  Tag,
  Typography,
} from "antd";
import TeacherPlanForm from "./TeacherPlanForm";
import API from "../data";
import ErrorList from "./ErrorList";
import { translateMessage } from "../utils/translateMessage";
import Loading from "./Loading";

const { Title } = Typography;
const { confirm } = Modal;

const TeacherPlans = () => {
  const [form] = Form.useForm();

  const { teacher_ideas, isLoading, isError, mutate } = useTeachersPlansList();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = [
    {
      title: "Tema",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "assigned" ? "green" : "orange";
        const text = status === "assigned" ? "Asignado" : "No Asignado";

        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorList errors={isError} />;
  }

  const data = teacher_ideas.map((teacher_plan) => ({
    key: teacher_plan.id,
    title: teacher_plan.title,
    status: teacher_plan.status,
  }));

  const handleCreate = async () => {
    const messageKey = "saving status";
    confirm({
      title: "¿Confirmas que deseas enviar el formulario?",
      okText: "Sí",
      cancelText: "No",
      onOk: async () => {
        try {
          setIsSubmitting(true);
          const teacherPlanData = form.getFieldsValue();
          let planId = teacherPlanData.id;
          teacherPlanData.status = "not_assigned";

          if (!planId) {
            message.loading({
              content: "Guardando los datos del plan",
              key: messageKey,
            });
            await API.post(`/teacher/teachers-ideas`, teacherPlanData);
          }

          message.success({
            content: "Completado!",
            key: messageKey,
          });
          form.resetFields();
          mutate();
        } catch (e) {
          const errorList = e.error && <ErrorList errors={e.error} />;
          message.error({
            content: (
              <>
                {" "}
                {translateMessage(e.message)}
                {errorList}
              </>
            ),
            key: messageKey,
          });
          console.log("e", e);
        }
        setIsSubmitting(false);
      },
      onCancel() {},
    });
  };

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
            Listado de temas:
          </Title>
        </Col>
      </Row>
      <TeacherPlanForm form={form} />
      <Row justify="center">
        <Col span={12}>
          <Button type="primary" onClick={handleCreate} loading={isSubmitting}>
            Enviar solicitud
          </Button>
        </Col>
      </Row>
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default TeacherPlans;
