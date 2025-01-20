const API_KEY = process.env.REACT_APP_MAPLE_KEY;

export const getFetchBoard = async <T>(
  endpoint: string,
  setData: (data: T[]) => void
) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "x-nxopen-api-key": API_KEY || "",
      },
    });

    if (!response.ok) {
      throw new Error(`error: ${response.status}`);
    }

    const data = await response.json();
    setData(data.update_notice);
  } catch (error) {
    console.error(error);
  }
};
