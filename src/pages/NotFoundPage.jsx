import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div>
      <p className="noResultsTxt">
        404 Not Found! Please follow this <Link to="/">link</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
