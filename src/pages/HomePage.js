import React from 'react';
import { useAuth } from '../providers/Auth';
import AdministrativeHome from '../components/AdministrativeHome';
import TeacherHome from '../components/TeacherHome';
import SecretaryHome from '../components/SecretaryHome';
import StudentHome from '../components/StudentHome';
import SubLayout from '../components/SubLayout';

const HomePage = () => {
  const { currentUser } = useAuth();
  return (
    <SubLayout>
      { currentUser.role === 'ROLE_TEACHER'
        ? (
          <TeacherHome />
        )
        : currentUser.role === 'ROLE_SECRETARY'
          ? (
            <SecretaryHome />
          )
          : currentUser.role === 'ROLE_ADMIN'
            ? (
              <AdministrativeHome />
            )
            :
            <StudentHome /> }
    </SubLayout>
  );
};

export default HomePage;
