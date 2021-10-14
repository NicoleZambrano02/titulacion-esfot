import React from "react";
import "../styles/plan-form.css";
import withAuth from "../hocs/withAuth";
import PlanReview from "./PlanReview";

const PlanReviewCommittee = ({ idPlan }) => {
  return (
    <>
      <PlanReview idPlan={idPlan} user={"committee"} />
    </>
  );
};

export default withAuth(PlanReviewCommittee);
