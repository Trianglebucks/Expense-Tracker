// Income icons
import { FaMoneyBill } from "react-icons/fa";
import { SiFreelancer } from "react-icons/si";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";

// Expense icons
import { MdFastfood } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { MdEmojiTransportation } from "react-icons/md";
import { BsHouseFill } from "react-icons/bs";
import { MdSignalWifi4Bar } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";

//Other
import { FaDotCircle } from "react-icons/fa";

const CategoryIcon = ({ typeCategory }) => {
  switch (typeCategory) {
    case "Salary":
      return <FaMoneyBill size={40} />;
    case "Freelancing":
      return <SiFreelancer size={40} />;
    case "Investments":
      return <FaMoneyBillWave size={40} />;
    case "Stocks":
      return <FaChartLine size={40} />;
    case "Bank":
      return <BsBank2 size={40} />;
    case "Other":
      return <FaDotCircle size={40} />;
    case "Food":
      return <MdFastfood size={40} />;
    case "Healthcare":
      return <MdHealthAndSafety size={40} />;
    case "Entertainment":
      return <GrGallery size={40} />;
    case "Transportation":
      return <MdEmojiTransportation size={40} />;
    case "Housing":
      return <BsHouseFill size={40} />;
    case "Internet":
      return <MdSignalWifi4Bar size={40} />;
    case "Insurance":
      return <GiPayMoney size={40} />;
  }
};
export default CategoryIcon;
