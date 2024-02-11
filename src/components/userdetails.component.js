import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Chip, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const getUserDetails = () => {
    setLoading(true);
    fetch(location.state.user.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setUserDetails(data);
      })
      .catch((err) => {
        console.log("Unable to fetch Individual User Details", err);
      });
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const renderCompanyDetails = () => {
    let companyList = userDetails.company.split(",");

    return companyList.map((company) => {
      return <li key={company}>{company}</li>;
    });
  };

  const renderSocialHandles = (label, count) => {
    return (
      !!count && (
        <Typography variant="h6" color="text.primary" sx={{ margin: "0.5rem" }}>
          <Chip label={label} color="primary" />
          <span
            style={{
              marginLeft: "0.5rem",
              fontWeight: "400",
              fontSize: "20px",
            }}
          >
            {count}
          </span>
        </Typography>
      )
    );
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      (
      <>
        <Button
          variant="contained"
          sx={{ margin: "2.5rem 5rem 0 5rem" }}
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>

        <Card
          sx={{
            maxWidth: "1000px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            margin: "5rem",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            minHeight: "500px",
            ...(loading && { backgroundColor: "#F7F7F7" }),
          }}
        >
          {loading && (
            <Box
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {!loading && (
            <>
              <CardMedia
                sx={{
                  height: 500,
                  width: 600,
                  marginRight: "1rem",
                  borderRadius: "0.4rem",
                }}
                image={userDetails.avatar_url}
                title={userDetails.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  mx={{ margin: "1rem" }}
                >
                  {userDetails.name}
                </Typography>
                {userDetails.company && (
                  <Typography
                    variant="body1"
                    color="text.primary"
                    mx={{ margin: "1rem" }}
                  >
                    <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>
                      Company Details
                    </span>
                    {renderCompanyDetails()}
                  </Typography>
                )}
                {renderSocialHandles(
                  "Public repositories",
                  userDetails.public_repos
                )}
                {renderSocialHandles("Followers", userDetails.followers)}
                {renderSocialHandles("Following", userDetails.following)}
              </CardContent>
            </>
          )}
        </Card>
      </>
      )
    </>
  );
};
