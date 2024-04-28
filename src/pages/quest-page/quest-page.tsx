import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { questActions, questSelector } from '../../store/slices/quest';
import { useEffect } from 'react';
import { QuestDifficulty, QuestGenre, RequestStatus, ToastifyMessage, QuestGenreLocalization, QuestLevelLocalization, ParticipantsRange, DescriptionRange, AppRoute } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import { Helmet } from 'react-helmet-async';
import WrongParticipantsCount from '../../components/wrong-participants-number/wrong-participants-number';
import { toast } from 'react-toastify';

function QuestPage(): JSX.Element {
  const quest = useAppSelector(questSelector.quest);
  const status = useAppSelector(questSelector.questStatus);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();


  useEffect(() => {
    dispatch(questActions.fetchQuest(id as string))
      .unwrap()
      .catch(() => {
        toast.error(ToastifyMessage.FetchQuestsError);
      });
  }, [dispatch, id]);

  if (status === RequestStatus.Loading) {
    return <div>Loading ...</div>;
  }

  if (quest) {
    const { peopleMinMax } = quest;
    const minParticipantsServer = peopleMinMax[0];
    const maxParticipantsServer = peopleMinMax[1];

    if (minParticipantsServer < ParticipantsRange.MinParticipantsCount ||
      maxParticipantsServer > ParticipantsRange.MaxParticipantsCount
    ) {
      return <WrongParticipantsCount />;
    }
  }
  // в случае если fail или ничего не найдено:
  //(запрос детального оффера useAppSelector(questSelector.offer вернул null)
  if (status === RequestStatus.Failed || !quest) {
    return <NotFoundPage />;
  }

  const { coverImgWebp, title, coverImg, type, peopleMinMax, level } = quest;

  const description = quest.description.length >
    DescriptionRange.MaxDescriptionLength ?
    `${quest.description.slice(DescriptionRange.IdleDescriptionLength, DescriptionRange.MaxUnslicedDescriptionLength)}...` :
    quest.description;

  const minParticipants = peopleMinMax[0];
  const maxParticipants = peopleMinMax[1];

  let localizedQuestGenre = '';

  switch (type) {
    case (QuestGenre.Adventures): {
      localizedQuestGenre = QuestGenreLocalization.adventures;
      break;
    }
    case (QuestGenre.Detective): {
      localizedQuestGenre = QuestGenreLocalization.detective;
      break;
    }
    case (QuestGenre.Horror): {
      localizedQuestGenre = QuestGenreLocalization.horror;
      break;
    }
    case (QuestGenre.Mystic): {
      localizedQuestGenre = QuestGenreLocalization.mystic;
      break;
    }
    case (QuestGenre.SciFi): {
      localizedQuestGenre = QuestGenreLocalization.SciFi;
      break;
    }
  }

  let localizedQuestLevel = '';

  switch (level) {
    case (QuestDifficulty.Easy): {
      localizedQuestLevel = QuestLevelLocalization.easy;
      break;
    }
    case (QuestDifficulty.Medium): {
      localizedQuestLevel = QuestLevelLocalization.medium;
      break;
    }
    case (QuestDifficulty.Hard): {
      localizedQuestLevel = QuestLevelLocalization.hard;
      break;
    }
  }

  return (
    <main className="decorated-page quest-page">
      <Helmet>
        <title>Escape Room. Quest Page</title>
      </Helmet>
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            src={coverImgWebp}
          />
          <img
            src={coverImg}
            width={1366}
            height={768}
            alt={title}
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">
            {title}
          </h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>{localizedQuestGenre}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width={11} height={14} aria-hidden="true">
                <use xlinkHref="#icon-person" />
              </svg>
              {minParticipants}–{maxParticipants}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width={14} height={14} aria-hidden="true">
                <use xlinkHref="#icon-level" />
              </svg>
              {localizedQuestLevel}
            </li>
          </ul>
          <p className="quest-page__description">
            {description}
          </p>
          <Link
            className="btn btn--accent btn--cta quest-page__btn"
            to={AppRoute.Booking}
          >
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
}

export default QuestPage;
