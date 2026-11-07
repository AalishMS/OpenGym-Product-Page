import './FAQ.css';
import { config } from '../config';

export function FAQ() {
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <h2 id="faq-title" className="faq-headline">Questions &amp; answers</h2>
        <div className="faq-list">
          {config.faq.map((item, index) => (
            <details key={item.q} className="faq-item" name="faq" open={index === 0}>
              <summary className="faq-trigger">
                <span className="faq-question">{item.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="faq-answer-container">
                <p className="faq-answer">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
