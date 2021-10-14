import React, { useEffect } from "react";
import { Form, Input, message, Select } from "antd";
import { Option } from "antd/es/mentions";
import API from "../data";

const { Item } = Form;

const NewTribunalForm = ({
  project,
  careers,
  closeModal,
  form,
  mutate,
  loadingModal,
}) => {
  const career = careers.filter(
    (career) => career.id === project.teacher_career
  );
  const teachersCareer = career[0].teachers.data.map((teacher) => {
    return {
      id: teacher.id,
      value: teacher.id,
      label: teacher.name,
    };
  });

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  const handleSubmit = async (values) => {
    const jury = {
      project_id: project.id,
      members: values.members,
    };

    loadingModal(true);

    try {
      await API.post("/juries", jury);
      await API.post(`/projects/${project.id}/tribunal-assigned`);
      message.success("Cambios guardados correctamente!");
      await mutate();
      loadingModal(false);
      closeModal();
    } catch (e) {
      message.error("Ocurrió un error, intente de nuevo");
      loadingModal(false);
      console.log("error", e);
    }
  };

  const formFailed = (error) => {
    console.log("Error: ", error);
  };

  return (
    <div>
      <div>
        <Form
          onFinish={handleSubmit}
          onFinishFailed={formFailed}
          layout={"vertical"}
          form={form}
        >
          <Item
            label="Titulo"
            name="title"
            disabled={true}
            rules={[
              {
                required: true,
                message: "Por favor ingrese el título del proyecto",
              },
            ]}
            initialValue={project.title}
          >
            <Input disabled />
          </Item>
          <Item
            label="Carrera"
            name="career_id"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el id de la carrera",
              },
            ]}
            initialValue={project.teacher_career}
          >
            <Select
              placeholder="Seleccione"
              style={{ width: "100%" }}
              showArrow={false}
              disabled
            >
              {careers.map((career, index) => (
                <Option value={career.id} key={index}>
                  {career.name}
                </Option>
              ))}
            </Select>
          </Item>
          <Item
            name="members"
            label="Miembros"
            rules={[
              {
                required: true,
                message: "Selecciona los miembros del jurado",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Selcciona los profesores"
              showArrow
              style={{ width: "100%" }}
              options={teachersCareer}
            />
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default NewTribunalForm;
