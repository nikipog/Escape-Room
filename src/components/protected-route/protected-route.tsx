import type { ReactNode } from 'react';
import { Navigate, useLocation, Location } from 'react-router-dom';

import { AppRoute, RequestStatus } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { userSelector } from '../../store/slices/user';


type TProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
}

type FromState = {
  from?: Location;
};

interface CustomLocation extends Location {
  state: {
    from?: Location;
  };
}

export default function ProtectedRoute({ children, onlyUnAuth }: TProtectedRouteProps) {

  // используем location чтобы парсить URL
  const location = useLocation() as CustomLocation & { state: FromState };

  //достаем юзера из стора
  const user = useAppSelector(userSelector.userInfo);

  if (useAppSelector((state) => state.user.requestStatus === RequestStatus.Loading)) {
    return <h1>Loading...</h1>;
  }


  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: AppRoute.Main };
    return <Navigate to={from} />;
  }
  // если нет авторизации и не страница логина
  if (!onlyUnAuth && !user) {
    //переадресуем на страницу логина, но запоминаем ту, на которой находились
    return <Navigate state={{ from: location }} to={AppRoute.Login} />;
  }
  return children; // все ок, рендерим компонент

}
