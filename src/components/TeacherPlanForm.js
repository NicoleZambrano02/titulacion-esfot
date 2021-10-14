import React from "react";
import { Form, Input } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const TeacherPlanForm = ({ form }) => {
  return (
    <Form {...formItemLayout} name="teacher_plan" form={form}>
      <Form.Item
        name="title"
        label="Tema:"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Escribe el tema principal del proyecto",
          },
        ]}
      >
        <Input.TextArea
          placeholder="Escribe el tema principal del proyecto"
          autoSize={{ maxRows: 4 }}
        />
      </Form.Item>
      <Form.Item
        name="problem"
        label="Problema a resolver:"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Detalla el problema que abarca el proyecto",
          },
        ]}
      >
        <Input.TextArea
          placeholder="Detalla el problema que abarca el proyecto"
          autoSize={{ maxRows: 4 }}
        />
      </Form.Item>
      <Form.Item
        name="solution"
        label="Solución: "
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Propón una posible solución al problema",
          },
        ]}
      >
        <Input.TextArea
          placeholder="Propón una posible solución al problema"
          autoSize={{ maxRows: 4 }}
        />
      </Form.Item>
    </Form>
  );
};

export default TeacherPlanForm;
