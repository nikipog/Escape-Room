import { Link, generatePath } from 'react-router-dom';
import { QuestCard as QuestCardType } from '../../types/quest';
import { AppRoute } from '../../const';

type QuestCardProps = {
  quest: QuestCardType;
}

function QuestCard({ quest }: QuestCardProps): JSX.Element {
  const { previewImgWebp, previewImg, title, peopleMinMax, level, id } = quest;
  const minParticipants = peopleMinMax[0];
  const maxParticipants = peopleMinMax[1];
  const url = generatePath(AppRoute.Quest, { id });
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp.replace('.webp', '@2x.webp')} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg.replace('.jpg', '@2x.jpg')} 2x`}
            width={344}
            height={232}
            alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={url}
          >
            {title}
          </Link>
        </div>
        <ul className="tags quest-card__tags">
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
            {level}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuestCard;
