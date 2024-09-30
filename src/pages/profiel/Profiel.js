import React from "react";
import BadgeFotos from "./BadgeFotos";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading";
import "../../styles/components/_profile.css";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  GET_USER_NAME,
  GET_USER_PICTURE,
  GET_PRESTATIES_FROM_USER,
  GET_RANK_SPELER,
  GET_XP
} from "../../graphQL/queries";
import Button from "../../components/profiel/Button";
import Badges from "../../components/profiel/Badges";
import AuthenticationButton from "../../components/authentication/AuthenticationButton";

import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faStar } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'


library.add(faWrench, faStar, faCheckSquare);

export default function Profiel({ toggleProfile }) {
  const { user } = useAuth0();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_NAME, {
    variables: { auth0_user_id: user?.sub },
  });


  const {
    data: userPictureData,
    loading: pictureLoading,
    error: pictureError,
  } = useQuery(GET_USER_PICTURE, {
    variables: { auth0_user_id: user?.sub },
  });

  const {
    data: userBadgesData,
    loading: userBadgesLoading,
    error: userBadgesError,
  } = useQuery(GET_PRESTATIES_FROM_USER, {
    variables: { auth0_user_id: user?.sub },
  });

  const {
    data: userRankingData,
    loading: userRankingLoading,
    error: userRankingError,
  } = useQuery(GET_RANK_SPELER, {
    variables: { auth0_user_id: user?.sub },
  });

  const {
    data: xp,
    loading: xpLoading,
    error: xpError,
  } = useQuery(GET_XP, {
    variables: { auth0_user_id: user?.sub },
  });

  if (userLoading || pictureLoading || userRankingLoading || xpLoading) return <Loading />;
  if (userError) return <p>Error: {userError.message}</p>;
  if (pictureError) return <p>Error: {pictureError.message}</p>;
  if (userRankingError) return <p>Error: {userRankingError.message}</p>;
  if (xpError) return <p>Error: {xpError.message}</p>;

  const xpWithinLevel = xp.speler.xp % 100;
  const xpPercentage = (xpWithinLevel / 100) * 100;

  return (
    <div className="profiel">
      <Button toggle={toggleProfile} onClick={toggleProfile} />
      <div>
        <img src={userPictureData.speler.avatar.image.url} alt="User Avatar" />
        <h1>{userData.speler.username}</h1>

        {userRankingData.ranks.map((rank) => (
          <p key={rank.id}>{rank.title}</p>
        ))}
        <div className="progress-bar">
          <div className="progress-bar-filled" style={{ width: `${xpPercentage}%` }}></div>
        </div>
        <p>xp: {xp.speler.xp}</p>
      </div>

      <AuthenticationButton />

      <Link to="/instellingen">Instellingen</Link>
      <Link to="/prestaties">Prestaties</Link>
      <Link to="/nieuws">News</Link>
      <div className="badges">
        <p>behaalde badges</p>
        <Badges />
      </div>
      <div className="links">
        <a href="https://www.facebook.com">FACEBOOK</a>
        <a href="https://www.instagram.com">INSTAGRAM</a>
        <a href="https://www.google.com">WEBSITE</a>
      </div>
    </div>
  );
}
