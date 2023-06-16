import { Box, Grid, Container, Typography, Button } from "@mui/material";
import { LogoBlack } from "../components";
import LandingImage from "../assets/expense-image.svg";
import styled from "@emotion/styled";

const Image = styled.img`
  height: 50vh;
  width: 100%;
  display: none;
  @media (min-width: 900px) {
    display: block;
  }
`;

const Item = styled.div``;
const Landing = () => {
  return (
    <Container
      sx={{
        width: "90vw",
        maxWidth: "1120px"
      }}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              margin: "20px 0"
            }}
          >
            {/* Atlas Logo */}
            <LogoBlack />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Item>
              <Typography
                variant="h3"
                sx={{ marginBottom: "20px", marginTop: "40px" }}
              >
                Expense{" "}
                <Typography variant="span" sx={{ color: "#1976d2" }}>
                  Tracker
                </Typography>{" "}
                App
              </Typography>
              <Typography
                variant="p"
                sx={{ marginBottom: "20px", display: "block" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Perspiciatis nesciunt, impedit quis cum cupiditate aliquid iusto
                facilis omnis doloremque a.
              </Typography>

              <Button href="/login" variant="contained">
                Get started
              </Button>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Item>
              {/* Landing image */}
              <Image src={LandingImage} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Landing;
