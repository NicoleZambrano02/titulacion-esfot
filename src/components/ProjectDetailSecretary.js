import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  message,
  Row,
  Switch,
  Typography,
} from "antd";
import { usePlanContent } from "../data/usePlan";
import API from "../data";
import ErrorList from "./ErrorList";
import projectStates from "../utils/projectStates";

const { Title } = Typography;
const { Panel } = Collapse;

const ProjectDetailSecretary = ({ id }) => {
  const [approveMethodology, setApproveMethodology] = useState(null);
  const [approveSubject, setApproveSubject] = useState(null);
  const [approveAll, setApproveAll] = useState(null);
  const [approve80, setApprove80] = useState(null);
  const [checkSAEW, setCheckSAEW] = useState(null);
  const [aptTestDefense, setAptTestDefense] = useState(false);

  const { plan, isLoading, isError } = usePlanContent(id);

  useEffect(() => {
    if (plan && projectStates.indexOf(plan.status) >= 5) {
      setApproveMethodology(true);
      setApprove80(true);
    }
    if (plan && projectStates.indexOf(plan.status) >= 14) {
      setCheckSAEW(true);
      setApproveSubject(true);
      setApproveAll(true);
    }
    if (plan && projectStates.indexOf(plan.status) >= 17) {
      setAptTestDefense(true);
    }
  }, [plan]);

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (isError) {
    return <ErrorList errors={isError} />;
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const callback = (key) => {
    console.log(key);
  };
  const onChange = async (e, option) => {
    try {
      switch (option) {
        case "san_curriculum_1":
          setApproveMethodology(true);
          if (e.target.checked && approve80) {
            await API.post(`/projects/${id}/san-curriculum-1`);
            message.success("Cambios guardados");
          }
          break;
        case "san_curriculum_2":
          setApproveSubject(true);
          if (e.target.checked && approveAll && checkSAEW) {
            await API.post(`/projects/${id}/san-curriculum-2`);
            message.success("Cambios guardados");
          }
          break;
        case "san_curriculum_2_2":
          setApproveAll(true);
          if (e.target.checked && approveSubject && checkSAEW) {
            await API.post(`/projects/${id}/san-curriculum-2`);
            message.success("Cambios guardados");
          }
          break;
        default:
          console.log("opción no encontrada");
      }
    } catch (e) {
      console.log("ERROR", e);
      message.error("Ocurrió un error, intente de nuevo");
    }
  };
  const onChangeSwitchCurr1 = async (checked) => {
    setApprove80(true);
    if (checked && approveMethodology) {
      try {
        await API.post(`/projects/${id}/san-curriculum-1`); // put data to server
        message.success("Cambios guardados");
      } catch (e) {
        console.log("ERROR", e);
        message.error("Ocurrió un error, intente de nuevo");
      }
    }
  };

  const optionsAptDefense = [
    { label: "Datos del SAEW actualizado", value: 1 },
    { label: "Título de bachiller", value: 2 },
    { label: "Certificado de idioma Inglés", value: 3 },
    {
      label: "Formulario de no adeudar a las unidades académicas de la EPN",
      value: 4,
    },
    {
      label: "Factura electrónica del pago de derecho de investidura",
      value: 5,
    },
    { label: "Carta de compromiso para registro de título", value: 6 },
    { label: "Certificado de periodos matriculados", value: 7 },
    { label: "Registro blibliográfico ingresado", value: 8 },
    {
      label: "Escaneados de cédula de identidad y papeleta",
      value: 9,
    },
    {
      label: "Informe de finalización de prácticas pre-profesionales",
      value: 10,
    },
    {
      label: "Informe de finalización de servicio a la comunidad",
      value: 11,
    },
    { label: "Currículum académico certificado", value: 12 },
    { label: "Proveído de prácticas", value: 13 },
    { label: "Proveído de calificaciones", value: 14 },
    { label: "Certificado de créditos por categoría", value: 15 },
  ];

  const onChangeCheckBoxGroup = async (checkedValues) => {
    if (checkedValues.length === 15) {
      try {
        await API.post(`/projects/${id}/test-defense-apt`);
        message.success("Estudiante declarado/a apto");
      } catch (e) {
        message.error("Ocurrió un error, intente de nuevo");
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Title level={4}>
            {plan.student_name} {plan.student_last_name}
          </Title>
          <Title level={5}>{plan.title}</Title>
        </Col>
      </Row>
      <Title
        level={4}
        style={{
          color: "#034c70",
          marginLeft: 30,
        }}
      >
        Datos Generales
      </Title>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={plan}
      >
        <Form.Item
          name="teacher_name"
          label="Director/a"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="coodirector/a"
          label="Coodirector/a"
          rules={[{ type: "email" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item name="partner" label="Compañero/a de titulación">
          <Input disabled />
        </Form.Item>
        <Form.Item name="project_type" label="Tipo de proyecto">
          <Input disabled />
        </Form.Item>
        <Form.Item name="research_line" label="Línea de investigación">
          <Input disabled />
        </Form.Item>
        <Form.Item name="knowledge_area" label="Área de investigación">
          <Input disabled />
        </Form.Item>
        <Form.Item name="title" label="Título">
          <Input.TextArea disabled />
        </Form.Item>
      </Form>
      <Collapse defaultActiveKey={["1"]} onChange={callback}>
        <Panel
          header="Curriculum saneado 1 (para ingreso plan de titulación)"
          key="1"
        >
          <Row>
            <Col>
              <Checkbox
                onChange={(e) => onChange(e, "san_curriculum_1")}
                checked={approveMethodology}
                disabled={plan.status !== "plan_approved_director"}
              >
                Está tomando o ya tiene aprobado Metodología de la Investigación
              </Checkbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Switch
                onChange={onChangeSwitchCurr1}
                checked={approve80}
                disabled={plan.status !== "plan_approved_director"}
              />
              <label>Cuenta con más del 80% de materias aprobadas</label>
            </Col>
          </Row>
        </Panel>
        <Panel header="Registro de plan en Saew" key="2">
          <Switch
            onChange={(checked) => setCheckSAEW(checked)}
            checked={checkSAEW}
            disabled={plan.status !== "project_approved_director"}
          />
          <label>Está registrado en el SAEW</label>
        </Panel>
        <Panel header="Curriculum saneado 2" key="3">
          <Checkbox
            onChange={(e) => onChange(e, "san_curriculum_2")}
            checked={approveSubject}
            disabled={plan.status !== "project_approved_director"}
          >
            Haber aprobado la materia de Diseños de Proyectos de Titulación
          </Checkbox>
          <Checkbox
            onChange={(e) => onChange(e, "san_curriculum_2_2")}
            checked={approveAll}
            disabled={plan.status !== "project_approved_director"}
          >
            Tener 100% de aprobación de la malla curricular
          </Checkbox>
        </Panel>
        <Panel header="Requisitos para declarar apta defensa oral" key="4">
          <Checkbox.Group
            onChange={onChangeCheckBoxGroup}
            disabled={plan.status !== "project_approved_send"}
          >
            <Row>
              {optionsAptDefense.map((option, index) => (
                <Col span={8} key={index}>
                  <Checkbox
                    value={option.value}
                    defaultChecked={aptTestDefense}
                  >
                    {option.label}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Panel>
      </Collapse>
    </>
  );
};

export default ProjectDetailSecretary;
