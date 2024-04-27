import { memo } from 'react';
import { QuestDifficulty } from '../../const';

type DifficultyFilterProps = {
  onDifficultyChange: (difficulty: QuestDifficulty) => void;
}

const difficulties = [
  { value: QuestDifficulty.Any, label: 'Любой' },
  { value: QuestDifficulty.Easy, label: 'Лёгкий' },
  { value: QuestDifficulty.Medium, label: 'Средний' },
  { value: QuestDifficulty.Hard, label: 'Сложный' },
];


const DifficultyFilter = memo(({ onDifficultyChange }: DifficultyFilterProps): JSX.Element => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDifficultyChange(event.target.value as QuestDifficulty);
  };
  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Сложность</legend>
      <ul className="filter__list">
        {difficulties.map((difficulty) => (
          <li className="filter__item" key={difficulty.value}>
            <input
              type="radio"
              name="level"
              id={difficulty.value}
              value={difficulty.value}
              onChange={handleFilterChange}
              defaultChecked={difficulty.value === QuestDifficulty.Any}
            />
            <label className="filter__label" htmlFor={difficulty.value}>
              <span className="filter__label-text">{difficulty.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
);

DifficultyFilter.displayName = 'DifficultyFilter';

export default DifficultyFilter;

