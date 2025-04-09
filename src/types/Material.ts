// 자료 상태 타입

// 강의 자료 인터페이스
export interface Material {
  id: number;
  lectureId: number;
  //-contents
  title: string;
  content: string;
  createdAt: Date;
}

// 자료 파일 인터페이스
export interface MaterialFile {
  id: number;
  materialId: number;
  //-contents
  fileName: string;
  // ~
}
