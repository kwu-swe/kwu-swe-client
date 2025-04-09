import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ComponentType, Fragment } from "react";
import useRoute from "@/hook/useRoute";
import {
  DashboardLayout,
  DashboardPage,
  SubjectPage,
  SubjectByIdPage,
  SubjectMaterialPage,
  SubjectAssignmentPage,
  SubjectAnnouncementPage,
} from "./dashboard";
import Loading from "@/design/Loading";
import RootPage from "./page";
import { SignInPage } from "./sign-in";

export default function App() {
  const routes = useRoute();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="subjects">
            <Route index element={<SubjectPage />} />
            <Route path=":subjectId" element={<SubjectByIdPage />} />
            <Route
              path=":subjectId/announcements/:announcementId"
              element={<SubjectAnnouncementPage />}
            />
            <Route
              path=":subjectId/materials/:materialId"
              element={<SubjectMaterialPage />}
            />
            <Route
              path=":subjectId/assignments/:assignmentId"
              element={<SubjectAssignmentPage />}
            />
          </Route>
        </Route>
        <Route path="*" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

function RenderComponent(
  Component: ComponentType<any>,
  Layout: ComponentType<any> | null
) {
  if (Layout) return <Layout children={<Component />} />;
  return <Fragment children={<Component />} />;
}
