import { useNavigate, useLocation } from "react-router-dom";
import s from "./info_header.module.scss";
import StarRating from "comps/rating/star_rating";

const MainInfoHeader = ({
  product: { name, reviews = [], starRating = 0, code = "000000" },
}) => {
  // --- Start of Fix ---
  const navigate = useNavigate();
  const location = useLocation();

  // Replicate the original logic using react-router-dom's location hook
  const productPathNoActiveTab = location.pathname
    .split("/")
    .slice(0, -1)
    .join("/");

  const handleNavigation = (e) => {
    e.preventDefault();
    // Use the navigate function to change the route
    navigate(productPathNoActiveTab + "/reviews");
  };
  // --- End of Fix ---

  return (
    <header className={`${s.header}`} id="main_content">
      <h2>{name}</h2>
      <div className={`${s.sub_header}`}>
        <div className={`${s.rating}`}>
          <StarRating rating={starRating} />
          <a
            className="link_secondary"
            href="#"
            onClick={handleNavigation}
          >{`${reviews.length} відгуків`}</a>
        </div>
        <p>{`Код: ${code}`}</p>
      </div>
    </header>
  );
};

export default MainInfoHeader;
