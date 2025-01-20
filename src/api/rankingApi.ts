const API_KEY = process.env.REACT_APP_MAPLE_KEY;

export const fetchRankingData = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url, {
    headers: {
      "x-nxopen-api-key": API_KEY || "",
    },
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  const data = await response.json();
  console.log(data);
  return data.ranking;
};
