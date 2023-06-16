import { Typography, Grid, Card, CardContent, Button } from "@mui/material";
import styled from "@emotion/styled";

import { FiActivity } from "react-icons/fi";
import { TbCurrencyPeso } from "react-icons/tb";
import { AiFillCalendar } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import CategoryIcon from "../utils/CategoryIcon";
import { useAppContext } from "../context/AppContext";
import dateFormat from "../utils/DateFormat";

const TransacContainer = ({
  _id,
  title,
  amount,
  date,
  typeCategory,
  description,
  endPoint
}) => {
  const { deleteTransaction } = useAppContext();
  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start"
              }}
            >
              <CategoryIcon typeCategory={typeCategory} />
            </Grid>
            <Grid item xs={8}>
              {/* Title */}
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                {title}
              </Typography>
              {/* Amount */}
              <Typography
                variant="body"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <TbCurrencyPeso style={{ marginRight: 5 }} />
                {amount}
              </Typography>
              {/* Date */}
              <Typography
                variant="body"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <AiFillCalendar style={{ marginRight: 5 }} />
                {dateFormat(date)}
              </Typography>
              {/* Description */}
              <Typography
                variant="body"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <MdDescription style={{ marginRight: 5 }} />
                {description}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end"
              }}
            >
              <Button
                sx={{ color: "black" }}
                onClick={() => deleteTransaction(_id, endPoint)}
              >
                <BsFillTrashFill size={40} />
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default TransacContainer;
