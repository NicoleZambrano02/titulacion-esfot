import {
  Button,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import "../styles/plan-form.css";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import Routes from "../constants/routes";
import withAuth from "../hocs/withAuth";
import { useTeachers } from "../data/useTeachers";
import Loading from "./Loading";
import API from "../data";
import { usePlanContent } from "../data/usePlan";
import AddComments from "./AddComments";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;
const { confirm } = Modal;

const PlanReview = ({ idPlan, user }) => {
  const { plan, isLoading } = usePlanContent(idPlan);
  const { teachers } = useTeachers();
  const [imageUrl, setImageUrl] = useState(null);
  const [sending, setSending] = useState(false);
  const [sendingPlan, setSendingPlan] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [approvePlan, setApprovePlan] = useState(false);
  const [showComments, showAddCommentsModal] = useState(false);
  const [form] = Form.useForm();
  const [comments, setComments] = useState(" ");

  const showAddComments = async (values) => {
    showAddCommentsModal(true);
    setComments(values);
  };

  useEffect(() => {
    if (plan && plan.schedule) {
      setImageUrl(plan.schedule);
    }
  }, [plan]);

  if (isLoading) {
    return <Loading />;
  }

  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} es requerido!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onSentComments = async () => {
    setSending(true);

    try {
      if (user === "director") {
        await API.post(`/projects/${plan.id}/plan-review-teacher`); // put data to server
      } else if (user === "committee") {
        await API.post(`/projects/${plan.id}/plan-review-commission`); // put data to server
      }
      setSending(false);
      confirm({
        icon: <CheckCircleOutlined />,
        title: (
          <Title level={3} style={{ color: "#034c70" }}>
            ¡Buen trabajo!
          </Title>
        ),
        content: (
          <>
            <Row justify="center">
              <Col>
                <Image src="boy.png" width={100} />
                <Image src="girl.png" width={100} />
              </Col>
            </Row>

            <Row>
              <Col>
                <p style={{ color: "#034c70" }}>
                  Gracias por tu esfuerzo en revisar el plan,
                  <br />
                  <strong>tus comentarios han sido enviados</strong>.
                </p>
              </Col>
            </Row>
          </>
        ),
        okText: "Entendido",
        okButtonProps: {
          href: Routes.HOME,
          style: {
            backgroundColor: "#034c70",
            marginRight: 125,
          },
        },
        cancelButtonProps: { hidden: true },
      });
    } catch (e) {
      console.log("ERROR", e);
      setSending(false);
      message.error("Ocurrió un error, intente de nuevo");
    }
  };

  const modal = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "¿Estás seguro de mandar el plan?",
      content:
        user === "director"
          ? "Una vez aprobado se enviará a la comisión de titulación para su revisión."
          : "Una vez aprobado se enviará una notificación al estudiante y al director.",
      okText: "Si",
      cancelText: "No",
      onOk() {
        onFinish();
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: { style: { backgroundColor: "#034c70" } },
    });
  };

  const modalReject = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "¿Estás seguro de rechazar el plan?",
      content: "Una vez rechazado no podrá deshacer la acción.",
      okText: "Si",
      cancelText: "No",
      onOk() {
        onReject();
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: { style: { backgroundColor: "#034c70" } },
    });
  };

  const modalProps = {
    title: (
      <Title level={1} style={{ color: "#034c70" }}>
        Confirmación
      </Title>
    ),
    okText: (
      <span>
        <CheckOutlined />
        Aprobar plan
      </span>
    ),
    cancelButtonProps: { hidden: true },
    closeIcon: <CloseCircleOutlined style={{ color: "#034c70" }} />,
    visible: approvePlan,
    width: 600,
    style: { borderRadius: 25 },
    okButtonProps: {
      loading: sendingPlan,
      style: {
        marginRight: 250,
        backgroundColor: "#034c70",
      },
      disabled: !checked,
    },
    onOk() {
      modal();
    },
    onCancel() {
      setApprovePlan(false);
    },
  };
  const onChange = (checkedValue) => {
    if (checkedValue.length === 18) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const contentApproveModal = (
    <>
      <Checkbox.Group onChange={onChange} className="plan-approval-rubric">
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Título del trabajo de titulación
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"1"}>
              Está redactando de forma clara, precisa y entendible.
            </Checkbox>
            <Checkbox value={"2"}>Describe el problema y la solución.</Checkbox>
            <Checkbox value={"3"}>
              Describe el tema que es objetivo del estudio.
            </Checkbox>
            <Checkbox value={"4"}>
              Está de acuerdo a los objetivos planteados.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Planteamiento del problema
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"5"}>
              Identifica síntomas causas que permiten pronosticar las
              consecuencias si persiste el problema.
            </Checkbox>
            <Checkbox value={"6"}>Describe el problema y la solución.</Checkbox>
            <Checkbox value={"7"}>
              Describe el tema que es objetivo del estudio.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Justificación
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"8"}>
              Justifica el ¿por qué? Y ¿para qué? Se realiza el trabajo.
            </Checkbox>
            <Checkbox value={"9"}>Presenta las debidas evidencias.</Checkbox>
            <Checkbox value={"10"}>
              Desglosa la justificación teórica, metodológica y/o práctica.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Objetivo General
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"11"}>
              Acorde al título del trabajo de titulación, escrito en verbo
              infinitivo.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Objetivos específicos
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"12"}>
              Presenta más de 2 objetivos específicos, escritos en verbos
              infinitivos.
            </Checkbox>
            <Checkbox value={"13"}>
              No son pasos metodológicos, procedimientos, actividades.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Metodología
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"14"}>
              Describe las actividades que se realizarán durante la ejecución
              del trabajo de titulación.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Plan de trabajo
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"15"}>
              Detalla las etapas macro de trabajo de titulación.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Cronograma
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"16"}>
              Describe las etapas del trabajo de titulación con sus respectivos
              tiempos de ejecución.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Bibliografía
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"17"}>
              Las referencias bibliográficas tienen valor académico y son
              contemporáneas a pertinentes.
            </Checkbox>
            <Checkbox value={"18"}>
              Las fuentes citadas son de apoyo para sustentar el trabajo de
              titulación.
            </Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
    </>
  );

  const onFinish = async () => {
    setSendingPlan(true);
    const data = form.getFieldsValue();
    let dataToSent = {
      ...data,
      title_comment: "",
      problem_comment: "",
      general_objective_comment: "",
      specifics_objectives_comment: "",
      hypothesis_comment: "",
      justification_comment: "",
      methodology_comment: "",
      work_plan_comment: "",
      schedule_comment: "",
      bibliography_comment: "",
    };
    try {
      if (user === "director") {
        await API.post(`/projects/${plan.id}/plan-approved-director`); // put data to server
      } else if (user === "committee") {
        await API.post(`/projects/${plan.id}/plan-approved-commission`); // put data to server
      }

      await API.post(`projects/${plan.id}`, dataToSent);

      setSendingPlan(false);
      confirm({
        icon: <CheckCircleOutlined />,
        title: (
          <Title level={3} style={{ color: "#034c70" }}>
            ¡Buen trabajo!
          </Title>
        ),
        content: (
          <>
            <Row justify="center">
              <Col>
                <Image src="boy.png" width={100} />
                <Image src="girl.png" width={100} />
              </Col>
            </Row>

            <Row>
              <Col>
                <p style={{ color: "#034c70" }}>
                  Gracias por tu esfuerzo en revisar el plan,
                  <br />
                  {user === "director" ? (
                    <strong>ha sido enviado a la comisión</strong>
                  ) : (
                    <strong>el plan ha sido aprobado.</strong>
                  )}
                </p>
              </Col>
            </Row>
          </>
        ),
        okText: "Entendido",
        okButtonProps: {
          href: Routes.HOME,
          style: {
            backgroundColor: "#034c70",
            marginRight: 125,
          },
        },
        cancelButtonProps: { hidden: true },
      });
    } catch (e) {
      console.log("ERROR", e);
      message.error("Ocurrió un error, intente de nuevo");
      setSendingPlan(false);
    }
  };

  const onReject = async () => {
    setRejecting(true);
    try {
      await API.post(`/projects/${plan.id}/plan-rejected`); // put data to server
      setRejecting(false);
      confirm({
        icon: <CheckCircleOutlined />,
        title: (
          <Title level={3} style={{ color: "#034c70" }}>
            ¡Listo!
          </Title>
        ),
        content: (
          <>
            <Row justify="center">
              <Col>
                <Image src="boy.png" width={100} />
                <Image src="girl.png" width={100} />
              </Col>
            </Row>

            <Row>
              <Col>
                <p style={{ color: "#034c70" }}>
                  Se ha rechazo este plan,
                  <br />
                  <strong>han sido enviadas las notificaciones</strong>.
                </p>
              </Col>
            </Row>
          </>
        ),
        okText: "Entendido",
        okButtonProps: {
          href: Routes.HOME,
          style: {
            backgroundColor: "#034c70",
            marginRight: 125,
          },
        },
        cancelButtonProps: { hidden: true },
      });
    } catch (e) {
      console.log("ERROR", e);
      message.error("Ocurrió un error, intente de nuevo");
      setRejecting(false);
    }
  };

  const onUpdate = async () => {
    const formData = form.getFieldsValue();
    const data = { ...formData };
    try {
      await API.post(`/projects/${plan.id}`, {
        codirector: data.codirector,
        partner: data.partner,
        project_type: data.project_type,
        research_line: data.research_line,
        knowledge_area: data.knowledge_area,
        title: data.title,
        problem: data.problem,
        justification: data.justification,
        hypothesis: data.hypothesis,
        general_objective: data.general_objective,
        specifics_objectives: data.specifics_objectives,
        methodology: data.methodology,
        work_plan: data.work_plan,
        bibliography: data.bibliography,
        teacher_id: data.teacher_id,
      });
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const canEditPlan = () => {
    return (
      user === "director" &&
      (plan.status === "plan_sent" || plan.status === "plan_corrections_done")
    );
  };

  const renderCommentIcon = (field) => {
    return (
      (canEditPlan() ||
        (user === "committee" &&
          (plan.status === "san_curriculum_1" ||
            plan.status === "plan_corrections_done2"))) && (
        <CommentOutlined
          style={{
            color: "#034c70",
            fontSize: 25,
            marginLeft: 15,
            float: "right",
          }}
          onClick={() => showAddComments(field)}
        />
      )
    );
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

      <Row>
        <Col span={24}>
          <Title
            level={4}
            style={{
              color: "#034c70",
              marginLeft: 30,
              marginTop: 40,
            }}
          >
            Datos Generales
          </Title>
          <Form.Provider
            onFormChange={() => {
              setTimeout(() => {
                onUpdate().then(() => {
                  console.log("Cambios guardados correctamente!");
                });
              }, 2000);
            }}
          >
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onSentComments}
              initialValues={plan}
              validateMessages={validateMessages}
              form={form}
            >
              <Row justify="center">
                <Col>
                  <Form.Item
                    name="teacher_id"
                    label="Seleccione su director"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      loading={isLoading}
                      disabled={true}
                    >
                      {teachers &&
                        teachers.map((teacher, index) => (
                          <Option value={teacher.id} key={index}>
                            {teacher.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="codirector"
                    label="Seleccione su co-director"
                  >
                    <Input
                      style={{ width: 300 }}
                      disabled={!canEditPlan()}
                      placeholder="Nombre del co-director"
                    />
                  </Form.Item>
                  <Form.Item name="partner" label="Seleccione su compañero">
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      disabled={!canEditPlan()}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="project_type" label="Tipo de proyecto">
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      disabled={!canEditPlan()}
                    >
                      <Option value="areaInvestigation">
                        Investigación de campo
                      </Option>
                      <Option value="documentalInvestigation">
                        Investigación documental
                      </Option>
                      >
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="research_line"
                    label="Línea de investigación"
                  >
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      disabled={!canEditPlan()}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="knowledge_area"
                    label="Área de investigación"
                  >
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      disabled={!canEditPlan()}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Title
                    justify={"left"}
                    level={4}
                    style={{
                      color: "#034c70",
                      marginLeft: 30,
                      marginTop: 50,
                    }}
                  >
                    Plan
                  </Title>
                </Col>
              </Row>

              <Row justify={"left"}>
                <Col>
                  {renderCommentIcon("title_comment")}
                  <Form.Item
                    name="title"
                    label="Título"
                    rules={[{ required: true }]}
                  >
                    <TextArea
                      style={{ width: 600 }}
                      placeholder="Máximo 15 palabras"
                      autoSize={{
                        minRows: 2,
                        maxRows: 5,
                      }}
                      disabled={!canEditPlan()}
                    />
                  </Form.Item>

                  {renderCommentIcon("problem_comment")}

                  <Form.Item name="problem" label="Planteamiento del problema">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 15,
                        maxRows: 15,
                      }}
                      disabled={!canEditPlan()}
                    />
                  </Form.Item>

                  {renderCommentIcon("justification_comment")}
                  <Form.Item name="justification" label="Justificación">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 15,
                        maxRows: 15,
                      }}
                      disabled={!canEditPlan()}
                    />
                  </Form.Item>

                  {renderCommentIcon("hypothesis_comment")}
                  <Form.Item name="hypothesis" label="Hipótesis">
                    <TextArea
                      style={{ width: 600 }}
                      placeholder="Si no aplica escribir N/A"
                      autoSize={{
                        minRows: 6,
                        maxRows: 6,
                      }}
                      disabled={!canEditPlan()}
                    />
                  </Form.Item>

                  {renderCommentIcon("general_objective_comment")}
                  <Form.Item name="general_objective" label="Objetivo General">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 6,
                        maxRows: 6,
                      }}
                      disabled={!canEditPlan()}
                    />
                  </Form.Item>

                  {renderCommentIcon("specifics_objectives_comment")}
                  <Form.Item
                    name="specifics_objectives"
                    label="Objetivos Específicos"
                  >
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 6,
                        maxRows: 6,
                      }}
                      disabled={!canEditPlan()}
                    />
                  </Form.Item>

                  {renderCommentIcon("methodology_comment")}
                  <Form.Item name="methodology" label="Metodología">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 15,
                        maxRows: 15,
                      }}
                      disabled={!canEditPlan()}
                    />
                  </Form.Item>

                  {renderCommentIcon("work_plan_comment")}
                  <Form.Item name="work_plan" label="Plan de trabajo">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 15,
                        maxRows: 15,
                      }}
                      disabled={!canEditPlan()}
                    />
                  </Form.Item>

                  {renderCommentIcon("schedule_comment")}
                  <Form.Item
                    name={plan.schedule === null && "schedule"}
                    label="Cronograma"
                  >
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt="Cronograma"
                        style={{ width: "200px" }}
                      />
                    )}
                  </Form.Item>

                  {renderCommentIcon("bibliography_comment")}
                  <Form.Item name="bibliography" label="Bibliografía">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 6,
                        maxRows: 6,
                      }}
                      disabled={!canEditPlan()}
                    />
                  </Form.Item>
                  {(canEditPlan() ||
                    (user === "committee" &&
                      (plan.status === "san_curriculum_1" ||
                        plan.status === "plan_corrections_done2"))) && (
                    <Form.Item {...tailLayout}>
                      <Button
                        className={"submit"}
                        htmlType="submit"
                        loading={sending}
                      >
                        Enviar Comentarios
                      </Button>
                      <Button
                        className={"submit"}
                        onClick={() => setApprovePlan(true)}
                      >
                        <SendOutlined /> Aprobar Plan
                      </Button>
                      {user === "committee" && (
                        <Button
                          className={"submit"}
                          onClick={modalReject}
                          loading={rejecting}
                        >
                          <CloseOutlined /> Rechazar Plan
                        </Button>
                      )}
                    </Form.Item>
                  )}
                </Col>
              </Row>
            </Form>
          </Form.Provider>
        </Col>
      </Row>

      <Modal {...modalProps}>{contentApproveModal}</Modal>

      <Modal
        visible={showComments}
        footer={null}
        closable={false}
        onCancel={() => showAddCommentsModal(false)}
      >
        <AddComments
          comments={comments}
          planID={idPlan}
          plan={plan}
          user={user}
          onClose={() => showAddCommentsModal(false)}
        />
      </Modal>
    </>
  );
};

export default withAuth(PlanReview);
