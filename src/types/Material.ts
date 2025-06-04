// 자료 상태 타입

// 강의 자료 인터페이스
export interface Material {
  materialId: number;
  title: string;
  content: string;
  writer: string;
  encodedFiles: string[];
  createdAt: Date;
}

export interface MaterialByLectureId {
  materialId: number;
  title: string;
  createdAt: Date;
}

export interface MaterialCreate {
  title: string;
  content: string;
  encodedFiles: string[];
}

// 자료 파일 인터페이스 (단일 조회 시 encodedFiles로 대체됨)
/*
export interface MaterialFile {
  id: number;
  materialId: number;
  //-contents
  fileName: string;
  // ~
}
*/
