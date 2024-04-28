import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function WrongParticipantsCount () : JSX.Element {
  return (

    <h1>
      <Helmet>
        <title>Escape Room. Error</title>
      </Helmet>
     Не удалось получить информацию о количестве участников
      <nav>
        <Link to={AppRoute.Main}>Вернуться на главную</Link>
      </nav>
    </h1>
  );

}

export default WrongParticipantsCount;
