import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import './ConflictStyleQuiz.css';

const questions = [
    {
        text: "Un coleg nu își respectă promisiunea de a livra un raport la timp, ceea ce îți afectează munca. Cum reacționezi?",
        answers: [
            { text: "Ignor situația pentru moment, sperând că va rezolva problema de unul singur", style: "evitativ" },
            { text: "Îi cer imediat o explicație și insist să livreze raportul cât mai repede", style: "competitiv" },
            { text: "Accept întârzierea fără să ridic problema, pentru a menține relația bună cu colegul", style: "acomodativ" },
            { text: "Negociez o nouă dată de livrare care să fie acceptabilă pentru amândoi", style: "compromis" },
            { text: "Discut cu colegul pentru a găsi împreună o soluție care să ne ajute pe amândoi", style: "colaborativ" }
        ]
    },
    {
        text: "Ai de ales între o soluție rapidă, dar imperfectă, și una ideală, dar care necesită mai mult timp. Cum decizi?",
        answers: [
            { text: "Aleg soluția propusă de altcineva, chiar dacă nu sunt de acord, pentru a evita un conflict", style: "acomodativ" },
            { text: "Optez pentru o variantă de compromis între cele două soluții", style: "compromis" },
            { text: "Aleg soluția rapidă, pentru că este important să termin treaba cât mai repede", style: "competitiv" },
            { text: "Amân decizia până când devine absolut necesar să aleg una dintre ele", style: "evitativ" },
            { text: "Discut cu echipa pentru a vedea ce variantă ar fi cea mai benefică pentru toți", style: "colaborativ" }
        ]
    },
    {
        text: "Într-o ședință, colegii tăi au păreri foarte diferite despre modul de abordare a unui proiect. Cum reacționezi?",
        answers: [
            { text: "Accept opinia majorității, chiar dacă nu sunt de acord", style: "acomodativ" },
            { text: "Încurajez o discuție deschisă pentru a găsi o soluție care să mulțumească pe toată lumea", style: "colaborativ" },
            { text: "Propun o soluție de mijloc pentru a încheia discuția mai repede", style: "compromis" },
            { text: "Îmi impun opinia, fiind convins că este cea mai bună", style: "competitiv" },
            { text: "Rămân tăcut și aștept ca ceilalți să ajungă la un consens", style: "evitativ" }
        ]
    },
    {
        text: "Un client critică aspru munca ta. Ce faci?",
        answers: [
            { text: "Îmi cer scuze și promit să fac schimbări conform dorințelor sale", style: "acomodativ" },
            { text: "Evit discuția și sper că situația se va rezolva de la sine", style: "evitativ" },
            { text: "Încerc să înțeleg exact ce nu i-a plăcut și să găsim împreună o soluție", style: "colaborativ" },
            { text: "Îi ofer o mică concesie pentru a-l liniști", style: "compromis" },
            { text: "Îi explic de ce munca mea este corectă și încerc să îl conving", style: "competitiv" }
        ]
    },
    {
        text: "În timpul unui proiect important, descoperi că un membru al echipei folosește o metodologie diferită de cea agreată inițial. Ce abordare alegi?",
        answers: [
            { text: "Propun să folosim o combinație între cele două metodologii", style: "compromis" },
            { text: "Insist să se conformeze metodologiei stabilite inițial, deoarece așa am stabilit", style: "competitiv" },
            { text: "Las situația să continue fără intervenție, considerând că nu merită să creez tensiuni", style: "evitativ" },
            { text: "Accept noua metodologie pentru a menține armonia în echipă", style: "acomodativ" },
            { text: "Organizez o întâlnire pentru a discuta beneficiile ambelor metodologii și a decide împreună", style: "colaborativ" }
        ]
    }
];


const styleDescriptions = {
    competitiv: "Stilul competitiv este orientat spre rezultate și putere. Folosești acest stil când obiectivele tale sunt foarte importante.",
    colaborativ: "Stilul colaborativ caută soluții care să satisfacă nevoile tuturor părților implicate. Este util în situații complexe care necesită o soluție creativă.",
    compromis: "Stilul de compromis caută soluții parțial satisfăcătoare pentru toți. Este util când timpul este limitat sau când alte stiluri nu funcționează.",
    evitativ: "Stilul evitativ amână sau evită conflictul. Poate fi util în situații minore sau când tensiunile sunt prea mari.",
    acomodativ: "Stilul acomodativ pune accent pe menținerea relațiilor. Este util când problema nu este foarte importantă pentru tine."
};

const ConflictStyleQuiz = () => {
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const qsWithShuffledAnswers = questions.map(q => ({
            ...q,
            answers: shuffleArray(q.answers)
        }));
        setShuffledQuestions(qsWithShuffledAnswers);
    }, []);

    const handleAnswer = (style) => {
        const newAnswers = [...answers, style];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const calculateResults = () => {
        const styles = ["competitiv", "colaborativ", "compromis", "evitativ", "acomodativ"];
        const counts = {};
        styles.forEach(style => {
            counts[style] = answers.filter(a => a === style).length;
        });
        return counts;
    };

    const restart = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResults(false);
    };
    function shuffleArray(array) {
        const newArray = array.slice();
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    if (showResults) {
        const results = calculateResults();
        const maxScore = Math.max(...Object.values(results));
        const dominantStyles = Object.entries(results)
            .filter(([_, score]) => score === maxScore)
            .map(([style]) => style);

        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Rezultatele tale</h2>
                </div>
                <div className="card-content">
                    <div className="results">
                        {Object.entries(results).map(([style, score]) => (
                            <div key={style} className="result-row">
                                <div className="result-style capitalize">{style}</div>
                                <div className="result-bar-container">
                                    <div
                                        className="results-bar-fill"
                                        style={{ width: `${(score / questions.length) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="result-score">{score}</div>
                            </div>
                        ))}
                    </div>

                    <div className="dominant-styles">
                        <h3>Stilul(ile) tău(tale) dominant(e):</h3>
                        {dominantStyles.map(style => (
                            <div key={style} className="result-description">
                                <AlertCircle className="icon" />
                                <div>
                                    <div className="result-style-title capitalize">{style}</div>
                                    <p>{styleDescriptions[style]}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={restart}
                        className="restart-btn"
                    >
                        Încearcă din nou
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">
                    Întrebarea {currentQuestion + 1} din {questions.length}
                </h2>
            </div>
            <div className="card-content">
                <p className="question-text">{questions[currentQuestion].text}</p>
                <div className="answers">
                    {questions[currentQuestion].answers.map((answer, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(answer.style)}
                            className="btn"
                        >
                            {answer.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConflictStyleQuiz;
