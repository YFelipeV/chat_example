import React from 'react';

const Frequent = ({ onQuestionClick }) => {
    const frequentQuestions = [
        "Por favor muestra una tabla con los datos principales de las sucursales registradas.",
        "¿Cuáles son los servicios disponibles en PARE?",
        "¿Cómo puedo contactar a soporte técnico?"
    ];

    return (
        <div className="frequent-questions">
            <h3>Preguntas Frecuentes</h3>
            <ul>
                {frequentQuestions.map((question, index) => (
                    <li key={index} onClick={() => onQuestionClick(question)}>
                        {question}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Frequent;
