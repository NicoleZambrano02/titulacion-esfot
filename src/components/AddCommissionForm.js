import React, { useState } from "react";
import { Col, Form, message, Row, Select } from "antd";
import { useTeachers } from "../data/useTeachers";
import { useCommissionsList } from "../data/useCommissionsList";
import Loading from "./Loading";
import { SchedulePickerTable } from "./SchedulePickerTable";
import API from "../data";
import "../styles/schedule-form.css";

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

const AddCommissionForm = ({ form, careers, closeModal, loadingModal }) => {
  const [teachersList, setTeachersList] = useState([]);
  const { teachers, isLoading, isError } = useTeachers();
  const { mutate } = useCommissionsList();

  const handleChange = (value) => {
    const teachersSelected = [];
    for (let i = 0; i < value.length; i++) {
      teachersList.forEach((teacher) => {
        if (teacher.value === value[i]) {
          teachersSelected.push(teacher.id);
        }
      });
    }
  };

  const onChange = (value) => {
    const teachersCareer = teachers.filter(
      (teacher) => teacher.career_id === value
    );
    const teacherCareerList = teachersCareer.map((teacher) => {
      return {
        id: teacher.id,
        value: teacher.id,
        label: teacher.name + " " + teacher.last_name,
      };
    });
    setTeachersList(teacherCareerList);
  };

  const onSubmit = async (values) => {
    const { career_id, members, monday, tuesday, wednesday, thursday, friday } =
      values;
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
    const dataToSend = {
      career_id: career_id,
      members: members,
      commission_schedule: textSchedule,
    };

    loadingModal(true);
    try {
      await API.post("/commissions/commissions", dataToSend);
      message.success("Comisión creada con éxito");
      await mutate();
      loadingModal(false);
      closeModal();
    } catch (e) {
      message.error(
        e.error.career_id
          ? e.error.career_id[0]
          : "Ocurrió un problema, intente de nuevo"
      );
      loadingModal(false);
      console.log("error", e);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return "error";
  }

  const careersList = careers.map((career) => {
    return {
      label: career.name,
      value: career.id,
    };
  });

  return (
    <Form
      {...formItemLayout}
      name="committee"
      onFinish={onSubmit}
      form={form}
      layout={"vertical"}
    >
      <Form.Item
        name="career_id"
        label="Carrera:"
        rules={[
          {
            required: true,
            message: "Escoje el nombre de la carrera",
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Selecciona una carrera"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          options={careersList}
        />
      </Form.Item>
      <Form.Item
        name="members"
        label="Miembros de la comisión"
        rules={[
          {
            required: true,
            message: "Debe haber al menos dos miembros",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Selcciona los profesores"
          showArrow
          onChange={handleChange}
          style={{ width: "100%" }}
          options={teachersList}
        />
      </Form.Item>
      <Row type="flex" justify="center">
        <Col span={40}>
          <SchedulePickerTable scheduleFor={"comisión"} />
        </Col>
      </Row>
    </Form>
  );
};

export default AddCommissionForm;
