import React, { useState } from "react";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import "../../styles/components/_instellingen.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, gql } from "@apollo/client";
import {
  CHANGE_USERNAME,
  GET_USER_NAME,
  GET_USER_PICTURE,
} from "../../graphQL/queries";
import { Link } from "react-router-dom";

function Instellingen() {
  const { user } = useAuth0();
  const [username, setUsername] = useState("");
  const [music, setMusic] = useState(true);
  const [sound, setSound] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_NAME, {
    variables: { auth0_user_id: user?.sub },
  });

  const [changeUsername] = useMutation(CHANGE_USERNAME, {
    refetchQueries: [
      { query: GET_USER_NAME, variables: { auth0_user_id: user?.sub } },
    ],
    awaitRefetchQueries: true,
  });

  const {
    data: userPictureData,
    loading: pictureLoading,
    error: pictureError,
  } = useQuery(GET_USER_PICTURE, {
    variables: { auth0_user_id: user?.sub },
  });

  if (userLoading || pictureLoading) return <Loading />;
  if (userError) return <p>Error: {userError.message}</p>;
  if (pictureError) return <p>Error: {pictureError.message}</p>;

  const handleMusic = (b) => {
    setMusic(b);
  };

  const handleSound = (b) => {
    setSound(b);
  };

  const handleTheme = (value) => {
    setIsDarkMode(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await changeUsername({
        variables: { auth0_user_id: user.sub, username },
      });
      console.log("Username updated:", userData);
    } catch (err) {
      console.error("Error updating username:", err);
    }
  };

  return (
    <div>
      <div className="settings container">
        <div className="outer-settingsButton">
          <Link className="settingsButton" to="/" />
        </div>
        <h1>Instellingen</h1>
        <div className="avatar">
          <Link to="/avatarselectie">
            <img src={userPictureData.speler.avatar.image.url} alt="avatar" />
          </Link>
        </div>
        <form action="submit" onSubmit={handleSubmit}>
          <label htmlFor="username">Naam</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={userData?.speler?.username || "Naam"}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="general-settings">
          <div className="music-settings slider">
            <p>Muziek</p>
            <div className="sliders">
              <button
                onClick={() => handleMusic(true)}
                className={music ? "active" : ""}
              >
                Aan
              </button>
              <button
                onClick={() => handleMusic(false)}
                className={!music ? "active" : ""}
              >
                Uit
              </button>
            </div>
          </div>
          <div className="sound-settings slider">
            <p>Geluiden</p>
            <div className="sliders">
              <button
                onClick={() => handleSound(true)}
                className={sound ? "active" : ""}
              >
                Aan
              </button>
              <button
                onClick={() => handleSound(false)}
                className={!sound ? "active" : ""}
              >
                Uit
              </button>
            </div>
          </div>
          <div className="theme-settings slider">
            <p>Dark Mode</p>
            <div className="sliders">
              <button
                onClick={() => handleTheme(true)}
                className={isDarkMode ? "active" : ""}
              >
                Aan
              </button>
              <button
                onClick={() => handleTheme(false)}
                className={!isDarkMode ? "active" : ""}
              >
                Uit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Instellingen;
