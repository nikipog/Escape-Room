import QuestCard from '../quest-card/quest-card';

function CardsGrid(): JSX.Element {
  return (
    <div className="cards-grid">
      <QuestCard/>
      <QuestCard/>
    </div>
  );
}

export default CardsGrid;
