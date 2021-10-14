import React from "react";
import { Layout } from "antd";
import { useAuth } from "../providers/Auth";
import SubMenu from "./SubMenu";
import SiderAdministrative from "./SiderAdministrative";
import SiderTeacher from "./SiderTeacher";
import SiderSecretary from "./SiderSecretary";
import SiderStudent from "./SiderStudent";
import { useProjects } from "../data/useProjects";
import Loading from "./Loading";
import ShowError from "./ShowError";

const { Content } = Layout;
const SubLayout = ({ children }) => {
  const { currentUser } = useAuth();
  const { projectsList, isLoading, isError } = useProjects();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ShowError />;
  }

  const getSider = () => {
    let sider;

    switch (currentUser.role) {
      case "ROLE_TEACHER":
        sider = <SiderTeacher user={currentUser} />;
        break;
      case "ROLE_SECRETARY":
        sider = <SiderSecretary projectsList={projectsList} />;
        break;
      case "ROLE_STUDENT":
        sider = <SiderStudent />;
        break;
      case "ROLE_ADMIN":
        sider = <SiderAdministrative projectsList={projectsList} />;
        break;
      default:
        sider = null;
        break;
    }

    return sider;
  };

  return (
    <Layout>
      {currentUser && getSider()}
      <Layout>
        <SubMenu />
        <Content style={{ padding: 50 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default SubLayout;
