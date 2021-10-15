import React, { useState } from "react";
import { Col, Form, Input, Row, Table, Typography } from "antd";
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

const RubricReport = ({ onChange, form }) => {
  const [finalGrades, setFinalGrades] = useState({
    grade1: 0,
    grade2: 0,
    grade3: 0,
    grade4: 0,
    grade5: 0,
    grade6: 0,
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
      weight: "5%",
      criteria: "Formato y estilo",
      description: (
        <>
          El formato, la organización de contenidos, redacción, uso de gramática
          y ortografía, aplicación de normas de citas y referencia es: <br />
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
      criteria: "Estructura",
      description: (
        <>
          La organización de contenidos tiene una secuencia lógica y sigue un
          orden que facilita la comprensión del trabajo efectuado.
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
      weight: "40%",
      criteria: "Consistencia entre objetivos y resultados y conclusiones",
      description: (
        <>
          Los objetivos planteados para el trabajo son coherentes entre si y se
          corresponden con los resultados alcanzados y las conclusiones
          derivadas del trabajo efectuado.
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
      weight: "25%",
      criteria: "Pertenencia de conclusiones y recomendaciones",
      description: (
        <>
          Los objetivos planteados para el trabajo son coherentes entre si y se
          corresponden con los resultados alcanzados y las conclusiones
          derivadas del trabajo efectuado.
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
      weight: "10%",
      criteria: "Uso adecuado de referencias",
      description:
        "Las referencias seleccionadas son pertinentes y se han citado de manera adecuada.\n" +
        "A.  Deficiente: 3.0\n" +
        "B. Aceptable: 7.0\n" +
        "C. Destacado: 10.0",
      grade: (
        <Form.Item
          name="grade5"
          normalize={normalizeGrade}
          rules={[{ required: true, message: "Ingrese la nota" }]}
        >
          <Input />
        </Form.Item>
      ),
      finalGrade: finalGrades.grade5.toFixed(2),
    },
    {
      key: "5",
      weight: "100%",
      criteria: "",
      description: "",
      grade: "",
      finalGrade: finalGrades.grade6.toFixed(2),
    },
  ];

  const onValuesChange = (changedValues, allFields) => {
    const weights = {
      grade1: 5,
      grade2: 20,
      grade3: 40,
      grade4: 25,
      grade5: 10,
    };

    const newFinalGrades = { ...finalGrades };
    for (let grade in changedValues) {
      newFinalGrades[grade] = (changedValues[grade] * weights[grade]) / 100;
    }

    newFinalGrades.grade6 =
      newFinalGrades.grade1 +
      newFinalGrades.grade2 +
      newFinalGrades.grade3 +
      newFinalGrades.grade4 +
      newFinalGrades.grade5;

    setFinalGrades(newFinalGrades);
    onChange("report", newFinalGrades.grade6);

    console.log("changedValues, allFields", changedValues, allFields);
  };

  return (
    <div>
      <Row style={{ marginTop: 75 }}>
        <Col>
          <Title level={3} style={{ color: "#034c70" }}>
            Trabajo escrito
          </Title>
        </Col>
      </Row>
      <Form form={form} name="rubric-report" onValuesChange={onValuesChange}>
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

export default RubricReport;
