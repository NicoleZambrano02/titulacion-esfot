import React, { useState } from "react";
import { Form, Input, message, Button, Select, Col, Row } from "antd";
import { useTeachers } from "../data/useTeachers";
import { useCareersList } from "../data/useCareersList";
import Loading from "./Loading";
import ShowError from "./ShowError";
import { SchedulePickerTable } from "./SchedulePickerTable";
import API from "../data";
import "../styles/schedule-form.css";

const { Item } = Form;

const formItemLayout = {
  labelCol: {
    md: { span: 12 },
  },
  wrapperCol: {
    md: { span: 24 },
  },
};

const SecretaryAddTeacherForm = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const { careers, isLoading, isError } = useCareersList();
  const { mutate } = useTeachers();

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
      monday: {
        ...monday.map((item) => {
          if (item === undefined) {
            return false;
          }
          return item;
        }),
      },
      tuesday: {
        ...tuesday.map((item) => {
          if (item === undefined) {
            return false;
          }
          return item;
        }),
      },
      wednesday: {
        ...wednesday.map((item) => {
          if (item === undefined) {
            return false;
          }
          return item;
        }),
      },
      thursday: {
        ...thursday.map((item) => {
          if (item === undefined) {
            return false;
          }
          return item;
        }),
      },
      friday: {
        ...friday.map((item) => {
          if (item === undefined) {
            return false;
          }
          return item;
        }),
      },
    };
    const textSchedule = JSON.stringify(schedule);

    setLoading(true);
    const teacher = {
      name: name,
      last_name: last_name,
      email: email,
      career_id: career_id,
      schedule: textSchedule,
    };
    try {
      await API.post("/teachers", teacher);
      message.success("¡Profesor creado con éxito!");
      setLoading(false);
      mutate();
      closeModal();
    } catch (e) {
      message.error("No se pudo crear al profesor, intente de nuevo");
      setLoading(false);
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
          {...formItemLayout}
          onFinish={formSuccess}
          onFinishFailed={formFailed}
          className="schedule-form"
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
          >
            <Input />
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
          >
            <Select
              placeholder="Seleccione"
              style={{ width: "100%" }}
              loading={isLoading}
            >
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
          >
            <Input />
          </Item>
          <Row type="flex" justify="center">
            <Col span={40}>
              <SchedulePickerTable scheduleFor={"profesor"} />
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

export default SecretaryAddTeacherForm;
