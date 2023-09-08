import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


type QuestionType = {
    answer: string,
    author: string,
    created_on: string,
    id: number,
    question: string
}

type Props = {}
export default function Questions({}: Props) {
    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect(() => {
        async function getQuestions(){
            let response = await axios.get('https://cae-bookstore.herokuapp.com/question/all');
            console.log(response.data);
            setQuestions(response.data.questions)
        }

        getQuestions();
    }, [])

    return (
        <>
            <h1 className='text-center'>Questions</h1>
            {questions.map(question => (
                <Card>
                    <Card.Body>
                        <h3>{question.question}</h3>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
}