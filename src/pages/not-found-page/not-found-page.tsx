import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage () : JSX.Element {
  return (

    <h1>
      <Helmet>
        <title>Escape Room. Not found</title>
      </Helmet>
     404 Not Found
      <nav>
        <Link to={AppRoute.Main}>Click here</Link>
      </nav>
    </h1>
  );

}

export default NotFoundPage;
