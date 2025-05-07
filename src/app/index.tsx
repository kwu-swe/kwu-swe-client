import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ComponentType, Fragment } from "react";
import RootPage from "./page";
import {
  DashboardLayout,
  DashboardPage,
  LectureByIdPage,
  LecturePage,
} from "./dashboard";
import Loading from "@/design/Loading";
import { SignInPage } from "./sign-in";
import { AdminLayout, AdminPage, CoursePage, LocationPage } from "./admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="locations" element={<LocationPage />} />
          <Route path="courses" element={<CoursePage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="lectures">
            <Route index element={<LecturePage />} />
            <Route path=":subjectId" element={<LectureByIdPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}
