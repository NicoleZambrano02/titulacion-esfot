import React from "react";
import TeacherPanel from "../components/TeacherPanel";
import withAuth from "../hocs/withAuth";
import SubLayout from "../components/SubLayout";

const TeacherPanelPage = () => {
  return (
    <SubLayout>
      <TeacherPanel />
    </SubLayout>
  );
};

export default withAuth(TeacherPanelPage);
