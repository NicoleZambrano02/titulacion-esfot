import React, { useEffect, useState } from "react";
import RubricProduct from "./RubricProduct";
import RubricReport from "./RubricReport";
import { Button, Form, message, Typography } from "antd";
import API from "../data";
import { usePlanContent } from "../data/usePlan";
import { useAuth } from "../providers/Auth";
import { useTeacherJuryData } from "../data/useTeacherJuryData";
const { Title } = Typography;

const Rubrics = ({ idPlan }) => {
  const [finalGradeProduct, setFinalGradeProduct] = useState(0);
  const [finalGradeReport, setFinalGradeReport] = useState(0);
  const [finalGrade, setFinalGrade] = useState(0);
  const [formProduct] = Form.useForm();
  const [formReport] = Form.useForm();
  const { plan } = usePlanContent(idPlan);
  const { currentUser } = useAuth();
  const { teacherJuryData, mutate } = useTeacherJuryData(
    idPlan,
    currentUser.userable.id
  );

  useEffect(() => {}, [finalGradeReport, finalGradeProduct]);

  useEffect(() => {
    setFinalGrade((finalGradeProduct + finalGradeReport) / 2);
  }, [finalGradeReport, finalGradeProduct]);

  const onChangeRubric = (type, grade) => {
    if (type === "product") {
      setFinalGradeProduct(grade);
    } else {
      setFinalGradeReport(grade);
    }
  };

  const onFinish = async () => {
    try {
      await formProduct.validateFields();
      await formReport.validateFields();
      console.log("finalGrade", finalGrade);

      const response = await API.post(`projects/${idPlan}/project-graded`, {
        grade: finalGrade,
      });
      await mutate();
      message.success("Cambios guardados correctamente!");
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("plan", plan);
  console.log("teacherJuryData", teacherJuryData);

  return (
    <div>
      {teacherJuryData ? (
        teacherJuryData.grade === null ? (
          <>
            <RubricProduct onChange={onChangeRubric} form={formProduct} />
            <RubricReport onChange={onChangeRubric} form={formReport} />
            <Title level={2} style={{ marginTop: 10, color: "#034c70" }}>
              Nota final: <strong>{finalGrade.toFixed(2)}</strong>
            </Title>
          </>
        ) : (
          <Title level={2} style={{ marginTop: 10, color: "#034c70" }}>
            Nota final: <strong>{teacherJuryData.grade.toFixed(2)}</strong>
          </Title>
        )
      ) : null}

      {teacherJuryData && teacherJuryData.grade === null && (
        <Button type="primary" htmlType="button" onClick={onFinish}>
          Enviar nota
        </Button>
      )}
    </div>
  );
};

export default Rubrics;
