import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./userList.styles.css";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const getUsers = () => {
    fetch("https://api.github.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("Unable to fetch Users", err);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleClickUser = (user) => {
    navigate("/userDetails", { state: { user: user } });
  };

  const renderUserdata = () => {
    return users.map((user, index) => {
      return (
        <div key={user.id + index}>
          <Card
            sx={{ maxWidth: 345, padding: 2, margin: 2 }}
            onClick={() => handleClickUser(user)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={user.avatar_url}
                alt={user.login}
                sx={{ borderRadius: 50 }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  {user.login}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      );
    });
  };
  return (
    <>
      <div className="cardContainer">{renderUserdata()}</div>
    </>
  );
};

export default UserList;
