import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/store';
import { userActions } from '../../store/slices/user';
import { useNavigate } from 'react-router-dom';
import { AppRoute, PasswordLenght, ToastifyMessage } from '../../const';
import { toast } from 'react-toastify';
import { AuthRegExp } from '../../const';


type FormData = {
  email: string;
  password: string;
}



function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Диспатчим асинхронное действие и ждем завершения
      const resultAction = await dispatch(userActions.login(data));
      if (userActions.login.fulfilled.match(resultAction)) {
        // Если запрос выполнен успешно, перенаправляем пользователя
        navigate(AppRoute.Main);
      } else {
        // Если запрос не успешен, можем показать сообщение об ошибке
        toast.error(ToastifyMessage.AuthError);
      }
    } catch (error) {

      console.error('Ошибка сервера', error);
      toast.error(ToastifyMessage.AuthError);
    }
  };


  return (
    <div className="wrapper">
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
            />
            <img
              src="img/content/maniac/maniac-size-m.jpg"
              srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
              width={1366}
              height={768}
              alt=""
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            <form
              className="login-form"
              action="https://echo.htmlacademy.ru/"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">
                      E&nbsp;–&nbsp;mail
                    </label>
                    <input
                      {...register(
                        'email',
                        {
                          required: 'Укажите адрес электронной почты',
                          pattern: {
                            value: AuthRegExp.Email,
                            message: 'Введен некорректный адрес электронной почты'
                          }
                        }
                      )
                      }
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Адрес электронной почты"

                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">
                      Пароль
                    </label>
                    <input
                      {...register('password', {
                        required: 'Введите пароль',
                        minLength: {
                          value: PasswordLenght.Min,
                          message: 'Пароль должен состоять минимум из 3 символов'
                        },
                        maxLength: {
                          value: PasswordLenght.Max,
                          message: 'Длина пароля не может превышать 15 символов'
                        },
                        pattern: {
                          value: AuthRegExp.Password,
                          message: 'Пароль обязательно должен содержать цифру и латинскую букву'
                        }
                      })}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Пароль"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                </div>
                <button
                  className="btn btn--accent btn--general login-form__submit"
                  type="submit"
                >
                  Войти
                </button>
              </div>
              <label className="custom-checkbox login-form__checkbox">
                <input
                  type="checkbox"
                  id="id-order-agreement"
                  name="user-agreement"
                  required
                />
                <span className="custom-checkbox__icon">
                  <svg width={20} height={17} aria-hidden="true">
                    <use xlinkHref="#icon-tick" />
                  </svg>
                </span>
                <span className="custom-checkbox__label">
                  Я&nbsp;согласен с
                  <a className="link link--active-silver link--underlined" href="#">
                    правилами обработки персональных данных
                  </a>
                  &nbsp;и пользовательским соглашением
                </span>
              </label>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
