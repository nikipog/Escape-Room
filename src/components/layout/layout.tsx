import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAuth } from '../../hooks/user-authorization';
import { useAppDispatch } from '../../hooks/store';
import { userActions } from '../../store/slices/user';


function Layout(): JSX.Element {

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  const location = useLocation();
  const isAuthorized = useAuth();
  const isLoginPage = location.pathname === AppRoute.Login;
  const isMainPage = location.pathname === AppRoute.Main;
  function isActive(path : string) {
    // Проверяем, является ли текущий роут началом заданного пути
    const isMatch = location.pathname === path || location.pathname.startsWith(`${path}quest/`);
    return isMatch ? 'link active' : 'link';
  }

  return (
    <div className="wrapper">
      <header className="header">
        <div className="container container--size-l">
          {
            isMainPage &&
            <span className="logo header__logo">
              <svg width={134} height={52} aria-hidden="true">
                <use xlinkHref="#logo" />
              </svg>
            </span>
          }
          {
            !isMainPage &&
            <Link
              className="logo header__logo"
              to={AppRoute.Main}
              aria-label="Перейти на Главную"
            >
              <svg width={134} height={52} aria-hidden="true">
                <use xlinkHref="#logo" />
              </svg>
            </Link>
          }
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link
                  className={isActive(AppRoute.Main)}
                  to={AppRoute.Main}
                >
                  Квесты
                </Link>
              </li>
              <li className="main-nav__item">
                <Link
                  className={isActive(AppRoute.Contacts)}
                  to={AppRoute.Contacts}
                >
                  Контакты
                </Link>
              </li>
              {
                isAuthorized &&
                <li className="main-nav__item">
                  <Link
                    className={isActive(AppRoute.MyQuests)}
                    to={AppRoute.MyQuests}
                  >
                    Мои бронирования
                  </Link>
                </li>
              }
            </ul>
          </nav>
          <div className="header__side-nav">
            {!isLoginPage && (
              isAuthorized &&
              <button
              className="btn btn--accent header__side-item"
              type="button"
              onClick={handleLogout}
            >
              Выйти
            </button>
            )}

            {!isLoginPage && (
              !isAuthorized &&
              < Link
                className="btn header__side-item header__login-btn"
                to={AppRoute.Login}
              >
                Вход
              </Link>
            )}

            <a
              className="link header__side-item header__phone-link"
              href="tel:88003335599"
              aria-label="Позвоните нам по номеру 8 (000) 333-55-99"
            >
              8 (000) 111-11-11
            </a>
          </div>
        </div>
      </header >
      <Outlet />
      <footer className="footer">
        <div className="container container--size-l">
          <div className="socials">
            <ul className="socials__list">
              <li className="socials__item">
                <a
                  className="socials__link"
                  href="#"
                  aria-label="Skype"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <svg
                    className="socials__icon socials__icon--default"
                    width={28}
                    height={28}
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-skype-default" />
                  </svg>
                  <svg
                    className="socials__icon socials__icon--interactive"
                    width={28}
                    height={28}
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-skype-interactive" />
                  </svg>
                </a>
              </li>
              <li className="socials__item">
                <a
                  className="socials__link"
                  href="#"
                  aria-label="ВКонтакте"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <svg
                    className="socials__icon socials__icon--default"
                    width={28}
                    height={28}
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-vk-default" />
                  </svg>
                  <svg
                    className="socials__icon socials__icon--interactive"
                    width={28}
                    height={28}
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-vk-interactive" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div >
  );
}
export default Layout;

