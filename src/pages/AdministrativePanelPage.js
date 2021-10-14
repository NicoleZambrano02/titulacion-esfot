import React from "react";
import withAuth from "../hocs/withAuth";
import SubLayout from "../components/SubLayout";
import AdministrativePanel from "../components/AdministrativePanel";

const AdministrativePanelPage = ({ location }) => {
  return (
    <SubLayout>
      <AdministrativePanel
        assignTribunal={location.state.assignTribunal}
        allProjects={location.state.allProjects}
        assignDate={location.state.assignDate}
      />
    </SubLayout>
  );
};

export default withAuth(AdministrativePanelPage);
