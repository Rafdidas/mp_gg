import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
      refetchOnWindowFocus: false, // 창 포커스 시 리페치 비활성화
      retry: 0, // 요청 실패 시 재시도 비활성화
    },
  },
});

export default queryClient;
