import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ComponentType, Fragment } from "react";
import RootPage from "./page";
import {
  DashboardLayout,
  DashboardPage,
  SubjectByIdPage,
  SubjectPage,
} from "./dashboard";
import Loading from "@/design/Loading";
import { SignInPage } from "./sign-in";
import { AdminLayout, AdminPage } from "./admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="subjects">
            <Route index element={<SubjectPage />} />
            <Route path=":subjectId" element={<SubjectByIdPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}
