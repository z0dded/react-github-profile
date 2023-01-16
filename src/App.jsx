import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [showInputPage, setShowInputPage] = useState(true);
  const [showUserProfile, setShowUserProfile] = useState(false);
  let url;

  const [userName, setUserName] = useState("");
  const [submittedUser, setSubmittedUser] = useState("");
  const [invalidUserName, setInvalidUserName] = useState(false);

  const [icon, setIcon] = useState("");
  const [login, setLogin] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [followers, setFollowers] = useState("");
  const [gists, setGists] = useState("");
  const [repos, setRepos] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    url = `https://api.github.com/users/${userName}`;
    fetchData(url);
  };

  const fetchData = async (apiurl) => {
    try {
      const response = await axios.get(apiurl).then((res) => res.data);

      createUserProfile(response);

      setShowInputPage(false);
      setShowUserProfile(true);
    } catch (err) {
      setSubmittedUser(userName);
      setInvalidUserName(true);
    }
  };

  const createUserProfile = (response) => {
    setLogin(response.login);
    setIcon(response.avatar_url);
    setLocation(response.location);
    setBio(response.bio);
    setFollowers(response.followers);
    setRepos(response.public_repos);
    setGists(response.public_gists);
  };

  return (
    <>
      <div
        className={showInputPage ? styles.submit_user : styles.hide_submit_user}
      >
        <h1>Type your github username below</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit">Submit</button>
          <p
            className={
              invalidUserName ? styles.invalid_username : styles.valid_username
            }
          >
            The username "{submittedUser}" does not exist
          </p>
        </form>
      </div>
      <div
        className={
          showUserProfile ? styles.user_profile : styles.hide_user_profile
        }
      >
        <div className={styles.user_profile__card}>
          <div
            className={styles.user_profile__icon}
            style={{ backgroundImage: `url(${icon})` }}
          ></div>
          <h1 className={styles.user_profile__login}>{login}</h1>
          <p className={styles.user_profile__location}>
            <i
              className="fa-solid fa-location-dot"
              style={{ fontStyle: "italic" }}
            ></i>
            {location ?? "Not Informed"}
          </p>
          <hr className={styles.user_profile__line} />
          <p
            className={
              bio
                ? styles.user_profile__bio
                : styles.user_profile__bio_not_written
            }
          >
            {bio ?? "Bio not written yet"}
          </p>
          <div className={styles.user_profile__statistics}>
            <div className={styles.user_profile__numbers}>
              <h3>{followers}</h3>
              <p>followers</p>
            </div>
            <div className={styles.user_profile__numbers}>
              <h3>{gists}</h3>
              <p>public gists</p>
            </div>
            <div className={styles.user_profile__numbers}>
              <h3>{repos}</h3>
              <p>public repos</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
