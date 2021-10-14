import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Typography,
  Upload,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import "../styles/plan-form.css";
import {
  CheckCircleOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  SendOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Routes from "../constants/routes";
import withAuth from "../hocs/withAuth";
import { useStudentProject } from "../data/useStudentProjects";
import { useTeachers } from "../data/useTeachers";
import { useStudentsList } from "../data/useStudentsList";
import { useCareer } from "../data/useCareer";
import CIAL from "../utils/careersInvestigationAreasAndLines";
import { useAuth } from "../providers/Auth";
import Loading from "./Loading";
import API from "../data";
import ViewComments from "./ViewComments";
import ErrorList from "./ErrorList";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { confirm } = Modal;

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

const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
};

const PlanForm = () => {
  const { projects, isLoading, isError } = useStudentProject();
  const { currentUser } = useAuth();
  const {
    career,
    isLoading: isLoadingCareer,
    isError: isErrorCareer,
  } = useCareer(currentUser.career_id);
  const { teachers } = useTeachers();
  const {
    students,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
  } = useStudentsList();
  const [imageUrl, setImageUrl] = useState(null);
  const [sending, setSending] = useState(false);
  const [isFinished, setIsFinished] = useState(true);
  const [planData, setPlanData] = useState(null);
  const [showComments, showViewCommentsModal] = useState(false);
  const [comments, setComments] = useState(" ");
  const [investigationLines, setInvestigationLines] = useState([]);
  const [form] = Form.useForm();
  const autoSaveTimeoutRef = useRef(null);

  useEffect(() => {
    if (projects && projects[0] && projects[0].schedule) {
      setImageUrl(projects[0].schedule);
    }
    const updateOrCreateProject = async () => {
      if (projects) {
        try {
          if (projects[0]) {
            await API.post(`/projects/${projects[0].id}`, planData);
          } else {
            await API.post("/students/projects", planData); // post data to server
            // message.success("Cambios guardados correctamente!");
          }
        } catch (e) {
          message.error("Ocurrió un error, intente de nuevo");
          console.log("ERROR", e);
        } finally {
          setSending(false);
        }
      }
    };
    updateOrCreateProject();
    console.log("image", imageUrl);
  }, [projects, planData]);

  useEffect(() => {
    if (form) {
      const formData = form.getFieldsValue();
      return (
        formData.bibliography !== undefined &&
        formData.general_objective !== undefined &&
        formData.hypothesis !== undefined &&
        formData.justification !== undefined &&
        formData.knowledge_area !== undefined &&
        formData.methodology !== undefined &&
        formData.problem !== undefined &&
        formData.project_type !== undefined &&
        formData.research_line !== undefined &&
        formData.specifics_objectives !== undefined &&
        formData.work_plan !== undefined
      );
    }
  }, [form]);

  if (isLoading || isLoadingStudents || isLoadingCareer) {
    return <Loading />;
  }

  if (isError || isErrorStudents || isErrorCareer) {
    return <ErrorList errors={isError || isErrorStudents} />;
  }

  const showViewComments = async (values) => {
    showViewCommentsModal(true);
    setComments(values);
  };

  const careerInvestigationAreaAndLines = CIAL.filter(
    (data) => data.career === career.name
  );

  const onUpdate = async () => {
    if (canEditPlan()) {
      const formData = form.getFieldsValue();

      if (formData.title && formData.teacher_id) {
        setSending(true);
        const forms = new FormData();
        forms.append("codirector", formData.codirector || "");
        forms.append("partner", formData.partner || "");
        forms.append("project_type", formData.project_type || "");
        forms.append("research_line", formData.research_line || "");
        forms.append("knowledge_area", formData.knowledge_area || "");
        forms.append("title", formData.title);
        forms.append("problem", formData.problem || "");
        forms.append("justification", formData.justification || "");
        forms.append("hypothesis", formData.hypothesis || "");
        forms.append("general_objective", formData.general_objective || "");
        forms.append(
          "specifics_objectives",
          formData.specifics_objectives || ""
        );
        forms.append("methodology", formData.methodology || "");
        forms.append("work_plan", formData.work_plan || "");
        forms.append("bibliography", formData.bibliography || "");
        forms.append("teacher_id", formData.teacher_id);

        if (formData.schedule && formData.schedule.length > 0) {
          forms.append("schedule", formData.schedule[0]);
        }
        setPlanData(forms);
      }
    }
  };

  const onCompleteForm = () => {
    const formData = form.getFieldsValue();
    if (
      formData.bibliography !== undefined &&
      formData.general_objective !== undefined &&
      formData.hypothesis !== undefined &&
      formData.justification !== undefined &&
      formData.knowledge_area !== undefined &&
      formData.methodology !== undefined &&
      formData.problem !== undefined &&
      formData.project_type !== undefined &&
      formData.research_line !== undefined &&
      formData.specifics_objectives !== undefined &&
      formData.work_plan !== undefined
    ) {
      setIsFinished(true);
    }
  };

  const modal = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "¿Estás seguro de enviar el plan?",
      content: (
        <>
          {projects[0].status === "plan_review_commission" ? (
            <Row>
              <Col>
                <p>Una vez enviado le llegará a la comisión.</p>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <p>Una vez enviado le llegará a tu director.</p>
              </Col>
            </Row>
          )}
        </>
      ),
      okText: "Si",
      cancelText: "No",
      onOk() {
        form.submit();
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: { style: { backgroundColor: "#034c70" } },
    });
  };

  const handleFormChange = () => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    onCompleteForm();
    autoSaveTimeoutRef.current = setTimeout(async () => {
      await onUpdate();
    }, 500);
  };

  const onFinish = async () => {
    setSending(true);
    try {
      if (projects[0].status === "plan_review_teacher") {
        await API.post(`/projects/${projects[0].id}/plan-corrections-done`);
      } else if (projects[0].status === "plan_review_commission") {
        await API.post(`/projects/${projects[0].id}/plan-corrections-done-2`);
      } else {
        await API.post(`/projects/${projects[0].id}/plan-sent`);
      }

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

            {projects[0].status === "plan_review_commission" ? (
              <Row>
                <Col>
                  <p style={{ color: "#034c70" }}>
                    Tu plan ha sido enviado.
                    <br />
                    Ahora deberá ser aprobado por la comisión.
                  </p>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col>
                  <p style={{ color: "#034c70" }}>
                    Tu plan ha sido enviado.
                    <br />
                    Ahora deberá ser aprobado por tu director.
                  </p>
                </Col>
              </Row>
            )}
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
    } finally {
      setSending(false);
    }
  };

  const normPhotoFile = (e) => {
    const file = e.file;
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("La imagen debe tener formato JPG o PNG");
      setImageUrl(null);
      return null;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("La imagen debe ser menor a 2MB");
      setImageUrl(null);
      return null;
    }

    if (file.status === "removed") {
      setImageUrl(null);
      return null;
    }

    getBase64(e.file, (imageUrl) => setImageUrl(imageUrl));

    if (Array.isArray(e)) {
      return e;
    }

    return e && [e.file];
  };

  const canEditPlan = () => {
    return (
      projects.length === 0 ||
      (projects[0] &&
        (projects[0].status === "plan_saved" ||
          projects[0].status === "plan_review_teacher" ||
          projects[0].status === "plan_review_commission"))
    );
  };

  const renderCommentIcon = (field) => {
    return (
      projects[0] &&
      projects[0][field] &&
      (projects[0].status === "plan_review_teacher" ||
        projects[0].status === "plan_review_commission") && (
        <CommentOutlined
          style={{
            color: "#034c70",
            fontSize: 25,
            marginLeft: 15,
            float: "right",
          }}
          onClick={() => showViewComments(field)}
        />
      )
    );
  };

  const onChangeInvestigationArea = (value) => {
    const careerInvestigationArea =
      careerInvestigationAreaAndLines[0].data.areas.filter(
        (area) => area.title === value
      );
    const careerInvestigationLines = careerInvestigationArea[0].lines.map(
      (line) => {
        return {
          label: line,
          value: line,
        };
      }
    );
    setInvestigationLines(careerInvestigationLines);
  };

  const careerStudents = students.filter(
    (student) => student.career_id === currentUser.career_id
  );
  return (
    <>
      <Row>
        <Col span={24}>
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
            name="plan-form"
            onFinish={onFinish}
            initialValues={
              projects.length > 0 ? { ...projects[0], schedule: [] } : {}
            }
            validateMessages={validateMessages}
            form={form}
            onFieldsChange={handleFormChange}
            className="plan-form"
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
                    disabled={projects.length > 0}
                  >
                    {teachers &&
                      teachers.map((teacher, index) => (
                        <Option value={teacher.id} key={index}>
                          {teacher.name} {teacher.last_name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item name="codirector" label="Co-director">
                  <Input
                    style={{ width: 300 }}
                    placeholder="Nombre del co-director"
                    disabled={!canEditPlan()}
                  />
                </Form.Item>
                <Form.Item name="partner" label="Seleccione su compañero">
                  <Select
                    placeholder="Seleccione"
                    style={{ width: 300 }}
                    disabled={!canEditPlan()}
                  >
                    {careerStudents.map((student, index) => (
                      <Option value={student.id} key={index}>
                        {student.user.name} {student.user.last_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="project_type"
                  label="Tipo de proyecto"
                  rules={[{ required: true }]}
                >
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
                  </Select>
                </Form.Item>
                <Form.Item
                  name="knowledge_area"
                  label="Área de investigación"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Seleccione"
                    style={{ width: 300 }}
                    disabled={!canEditPlan()}
                    onChange={onChangeInvestigationArea}
                  >
                    {careerInvestigationAreaAndLines[0].data.areas.map(
                      (area, index) => (
                        <Option value={area.title} key={index}>
                          {area.title}
                        </Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="research_line"
                  label="Línea de investigación"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Seleccione"
                    style={{ width: 300 }}
                    disabled={!canEditPlan()}
                    options={investigationLines}
                  />
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
                      // maxRows: 5,
                    }}
                    disabled={!canEditPlan()}
                  />
                </Form.Item>

                {renderCommentIcon("problem_comment")}
                <Form.Item
                  name="problem"
                  label="Planteamiento del problema"
                  rules={[{ required: true }]}
                >
                  <TextArea
                    style={{ width: 600 }}
                    autoSize={{
                      minRows: 4,
                      // maxRows: 15,
                    }}
                    disabled={!canEditPlan()}
                  />
                </Form.Item>

                {renderCommentIcon("justification_comment")}
                <Form.Item
                  name="justification"
                  label="Justificación"
                  rules={[{ required: true }]}
                >
                  <TextArea
                    style={{ width: 600 }}
                    autoSize={{
                      minRows: 4,
                      // maxRows: 15,
                    }}
                    disabled={!canEditPlan()}
                  />
                </Form.Item>

                {renderCommentIcon("hypothesis_comment")}
                <Form.Item name="hypothesis" label="Hipótesis">
                  <TextArea
                    style={{ width: 600 }}
                    autoSize={{
                      minRows: 4,
                      // maxRows: 15,
                    }}
                    disabled={!canEditPlan()}
                  />
                </Form.Item>

                {renderCommentIcon("general_objective_comment")}
                <Form.Item
                  name="general_objective"
                  label="Objetivo General"
                  rules={[{ required: true }]}
                >
                  <TextArea
                    style={{ width: 600 }}
                    autoSize={{
                      minRows: 4,
                      maxRows: 7,
                    }}
                    disabled={!canEditPlan()}
                  />
                </Form.Item>

                {renderCommentIcon("specifics_objectives_comment")}
                <Form.Item
                  name="specifics_objectives"
                  label="Objetivos Específicos"
                  rules={[{ required: true }]}
                >
                  <TextArea
                    style={{ width: 600 }}
                    autoSize={{
                      minRows: 4,
                      // maxRows: 15,
                    }}
                    disabled={!canEditPlan()}
                  />
                </Form.Item>

                {renderCommentIcon("methodology_comment")}
                <Form.Item
                  name="methodology"
                  label="Metodología"
                  rules={[{ required: true }]}
                >
                  <TextArea
                    style={{ width: 600 }}
                    autoSize={{
                      minRows: 4,
                      // maxRows: 15,
                    }}
                    disabled={!canEditPlan()}
                  />
                </Form.Item>

                {renderCommentIcon("work_plan_comment")}
                <Form.Item
                  name="work_plan"
                  label="Plan de trabajo"
                  rules={[{ required: true }]}
                >
                  <TextArea
                    style={{ width: 600 }}
                    autoSize={{
                      minRows: 4,
                      // maxRows: 15,
                    }}
                    disabled={!canEditPlan()}
                  />
                </Form.Item>

                {renderCommentIcon("schedule_comment")}
                <Form.Item
                  name="schedule"
                  label="Cronograma"
                  getValueFromEvent={normPhotoFile}
                  valuePropName="fileList"
                  rules={[{ required: !imageUrl }]}
                >
                  <Upload
                    name="files"
                    accept="image/jpeg,image/png"
                    listType="text"
                    multiple={false}
                    showUploadList={false}
                    beforeUpload={() => false}
                    disabled={!canEditPlan()}
                  >
                    <Button icon={<UploadOutlined />} disabled={!canEditPlan()}>
                      Subir Imagen
                    </Button>
                  </Upload>
                </Form.Item>

                <div style={{ marginLeft: 300, marginBottom: 20 }}>
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt="Cronograma"
                      style={{ width: "200px" }}
                    />
                  )}
                </div>

                {renderCommentIcon("bibliography_comment")}
                <Form.Item
                  name="bibliography"
                  label="Bibliografía"
                  rules={[{ required: true }]}
                >
                  <TextArea
                    style={{ width: 600 }}
                    autoSize={{
                      minRows: 4,
                      // maxRows: 7,
                    }}
                    disabled={!canEditPlan()}
                  />
                </Form.Item>

                {canEditPlan() && (
                  <Form.Item {...tailLayout}>
                    <Row>
                      <Col>
                        <Button
                          className={"submit"}
                          onClick={modal}
                          disabled={!isFinished}
                          style={{ marginLeft: 10 }}
                          loading={sending}
                        >
                          <SendOutlined /> Enviar plan para revisión
                        </Button>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        {!sending ? (
                          <Text type="secondary" disabled>
                            Todos los cambios serán guardados automáticamente.
                          </Text>
                        ) : (
                          <>
                            <Spin /> Guardando cambios...
                          </>
                        )}
                      </Col>
                    </Row>
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {sending && (
        <div style={{ position: "fixed", bottom: 15, right: 15 }}>
          <Spin /> Guardando cambios...
        </div>
      )}

      <Modal
        visible={showComments}
        footer={null}
        onCancel={() => showViewCommentsModal(false)}
      >
        <ViewComments
          comments={comments}
          planID={projects[0] ? projects[0].id : ""}
          plan={projects}
          closeModal={() => showViewCommentsModal(false)}
        />
      </Modal>
    </>
  );
};

export default withAuth(PlanForm);
