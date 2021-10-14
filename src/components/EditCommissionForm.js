import React, { useState, useEffect } from "react";
import { Form, message, Row, Col, Select } from "antd";
import { useTeachers } from "../data/useTeachers";
import { useCareer } from "../data/useCareer";
import Loading from "./Loading";
import { SchedulePickerTable } from "./SchedulePickerTable";
import "../styles/schedule-form.css";
import API from "../data";

const formItemLayout = {
  labelCol: {
    md: { span: 12 },
  },
  wrapperCol: {
    md: { span: 24 },
  },
};

const EditCommissionForm = ({
  form,
  commission,
  careers,
  closeModal,
  loading,
  mutate,
}) => {
  const [teachersList, setTeachersList] = useState([]);
  const { career, isLoading, isError } = useCareer(commission.career_id);
  const { teachers } = useTeachers();
  const scheduleData = JSON.parse(commission.commission_schedule);

  const onChange = (value) => {
    const teachersCareer = teachers.filter(
      (teacher) => teacher.career_id === value
    );
    const teacherCareerList = teachersCareer.map((teacher) => {
      return {
        id: teacher.id,
        value: teacher.id,
        label: teacher.name,
      };
    });
    setTeachersList(teacherCareerList);
  };

  const careersList = careers.map((career) => {
    return {
      label: career.name,
      value: career.id,
    };
  });

  const onSubmit = async (values) => {
    console.log("values", values);
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
    loading(true);
    try {
      await API.put(`/commissions/${commission.commission_id}`, dataToSend);
      message.success("Comisión editada con éxito");
      await mutate();
      loading(false);
      closeModal();
    } catch (e) {
      message.error("Ocurrió un error");
      loading(false);
      console.log("error", e);
    }
  };

  useEffect(() => {
    if (career) {
      setTeachersList(
        career.teachers.data.map((teacher) => {
          return {
            id: teacher.id,
            value: teacher.id,
            label: teacher.name,
          };
        })
      );
    }
  }, [career]);

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return "Error";
  }

  return (
    <Form
      {...formItemLayout}
      name="committee"
      onFinish={onSubmit}
      form={form}
      layout={"vertical"}
      initialValues={{
        career_id: career.id,
        commission_schedule: career.commission.commission_schedule,
        members: career.commission.members.map((member) => member.id),
      }}
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
          style={{ width: "100%" }}
          options={teachersList}
        />
      </Form.Item>
      <Row type="flex" justify="center">
        <Col span={40}>
          <SchedulePickerTable
            scheduleFor={"comisión"}
            scheduleData={scheduleData}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default EditCommissionForm;
