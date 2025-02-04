// 업데이트 목록 조회
export interface Update {
  title: string;
  url: string;
  notice_id: number;
  date: string;
}

// 이벤트 목록 조회
export interface Event {
  title: string;
  url: string;
  notice_id: number;
  date: string;
  date_event_start: string;
  date_event_end: string;
}
