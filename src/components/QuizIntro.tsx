type QuizIntroProps = {
  questionCount: number;
  onStart: () => void;
};

export function QuizIntro({ questionCount, onStart }: QuizIntroProps) {
  return (
    <section className="quiz-card intro-card">
      <div className="intro-card__orbit" aria-hidden="true">◉</div>
      <p className="eyebrow">Астрономическая викторина</p>
      <h2>Насколько хорошо ты знаешь Вселенную?</h2>
      <p className="intro-card__text">
        Ответь на {questionCount} коротких вопросов о планетах, звёздах и космосе.
        Результат появится сразу после последнего ответа.
      </p>
      <div className="intro-card__meta" aria-label="Информация о тесте">
        <span>✦ {questionCount} вопросов</span>
        <span>◷ около 3 минут</span>
      </div>
      <button className="primary-button intro-card__button" onClick={onStart} type="button">
        Начать викторину
        <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}
