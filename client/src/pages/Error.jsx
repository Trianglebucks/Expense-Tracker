import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import ErrorImage from "../assets/error-image.svg";

const Error = () => {
  return (
    <Wrapper>
      <div>
        <img src={ErrorImage} alt="error" />

        <Typography variant="h3">Ohh! page not Found</Typography>
        <Typography variant="p">
          We can't seem to find what you're looking for
        </Typography>
        <Button
          href="/landing"
          sx={{
            display: "block"
          }}
        >
          Go back
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
`;

export default Error;
