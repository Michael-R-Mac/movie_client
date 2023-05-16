import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { FavoriteMoviesView } from "../FavoriteMovies/FavoriteMovies";

export const ProfileView = ({ user, movies }) => {
  const token = useSelector((state) => state.token);
  const [username, setUsername] = useState("");
  const [UsernameToDelete, setUsernameToDelete] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const HandleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://cf-movie-api.herokuapp.com/users/${user.username}", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Update successful");
      } else {
        alert("Update failed");
      }
    });
  };

  const HandleDelete = (event) => {
    event.preventDefault();

    const data = {
      Username: UsernameToDelete,
    };

    fetch("https://cf-movie-api.herokuapp.com/users/${user.username}", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Delete successful");
      } else {
        alert("Delete failed");
      }
    });
  };

  return (
    <>
      <div>
        <p>User: {user.Username}</p>
        <p>Email: {user.Email}</p>
        <p>Birthday: {user.Birthday}</p>
        <h2>Favorite movies</h2>
        <FavoriteMoviesView />
      </div>
      <>
        <Form onSubmit={HandleUpdate}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="4"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="4"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="m-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Form onSubmit={HandleDelete}>
          <Form.Group controlId="formUsernameToDelete">
            <Form.Label>Username to delete:</Form.Label>
            <Form.Control
              type="text"
              value={UsernameToDelete}
              onChange={(e) => setUsernameToDelete(e.target.value)}
              required
              minLength="4"
            />
          </Form.Group>
          <Button className="m-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    </>
  );
};
