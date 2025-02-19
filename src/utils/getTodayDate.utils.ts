export function getTodayDate(): string {
  const today = new Date();
  const year: number = today.getFullYear();
  const month: string = String(today.getMonth() + 1).padStart(2, "0");
  const day: string = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const formatDateToKorean = (dateString: string): string => {
  if (!dateString) return "";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [year, month, day] = dateString.split("-").map(Number);
  return `${month}월 ${day}일`;
};
