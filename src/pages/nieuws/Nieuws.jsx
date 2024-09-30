import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Card from "../../components/nieuws/Card";
import Profiel from "../profiel/Profiel";
import Button from "../../components/profiel/Button"; 
import { GET_ALL_NIEUWSITEMS } from "../../graphQL/queries";
import "../../styles/components/_nieuws.css"; 

export default function Nieuws() {
  const { data, loading, error } = useQuery(GET_ALL_NIEUWSITEMS);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="news-page">
      {isProfileOpen ? null : (
        <div className="profile-button">
          <Button toggle={toggleProfile} />
        </div>
      )}
      {isProfileOpen && (
        <div className="profile-panel open">
          <Profiel toggleProfile={toggleProfile} />
        </div>
      )}
      <div className="news-header">
        <h1 className="news-title">Luchtmacht Nieuws</h1>
      </div>
      {data && data.nieuwsItems && data.nieuwsItems.length > 0 && (
        <div className="featured-card">
          <Card
            imageUrl={data.nieuwsItems[0].nieuwsAfbeelding.url}
            title={data.nieuwsItems[0].titel}
            content={data.nieuwsItems[0].nieuwsDatum}
          />
        </div>
      )}
      <div className="news-container">
        {data &&
          data.nieuwsItems &&
          data.nieuwsItems.slice(1).map((item, index) => (
            <div className="card-wrapper" key={index}>
              <Card
                imageUrl={item.nieuwsAfbeelding.url}
                title={item.titel}
                content={item.nieuwsDatum}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
