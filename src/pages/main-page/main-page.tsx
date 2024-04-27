import { useCallback, useMemo, useState } from 'react';
import CardsGrid from '../../components/cards-grid/cards-grid';
import { QuestGenre } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { questsSelectors } from '../../store/slices/quests';
import GenreFilter from '../../components/genre-filter/genre-filter';


function MainPage(): JSX.Element {
  const quests = useAppSelector(questsSelectors.quests);

  const [selectedGenre, setSelectedGenre] = useState(QuestGenre.All);
  //const [selectedLevel, setSelectedLevel] = useState('any');

  const handleGenreChange = useCallback((genre: QuestGenre) => {
    setSelectedGenre(genre);
  }, []);

  const filteredQuests = useMemo(() => quests.filter((quest) => selectedGenre === QuestGenre.All || quest.type === selectedGenre), [quests, selectedGenre]);

  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">
            квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">
            Выберите тематику
          </h2>
        </div>
        <div className="page-content__item">
          <form className="filter" action="#" method="get">
            <GenreFilter onGenreChange={handleGenreChange} />
            <fieldset className="filter__section">
              <legend className="visually-hidden">Сложность</legend>
              <ul className="filter__list">
                <li className="filter__item">
                  <input type="radio" name="level" id="any" defaultChecked />
                  <label className="filter__label" htmlFor="any">
                    <span className="filter__label-text">Любой</span>
                  </label>
                </li>
                <li className="filter__item">
                  <input type="radio" name="level" id="easy" />
                  <label className="filter__label" htmlFor="easy">
                    <span className="filter__label-text">Лёгкий</span>
                  </label>
                </li>
                <li className="filter__item">
                  <input type="radio" name="level" id="middle" />
                  <label className="filter__label" htmlFor="middle">
                    <span className="filter__label-text">Средний</span>
                  </label>
                </li>
                <li className="filter__item">
                  <input type="radio" name="level" id="hard" />
                  <label className="filter__label" htmlFor="hard">
                    <span className="filter__label-text">Сложный</span>
                  </label>
                </li>
              </ul>
            </fieldset>
          </form>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>
        <CardsGrid allQuests={filteredQuests} />
      </div>
    </main>
  );
}

export default MainPage;


