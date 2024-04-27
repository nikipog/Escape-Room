import { useCallback, useMemo, useState } from 'react';
import CardsGrid from '../../components/cards-grid/cards-grid';
import { QuestDifficulty, QuestGenre } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { questsSelectors } from '../../store/slices/quests';
import GenreFilter from '../../components/genre-filter/genre-filter';
import DifficultyFilter from '../../components/difficulty-filter/difficulty-filter';


function MainPage(): JSX.Element {
  const quests = useAppSelector(questsSelectors.quests);

  const [selectedGenre, setSelectedGenre] = useState(QuestGenre.All);
  const [selectedLevel, setSelectedLevel] = useState(QuestDifficulty.Any);

  const handleGenreChange = useCallback((genre: QuestGenre) => {
    setSelectedGenre(genre);
  }, []);

  const handleDifficultyChange = useCallback((difficulty: QuestDifficulty) => {
    setSelectedLevel(difficulty);
  }, []);

  const filteredQuests = useMemo(() => quests.filter((quest) =>
    (selectedGenre === QuestGenre.All || quest.type === selectedGenre) &&
    (selectedLevel === QuestDifficulty.Any || quest.level === selectedLevel)), [quests, selectedGenre, selectedLevel]);

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
            <DifficultyFilter onDifficultyChange={handleDifficultyChange} />
          </form>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>
        <CardsGrid allQuests={filteredQuests} />
      </div>
    </main>
  );
}

export default MainPage;


