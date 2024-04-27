import { QuestCard as QuestCardType} from '../../types/quest';

type QuestCardProps = {
  quest: QuestCardType;
}

function QuestCard({quest} : QuestCardProps): JSX.Element {
  const {previewImgWebp, previewImg, title, peopleMinMax, level } = quest;
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
          <a className="quest-card__link" href="quest.html">
            {title}
          </a>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {peopleMinMax[0]}–{peopleMinMax[1]}&nbsp;чел
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
