const API_KEY = process.env.REACT_APP_MAPLE_KEY;

// 업데이트 목록 조회
export const fetchUpdateData = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "x-nxopen-api-key": API_KEY || "",
    },
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  const data = await response.json();
  return data.update_notice.slice(0, 10);
};

// 이벤트 목록 조회
export const fetchEventData = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "x-nxopen-api-key": API_KEY || "",
    },
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  const data = await response.json();
  return data.event_notice.slice(0, 10);
};
