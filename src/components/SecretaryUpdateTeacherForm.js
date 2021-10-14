import React, { useState } from "react";
import { Form, Input, message, Button, Select, Col, Row } from "antd";
import { useTeachers } from "../data/useTeachers";
import { useCareersList } from "../data/useCareersList";
import Loading from "./Loading";
import ShowError from "./ShowError";
import { SchedulePickerTable } from "./SchedulePickerTable";
import API from "../data";

const { Item } = Form;

const formItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 6 },
    md: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
    md: { span: 24 },
  },
};

const SecretaryUpdateTeacherForm = ({ teacher, teacherId, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const { careers, isLoading, isError } = useCareersList();
  const { mutate } = useTeachers();
  console.log("Props", teacher);

  const scheduleData = JSON.parse(teacher.schedule);

  //Carga de datos de carreras
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

  // Funcion de guardado de nuevo profesor
  const formSuccess = async (datos) => {
    const {
      name,
      last_name,
      email,
      career_id,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
    } = datos;
    const schedule = {
      monday: { ...monday },
      tuesday: { ...tuesday },
      wednesday: { ...wednesday },
      thursday: { ...thursday },
      friday: { ...friday },
    };
    const uniqueSchedule = Object.assign(scheduleData, schedule);
    const textSchedule = JSON.stringify(uniqueSchedule);
    setLoading(true);
    const teacher = {
      name: name,
      last_name: last_name,
      career_id: career_id,
      email: email,
      schedule: textSchedule,
    };
    try {
      console.log("OJO", teacher);
      await API.put(`/teachers/${teacherId}`, teacher);
      message.success("¡Cambios guardados correctamente!");
      setLoading(false);
      mutate();
      closeModal();
    } catch (e) {
      message.error("No se pudo actualizar al profesor, intente de nuevo");
      setLoading(false);
    }
  };

  const formFailed = (error, datos) => {
    console.log("Lo que se queria enviar 2", datos);
    console.log("Error: ", error);
  };

  return (
    <div>
      <div>
        <Form
          {...formItemLayout}
          className="schedule-form"
          onFinish={formSuccess}
          onFinishFailed={formFailed}
          layout={"vertical"}
        >
          <Item
            label="Nombre"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del profesor",
              },
            ]}
            initialValue={teacher.name}
          >
            <Input />
          </Item>
          <Item
            label="Apellido"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el apellido del profesor",
              },
            ]}
            initialValue={teacher.last_name}
          >
            <Input />
          </Item>
          <Item
            label="Carrera"
            name="career_id"
            rules={[
              {
                required: false,
                message: "Por favor ingresa el id de la carrera",
              },
            ]}
            initialValue={teacher.career_id}
          >
            <Select style={{ width: "100%" }} loading={isLoading}>
              {careers &&
                careers.map((career, index) => (
                  <Select.Option value={career.id} key={index}>
                    {career.name}
                  </Select.Option>
                ))}
            </Select>
          </Item>
          <Item
            label="Correo electrónico"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el email del profesor",
              },
            ]}
            initialValue={teacher.email}
          >
            <Input />
          </Item>
          <Row type="flex" justify="center">
            <Col span={40}>
              <SchedulePickerTable
                scheduleFor={"profesor"}
                scheduleData={scheduleData}
              />
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                >
                  Guardar
                </Button>
              </Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SecretaryUpdateTeacherForm;
