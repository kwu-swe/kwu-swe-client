import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ComponentType, Fragment } from "react";
import useRoute from "@/hook/useRoute";
import {
  DashboardLayout,
  DashboardPage,
  SubjectByIdPage,
  SubjectPage,
} from "./dashboard";
import Loading from "@/design/Loading";

export default function App() {
  const routes = useRoute();
  return (
    <BrowserRouter>
      <Routes>
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

function RenderComponent(
  Component: ComponentType<any>,
  Layout: ComponentType<any> | null
) {
  if (Layout) return <Layout children={<Component />} />;
  return <Fragment children={<Component />} />;
}
