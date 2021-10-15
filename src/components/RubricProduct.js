import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Table, Typography } from "antd";
const { Title } = Typography;

const columns = [
  {
    title: "Pesa",
    dataIndex: "weight",
    width: "80px",
  },
  {
    title: "Criterio de evaluación",
    dataIndex: "criteria",
  },
  {
    title: "Descripción",
    dataIndex: "description",
  },
  {
    title: "Nota",
    dataIndex: "grade",
    editable: true,
    width: "150px",
  },
  {
    title: "Ponderación",
    dataIndex: "finalGrade",
    width: "150px",
  },
];

const RubricProduct = ({ onChange, form }) => {
  const [finalGrades, setFinalGrades] = useState({
    grade1: 0,
    grade2: 0,
    grade3: 0,
    grade4: 0,
    grade5: 0,
  });

  const normalizeGrade = (value, prevValue) => {
    const newValue = Number(value);
    if (isNaN(newValue) || newValue < 0 || newValue > 10) {
      return prevValue;
    }
    return value;
  };

  const dataSource = [
    {
      key: "0",
      weight: "30%",
      criteria: "Funcionalidad",
      description: (
        <>
          El producto cumple todas las funciones que se requieren para
          satisfacer las necesidades establecidas: <br />
          A. Deficiente: 0 HASTA 3.0
          <br />
          B. Aceptable: 3.1 HASTA 7.0
          <br />
          C. Destacado: 7.1 HASTA 10.0
        </>
      ),
      grade: (
        <Form.Item
          name="grade1"
          normalize={normalizeGrade}
          rules={[{ required: true, message: "Ingrese la nota" }]}
        >
          <Input />
        </Form.Item>
      ),
      finalGrade: finalGrades.grade1.toFixed(2),
    },
    {
      key: "1",
      weight: "20%",
      criteria: "Desempeño",
      description: (
        <>
          El producto alcanza los niveles de estándar de desempeño necesario
          durante su evaluación.
          <br />
          A. Deficiente: 0 HASTA 3.0
          <br />
          B. Aceptable: 3.1 HASTA 7.0
          <br />
          C. Destacado: 7.1 HASTA 10.0
        </>
      ),
      grade: (
        <Form.Item
          name="grade2"
          normalize={normalizeGrade}
          rules={[{ required: true, message: "Ingrese la nota" }]}
        >
          <Input />
        </Form.Item>
      ),
      finalGrade: finalGrades.grade2.toFixed(2),
    },
    {
      key: "2",
      weight: "30%",
      criteria: "Diseño robusto e implementación",
      description: (
        <>
          El producto puede operar en diferentes condiciones y entornos de uso,
          y de manera repetitiva, sin que se deban efectuar ajustes o
          reparaciones
          <br />
          A. Deficiente: 0 HASTA 3.0
          <br />
          B. Aceptable: 3.1 HASTA 7.0
          <br />
          C. Destacado: 7.1 HASTA 10.0
        </>
      ),
      grade: (
        <Form.Item
          name="grade3"
          normalize={normalizeGrade}
          rules={[{ required: true, message: "Ingrese la nota" }]}
        >
          <Input />
        </Form.Item>
      ),
      finalGrade: finalGrades.grade3.toFixed(2),
    },
    {
      key: "3",
      weight: "20%",
      criteria: "Facilidad de uso ",
      description: (
        <>
          Los usuarios definidos para el producto lo pueden emplear con
          efectividad y eficiencia y con un nivel adecuado de satisfacción.
          <br />
          A. Deficiente: 0 HASTA 3.0
          <br />
          B. Aceptable: 3.1 HASTA 7.0
          <br />
          C. Destacado: 7.1 HASTA 10.0
        </>
      ),
      grade: (
        <Form.Item
          name="grade4"
          normalize={normalizeGrade}
          rules={[{ required: true, message: "Ingrese la nota" }]}
        >
          <Input />
        </Form.Item>
      ),
      finalGrade: finalGrades.grade4.toFixed(2),
    },
    {
      key: "4",
      weight: "100%",
      criteria: "",
      description: "",
      grade: "",
      finalGrade: finalGrades.grade5.toFixed(2),
    },
  ];

  const onValuesChange = (changedValues, allFields) => {
    const weights = {
      grade1: 30,
      grade2: 20,
      grade3: 30,
      grade4: 20,
    };

    const newFinalGrades = { ...finalGrades };
    for (let grade in changedValues) {
      newFinalGrades[grade] = (changedValues[grade] * weights[grade]) / 100;
    }

    newFinalGrades.grade5 =
      newFinalGrades.grade1 +
      newFinalGrades.grade2 +
      newFinalGrades.grade3 +
      newFinalGrades.grade4;

    setFinalGrades(newFinalGrades);
    onChange("product", newFinalGrades.grade5);
  };

  return (
    <div>
      <Row>
        <Col>
          <Title level={3} style={{ color: "#034c70" }}>
            Producto
          </Title>
        </Col>
      </Row>
      <Form form={form} name="rubric-product" onValuesChange={onValuesChange}>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={{ position: ["none", "none"] }}
        />
      </Form>
    </div>
  );
};

export default RubricProduct;
