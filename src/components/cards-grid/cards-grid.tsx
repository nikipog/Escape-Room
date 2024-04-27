import type { QuestCard as QuestCardType } from '../../types/quest';
import QuestCard from '../quest-card/quest-card';

type CardsGridProps = {
  allQuests: QuestCardType[];
}

function CardsGrid({allQuests}: CardsGridProps): JSX.Element {
  return (
    <div className="cards-grid">
      {
        allQuests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
          />)
        )
      }
    </div>
  );
}

export default CardsGrid;
