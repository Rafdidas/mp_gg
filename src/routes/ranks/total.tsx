import { useQuery } from "@tanstack/react-query";
import { fetchRankingData } from "../../api/rankingApi";
import { getTodayDate } from "../../utils/getTodayDate.utils";
import Overall from "../../components/ranking/overall";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Total = () => {
  const todayDate = getTodayDate();
  const overallUrl = `${BASE_URL}/ranking/overall?date=${todayDate}`;

  const { data: overallRanking } = useQuery({
    queryKey: ["ranking", "overall"],
    queryFn: () => fetchRankingData(overallUrl),
  });
  return (
    <div>
      Total
      <div className="wrap-inner">
        <Overall overallRanking={overallRanking || []} />
      </div>
    </div>
  );
};

export default Total;
