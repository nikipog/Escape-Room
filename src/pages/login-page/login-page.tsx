import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';


type HTMLLoginForm = HTMLFormElement & {
  email: HTMLInputElement;
  password: HTMLInputElement;
};

function LoginPage(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<HTMLLoginForm>();

  const onSubmit = (data: FormEvent<HTMLLoginForm>) => {
    console.log('Form data', data);
  };

  const onError = (errors, e) => {
    console.log('error');
  }

  const validateEmail = (value) => {

  }

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
              onSubmit={handleSubmit(onSubmit, onError)}
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
                        "email",
                        {
                          required: "Укажите адрес электронной почты",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Введен некорректный адрес электронной почты"
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
                      {...register("password", {
                        required: "Введите пароль",
                        minLength: {
                          value: 3,
                          message: "Пароль должен состоять минимум из 3 символов"
                        },
                        maxLength: {
                          value: 15,
                          message: "Длина пароля не может превышать 15 символов"
                        },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,15}$/,
                          message: "Пароль обязательно должен содержать цифру и букву"
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
