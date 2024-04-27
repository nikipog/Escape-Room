import { memo } from 'react';
import { QuestGenre } from '../../const';

type GenreFilterProps = {
  onGenreChange: (genre: QuestGenre) => void;
};

const GenreFilter = memo(({onGenreChange} : GenreFilterProps): JSX.Element => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onGenreChange(event.target.value as QuestGenre);
  };
  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Тематика</legend>
      <ul className="filter__list">
        <li className="filter__item">
          <input type="radio" name="type" id="all" value={QuestGenre.All} defaultChecked onChange={handleFilterChange}/>
          <label className="filter__label" htmlFor="all">
            <svg
              className="filter__icon"
              width={26}
              height={30}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-all-quests" />
            </svg>
            <span className="filter__label-text">Все квесты</span>
          </label>
        </li>
        <li className="filter__item">
          <input type="radio" name="type" id="adventure" value={QuestGenre.Adventures} onChange={handleFilterChange} />
          <label className="filter__label" htmlFor="adventure">
            <svg
              className="filter__icon"
              width={36}
              height={30}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-adventure" />
            </svg>
            <span className="filter__label-text">Приключения</span>
          </label>
        </li>
        <li className="filter__item">
          <input type="radio" name="type" id="horror" value={QuestGenre.Horror} onChange={handleFilterChange} />
          <label className="filter__label" htmlFor="horror">
            <svg
              className="filter__icon"
              width={30}
              height={30}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-horror" />
            </svg>
            <span className="filter__label-text">Ужасы</span>
          </label>
        </li>
        <li className="filter__item">
          <input type="radio" name="type" id="mystic" value={QuestGenre.Mystic} onChange={handleFilterChange}/>
          <label className="filter__label" htmlFor="mystic">
            <svg
              className="filter__icon"
              width={30}
              height={30}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-mystic" />
            </svg>
            <span className="filter__label-text">Мистика</span>
          </label>
        </li>
        <li className="filter__item">
          <input type="radio" name="type" id="detective" value={QuestGenre.Detective} onChange={handleFilterChange}/>
          <label className="filter__label" htmlFor="detective">
            <svg
              className="filter__icon"
              width={40}
              height={30}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-detective" />
            </svg>
            <span className="filter__label-text">Детектив</span>
          </label>
        </li>
        <li className="filter__item">
          <input type="radio" name="type" id="sciFi" value={QuestGenre.SciFi} onChange={handleFilterChange}/>
          <label className="filter__label" htmlFor="sciFi">
            <svg
              className="filter__icon"
              width={28}
              height={30}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-sci-fi" />
            </svg>
            <span className="filter__label-text">Sci-fi</span>
          </label>
        </li>
      </ul>
    </fieldset>
  );
});

GenreFilter.displayName = 'GenreFilter';

export default GenreFilter;


