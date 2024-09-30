import React from "react";

function footer() {
  return (
    <footer>
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

        <span className="disclaimer">
          Dit project is gemaaktvoor Artevelde Hogeschool voor het vak @work2
          door de DevOps groep.
        </span>
      </div>
    </footer>
  );
}

export default footer;
