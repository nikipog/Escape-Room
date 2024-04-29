import type { QuestCard as QuestCardType } from '../../types/quest';
import NoQuests from '../no-quests/no-quests';
import QuestCard from '../quest-card/quest-card';

type CardsGridProps = {
  allQuests: QuestCardType[];
}

function CardsGrid({ allQuests }: CardsGridProps): JSX.Element {
  return (
    <div className="cards-grid">
      {!allQuests.length ? <NoQuests /> :

        allQuests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
          />)
        )}
    </div>
  );
}

export default CardsGrid;
