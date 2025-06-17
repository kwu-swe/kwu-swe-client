import useUser from "@/hook/useUser";
import useLecture from "@/hook/useLecture";
import useCourse from "@/hook/useCourse";
import useLocation from "@/hook/useLocation";
import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";
import {
  MdSchool,
  MdPeople,
  MdMenuBook,
  MdLocationOn,
  MdArrowForward,
  MdCheckCircle,
  MdInfo,
} from "react-icons/md";

export default function AdminPage() {
  const { user } = useUser();
  const { lectures } = useLecture();
  const { courses } = useCourse();
  const { locations } = useLocation();
  const navigate = useNavigate();

  const container = {
    base: "w-full min-h-screen bg-gradient-to-br from-gray-50 to-white",
    padding: "p-6 md:p-8",
  };

  const welcomeSection = {
    container: "mb-8",
    title: "text-3xl md:text-4xl font-bold text-gray-900 mb-2",
    subtitle: "text-lg text-gray-600",
    accent: "text-kw-brown font-semibold",
  };

  const statsGrid = {
    container: "grid grid-cols-2 md:grid-cols-3 gap-6 mb-8",
  };

  const statCard = {
    base: "bg-white rounded-xl border border-gray-100 p-6 shadow-card hover:shadow-lg transition-all duration-200",
    header: "flex items-center justify-between mb-4",
    icon: "w-8 h-8 text-kw-brown bg-kw-brown/10 rounded-lg p-1.5",
    value: "text-2xl font-bold text-gray-900",
    label: "text-sm text-gray-600 mt-1",
    trend: "text-xs text-green-600 font-medium",
  };

  const functionsGrid = {
    container: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",
  };

  const functionCard = {
    base: "group bg-white rounded-xl border border-gray-100 p-6 shadow-card hover:shadow-lg hover:border-kw-brown/20 transition-all duration-200 cursor-pointer",
    header: "flex items-center justify-between mb-4",
    iconContainer:
      "w-12 h-12 bg-kw-brown/10 rounded-lg flex items-center justify-center group-hover:bg-kw-brown/20 transition-colors",
    icon: "w-6 h-6 text-kw-brown",
    arrow:
      "w-5 h-5 text-gray-400 group-hover:text-kw-brown group-hover:translate-x-1 transition-all",
    title: "text-lg font-semibold text-gray-900 mb-2",
    description: "text-sm text-gray-600 mb-4",
    features: "space-y-2",
    feature: "flex items-center text-xs text-gray-500",
    featureIcon: "w-3 h-3 text-green-500 mr-2",
  };

  const infoSection = {
    container: "bg-blue-50 border border-blue-200 rounded-xl p-6",
    header: "flex items-center gap-3 mb-4",
    icon: "w-6 h-6 text-blue-600",
    title: "text-lg font-semibold text-blue-900",
    content: "text-sm text-blue-700 space-y-2",
  };

  const adminFunctions = [
    {
      title: "강의 관리",
      description: "강의 개설, 수정, 삭제 및 강의 정보를 관리합니다.",
      icon: MdSchool,
      path: "/admin/lectures",
      features: ["강의 개설 및 수정", "강의실 배정", "시간표 관리"],
    },
    {
      title: "사용자 관리",
      description: "학생 및 교수 계정을 관리하고 권한을 설정합니다.",
      icon: MdPeople,
      path: "/admin/users",
      features: ["사용자 계정 관리", "권한 설정", "프로필 수정"],
    },
    {
      title: "과목 관리",
      description: "학과별 과목을 관리하고 교육과정을 설정합니다.",
      icon: MdMenuBook,
      path: "/admin/courses",
      features: ["과목 등록 및 수정", "교육과정 관리", "학점 체계 설정"],
    },
    {
      title: "강의실 관리",
      description: "강의실 정보를 관리하고 예약 시스템을 운영합니다.",
      icon: MdLocationOn,
      path: "/admin/locations",
      features: ["강의실 등록", "시설 정보 관리", "예약 현황 조회"],
    },
    // {
    //   title: "통계 및 분석",
    //   description: "강의 및 사용자 관련 통계를 확인하고 분석합니다.",
    //   icon: MdBarChart,
    //   path: "/admin/analytics",
    //   features: ["수강 통계", "사용자 활동 분석", "시스템 성능 모니터링"],
    // },
    // {
    //   title: "시스템 설정",
    //   description: "전체 시스템 설정과 환경을 관리합니다.",
    //   icon: MdSettings,
    //   path: "/admin/settings",
    //   features: ["시스템 환경 설정", "백업 및 복원", "보안 설정"],
    // },
  ];

  // 실제 데이터 기반 통계
  const stats = [
    {
      label: "등록된 강의",
      value: lectures.length.toString(),
      trend: "실시간 데이터",
      icon: MdSchool,
    },
    {
      label: "개설 과목",
      value: courses.length.toString(),
      trend: "활성 과목",
      icon: MdMenuBook,
    },
    {
      label: "등록된 강의실",
      value: locations.length.toString(),
      trend: "사용 가능",
      icon: MdLocationOn,
    },
    // {
    //   label: "현재 접속자",
    //   value: "1",
    //   trend: user?.name || "관리자",
    //   icon: MdPeople,
    // },
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={cn(container)}>
      {/* Welcome Section */}
      <div className={cn(welcomeSection.container)}>
        <h1 className={cn(welcomeSection.title)}>
          안녕하세요,{" "}
          <span className={cn(welcomeSection.accent)}>{user?.name}</span> 교수님
          👋
        </h1>
        <p className={cn(welcomeSection.subtitle)}>
          오늘도 광운대학교 학사 관리 시스템에 오신 것을 환영합니다.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className={cn(statsGrid.container)}>
        {stats.map((stat, index) => (
          <div key={index} className={cn(statCard.base)}>
            <div className={cn(statCard.header)}>
              <stat.icon className={cn(statCard.icon)} />
            </div>
            <div className={cn(statCard.value)}>{stat.value}</div>
            <div className={cn(statCard.label)}>{stat.label}</div>
            <div className={cn(statCard.trend)}>{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Functions Grid - 2x2 Layout */}
      <div className={cn(functionsGrid.container)}>
        {adminFunctions.map((func, index) => (
          <div
            key={index}
            className={cn(functionCard.base)}
            onClick={() => handleCardClick(func.path)}
          >
            <div className={cn(functionCard.header)}>
              <div className={cn(functionCard.iconContainer)}>
                <func.icon className={cn(functionCard.icon)} />
              </div>
              <MdArrowForward className={cn(functionCard.arrow)} />
            </div>

            <h3 className={cn(functionCard.title)}>{func.title}</h3>
            <p className={cn(functionCard.description)}>{func.description}</p>

            <div className={cn(functionCard.features)}>
              {func.features.map((feature, featureIndex) => (
                <div key={featureIndex} className={cn(functionCard.feature)}>
                  <MdCheckCircle className={cn(functionCard.featureIcon)} />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className={cn(infoSection.container)}>
        <div className={cn(infoSection.header)}>
          <MdInfo className={cn(infoSection.icon)} />
          <h3 className={cn(infoSection.title)}>시스템 정보</h3>
        </div>
        <div className={cn(infoSection.content)}>
          <p>
            • 실시간 데이터 연동: 강의, 과목, 강의실 정보가 실시간으로
            업데이트됩니다.
          </p>
          <p>• 각 카드를 클릭하여 해당 관리 페이지로 이동할 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
