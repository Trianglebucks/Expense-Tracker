import styled from "@emotion/styled";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useAppContext } from "../context/AppContext";
import dateFormat from "../utils/DateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
  const { incomes, expenses } = useAppContext();
  const data = {
    labels: incomes.map(income => {
      const { date } = income;
      return dateFormat(date);
    }),

    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map(income => {
            const { amount } = income;
            return amount;
          })
        ],
        backgroundColor: "green",
        tension: 0.2
      },
      {
        label: "Expenses",
        data: [
          ...expenses.map(expense => {
            const { amount } = expense;
            return amount;
          })
        ],
        backgroundColor: "red",
        tension: 0.2
      }
    ]
  };
  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  padding: 1rem;

  height: 100%;
`;
export default Chart;
