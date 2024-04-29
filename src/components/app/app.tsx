import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import MainPage from '../../pages/main-page/main-page';
import QuestPage from '../../pages/quest-page/quest-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import BookingPage from '../../pages/booking-page/booking-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import Layout from '../layout/layout';
import { AppRoute, ToastifyMessage } from '../../const';
import { useAppDispatch } from '../../hooks/store';
import { questsActions } from '../../store/slices/quests';
import ProtectedRoute from '../protected-route/protected-route';
import { userActions } from '../../store/slices/user';
import { getToken } from '../../services/token';


function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(questsActions.fetchAllQuests())
      .unwrap()
      .catch(() => {
        toast.error(ToastifyMessage.FetchQuestsError);
      });
  }, [dispatch]);

  const checkAuth = dispatch(userActions.checkAuth());

  const token = getToken();
  useEffect(() => {
    if (token) {
      checkAuth;
    }
  }, [token, checkAuth])


  return (
    <HelmetProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Layout />}
          >
            <Route
              index
              element={<MainPage />}
            />

            <Route
              path={AppRoute.Booking}
              element={<BookingPage />}
            />

            <Route
              path={AppRoute.Contacts}
              element={<ContactsPage />}
            />

            <Route
              path={AppRoute.Login}
              element={(
                <ProtectedRoute onlyUnAuth>
                  <LoginPage />
                </ProtectedRoute>
              )}
            />

            <Route
              path={AppRoute.MyQuests}
              element={(
                <ProtectedRoute>
                  <MyQuestsPage />
                </ProtectedRoute>
              )}
            />

            <Route
              path={AppRoute.Quest}
              element={(
                <QuestPage />
              )}
            />

          </Route>

          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
