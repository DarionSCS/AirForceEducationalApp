import React, { useEffect } from 'react';
import gamedata from "../../data/GameData";
import "../../styles/main.css";

import AuthenticationButton from "../../components/authentication/AuthenticationButton";
import { useAuth0 } from '@auth0/auth0-react';

const gameKeys = Object.keys(gamedata);

const Landing = () => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const handleAnimationHalfway = () => {
      const content = document.querySelectorAll('.hidden-content');
      content.forEach((item) => {
        item.classList.remove('hidden-content');
        item.classList.add('visible-content');
      });
    };

    // Stel de timeout in op de helft van de totale animatietijd
    const halfwayPoint = 1000; // Halverwege een animatie van 2000ms

    const timeoutId = setTimeout(handleAnimationHalfway, halfwayPoint);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>

      <div className='revealer'>
        <div className='block1 block'></div>
        <div className='block2 block'> <img src={require('../../../src/assets/Logo/White1.png')} alt="Globe" />
          <h1>Welkom</h1></div>
        <div className='block3 block'></div>
      </div>

      <div className='landing-nav hidden-content'>
        <ul>
          <li>
            <a href="#">
              <img src={require('../../../src/assets/Logo/White.png')} alt="Globe" />
            </a>
          </li>

          <li>
            <span>Welkom bij de Luchtmacht</span>
          </li>

          <li>
            <AuthenticationButton />
          </li>


        </ul>
      </div>

      <div className='landing-wrapper hidden-content'>
        <img src={require('../../../src/assets/images/Globe.png')} alt="Globe" />
        <div>
          <h1>Wings of Belgium</h1>
          <span>
            De kracht van de luchtmacht binnen handbereik!
          </span>
          <p>
            Deze app is ontworpen om je te verbinden met alles wat onze luchtmacht te bieden heeft.
          </p>
          <p>Maak een account aan of login om te tonen wat je in je hebt!</p>
          <AuthenticationButton />
        </div>
      </div>

      <footer className='landing-footer hidden-content'>
        <div>

          <ul>
            <li>
              <a href="#">
                <span>privacybeleid</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>algemene voorwaarden</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>credits en juridisch</span>
              </a>
            </li>
          </ul>

          <span className='disclaimer'>
            Dit project is gemaaktvoor Artevelde Hogeschool voor het vak @work2 door de DevOps groep.
          </span>
        </div>
      </footer>
      {/* <div className='sprites hidden-content'>
        {gameKeys.map((key) => {
          const game = gamedata[key];
          return (
            <div className='spriteOuter' key={key}>
              <div className='spriteInner'>
                <p>{game.shorthand}</p>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Landing;
