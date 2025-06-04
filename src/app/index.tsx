import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRouteCheck } from "@/hook/useRouteCheck";

// ** pages
import RootPage from "./page";
import {
  DashboardLayout,
  DashboardPage,
  LectureByIdPage,
  LecturePage,
  LectureMaterialPage,
  LectureAssignmentPage,
  LectureAnnouncementPage,
  LectureCoursePage,
  ConveniencesPage,
  ConsultsPage,
} from "./dashboard";

import { SignInPage } from "./sign-in";
import { AdminLayout, AdminPage, CoursePage, LectureAdminPage, LocationPage } from "./admin";

// ** components
import NotFound from "@/components/(common)/notfound/Page";
import UserPage from "@/components/admin/users/Page";

// 라우팅 체크를 위한 래퍼 컴포넌트
function RouteGuard({
  children,
  checkAuth,
  checkRole,
  redirectTo,
}: {
  children: React.ReactNode;
  checkAuth?: boolean;
  checkRole?: string[];
  redirectTo?: string;
}) {
  const { LoadingComponent } = useRouteCheck({
    checkAuth,
    checkRole,
    redirectTo,
  });

  if (LoadingComponent) return <LoadingComponent />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공개 페이지 */}
        <Route path="/" element={<RootPage />} />
        <Route path="/sign-in" element={<SignInPage />} />

        {/* 관리자 페이지 */}
        <Route
          path="/admin"
          element={
            <RouteGuard checkAuth checkRole={["ADMIN"]} redirectTo="/dashboard">
              <AdminLayout />
            </RouteGuard>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="locations" element={<LocationPage />} />
          <Route path="courses" element={<CoursePage />} />
          <Route path="lectures" element={<LectureAdminPage />} />
          <Route path="users" element={<UserPage />} />
        </Route>

        {/* 대시보드 페이지 */}
        <Route
          path="/dashboard"
          element={
            <RouteGuard checkAuth redirectTo="/sign-in">
              <DashboardLayout />
            </RouteGuard>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="lectures">
            <Route index element={<LecturePage />} />
            <Route path="register" element={<LectureCoursePage />} />
            <Route path="management" element={<LecturePage />} />
            <Route path=":lectureId" element={<LectureByIdPage />} />
            <Route
              path=":lectureId/announcement/:announcementId"
              element={<LectureAnnouncementPage />}
            />
            <Route
              path=":lectureId/material/:materialId"
              element={<LectureMaterialPage />}
            />
            <Route
              path=":lectureId/assignment/:assignmentId"
              element={<LectureAssignmentPage />}
            />
          </Route>
          {/* 편의 기능 */}
          <Route path="conveniences">
            <Route index element={<ConveniencesPage />} />
            <Route path="consults" element={<ConsultsPage />} />
          </Route>
        </Route>
        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
