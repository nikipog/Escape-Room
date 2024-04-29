import { useEffect } from 'react';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { bookingInfoActions, bookingInfoSelector } from '../../store/slices/booking';
import { ToastifyMessage } from '../../const';
import { questActions, questSelector } from '../../store/slices/quest';
import BookingTimeButton from '../../components/booking-time-button/booking-time-button';

function BookingPage(): JSX.Element {
  const bookingInfo = useAppSelector(bookingInfoSelector.bookingInfo);
  const todaySlots = bookingInfo?.[0].slots.today;
  const tomorrowSlots = bookingInfo?.[0].slots.tomorrow;
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const quest = useAppSelector(questSelector.quest);

  const MAP_COORDINATES_MOCK = { lat: 59.968137, lng: 30.316272 };
  const MAP_ZOOM_MOCK = 14;

  useEffect(() => {
    // Убеждаюсь что id определен, перед тем как выполнять запрос
    if (id) {
      dispatch(bookingInfoActions.fetchBookingInfo(id));
      dispatch(questActions.fetchQuest(id))
        .unwrap()
        .catch(() => {
          toast.error(ToastifyMessage.FetchQuestsError);
        });
    }
  }, [dispatch, id]);


  return (
    <div className="wrapper">
      <main className="page-content decorated-page">
        <Helmet>
          <title>Escape Room. Booking Page</title>
        </Helmet>
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              src={quest?.coverImgWebp}
            />
            <img
              src={quest?.coverImg}
              width={1366}
              height={1959}
              alt={quest?.title}
            />
          </picture>
        </div>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">
              Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">
              {quest?.title}
            </p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                <div className="map__container" >
                  <LeafletMap coordinates={MAP_COORDINATES_MOCK} zoom={MAP_ZOOM_MOCK} />
                </div>
              </div>
              <p className="booking-map__address">
                Вы&nbsp;выбрали: наб. реки Карповки&nbsp;5, лит&nbsp;П, м.
                Петроградская
              </p>
            </div>
          </div>
          <form
            className="booking-form"
            action="https://echo.htmlacademy.ru/"
            method="post"
          >
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Сегодня</legend>
                <div className="booking-form__date-inner-wrapper">
                  {todaySlots?.map((slot) => (
                    <BookingTimeButton
                      key={slot.time}
                      time={slot.time}
                      isAvailable={slot.isAvailable}
                      name="date"
                    />
                  ))}

                </div>
              </fieldset>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Завтра</legend>
                <div className="booking-form__date-inner-wrapper">
                  {tomorrowSlots?.map((slot) => (
                    <BookingTimeButton
                      key={slot.time}
                      time={slot.time}
                      isAvailable={slot.isAvailable}
                      name="date"
                    />
                  ))}
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Контактная информация</legend>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="name">
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Имя"
                  required
                  pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">
                  Контактный телефон
                </label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  placeholder="Телефон"
                  required
                  pattern="[0-9]{10,}"
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">
                  Количество участников
                </label>
                <input
                  type="number"
                  id="person"
                  name="person"
                  placeholder="Количество участников"
                  required
                />
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input
                  type="checkbox"
                  id="children"
                  name="children"
                  defaultChecked
                />
                <span className="custom-checkbox__icon">
                  <svg width={20} height={17} aria-hidden="true">
                    <use xlinkHref="#icon-tick" />
                  </svg>
                </span>
                <span className="custom-checkbox__label">
                  Со&nbsp;мной будут дети
                </span>
              </label>
            </fieldset>
            <button
              className="btn btn--accent btn--cta booking-form__submit"
              type="submit"
            >
              Забронировать
            </button>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
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
      </main>
    </div>
  );
}

export default BookingPage;

