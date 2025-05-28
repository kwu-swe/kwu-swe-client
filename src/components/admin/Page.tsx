import useUser from "@/hook/useUser";

export default function AdminPage() {
  const { user } = useUser()
  return <div>
    <div>안녕하세요 {user?.name} 교수님</div>
  </div>;
}

