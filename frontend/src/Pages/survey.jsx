import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions, submitAnswers } from "../services/api";
import "./Survey.css";

function Survey() {
  const navigate = useNavigate();

  // حالات الصفحة
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // حالات نافذة الشرح المنبثقة
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipTitle, setTooltipTitle] = useState("");

  // جلب الأسئلة عند تحميل الصفحة
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await getQuestions();
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading questions:", error);
      alert(
        "Failed to load questions. Please make sure the backend is running.",
      );
      setLoading(false);
    }
  };

  // تسجيل إجابة المستخدم
  const handleAnswer = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex + 1,
    });
  };

  // الانتقال إلى السؤال التالي
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // العودة إلى السؤال السابق
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // فتح نافذة الشرح
  const openTooltip = (title, content) => {
    setTooltipTitle(title);
    setTooltipContent(content);
    setShowTooltip(true);
  };

  // إغلاق نافذة الشرح
  const closeTooltip = () => {
    setShowTooltip(false);
    setTooltipContent("");
    setTooltipTitle("");
  };

  // إرسال الإجابات
  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert(
        `Please answer all 20 questions. You have answered ${Object.keys(answers).length} so far.`,
      );
      return;
    }

    setSubmitting(true);
    try {
      const answersArray = [];
      for (let i = 1; i <= 20; i++) {
        answersArray.push(answers[i]);
      }

      const response = await submitAnswers(answersArray);
      navigate("/result", { state: { recommendedLaptop: response.data } });
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to get recommendation. Please try again.");
      setSubmitting(false);
    }
  };

  // عرض شاشة التحميل
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading questions...</div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ?.id];
  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="survey-container">
      <div className="survey-content">
        <div className="question-card">
          {/* شريط التقدم */}
          <div className="progress-section">
            <div className="progress-label">
              <span>Progress</span>
              <span>
                {Object.keys(answers).length}/{questions.length} Answered
              </span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* رقم السؤال */}
          <div className="question-number">
            Question {currentQuestion + 1} of {questions.length}
          </div>

          {/* رأس السؤال (نص + زر معلومات) */}
          <div className="question-header">
            <h2 className="question-text">{currentQ?.question_text}</h2>
            {currentQ?.tooltip && (
              <button
                className="tooltip-button"
                onClick={() =>
                  openTooltip(
                    `About: ${currentQ.question_text}`,
                    currentQ.tooltip,
                  )
                }
                title="Click for explanation">
                📖
              </button>
            )}
          </div>

          {/* خيارات الإجابة */}
          <div className="options-container">
            {[1, 2, 3, 4].map((optNum) => {
              const optionText = currentQ?.[`option${optNum}`];
              return (
                <button
                  key={optNum}
                  onClick={() => handleAnswer(currentQ.id, optNum - 1)}
                  className={`option-button ${
                    currentAnswer === optNum
                      ? "option-button-selected"
                      : "option-button-unselected"
                  }`}>
                  {optionText}
                </button>
              );
            })}
          </div>

          {/* أزرار التنقل */}
          <div className="nav-buttons">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="nav-button nav-button-previous">
              ← Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="nav-button nav-button-next">
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={
                  submitting || Object.keys(answers).length !== questions.length
                }
                className="nav-button nav-button-submit">
                {submitting ? "Submitting..." : "Submit & Get Recommendation"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===== نافذة الشرح المنبثقة ===== */}
      {showTooltip && (
        <div className="tooltip-overlay" onClick={closeTooltip}>
          <div className="tooltip-popup" onClick={(e) => e.stopPropagation()}>
            <span className="tooltip-popup-icon">📖</span>
            <h3>{tooltipTitle}</h3>
            <p>{tooltipContent}</p>
            <button className="close-button" onClick={closeTooltip}>
              Got it! 👍
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Survey;
