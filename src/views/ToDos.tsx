import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import ToDoCard from '../components/ToDoCard'

type ToDo = {
    id: number,
    task: string
}

type ToDoProps = {}

export default function ToDos({}: ToDoProps) {
    const [toDos, setToDos] = useState<ToDo[]>([]);
    const [newToDo, setNewToDo] = useState<ToDo>({id: 1, task: ''})
    const [idCounter, setIdCounter] = useState(2)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewToDo({...newToDo, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitted');

        setToDos([...toDos, newToDo])
        setNewToDo({id: idCounter, task:''})
        setIdCounter(idCounter + 1);
    }

    const deleteTask = (toDoId:number) => {
        setToDos(toDos.filter(t => t.id !== toDoId))
    }

    const editTask = (toDoId:number, editedToDo:ToDo) => {
        setToDos(toDos.map(toDo => (toDoId === toDo.id) ? editedToDo : toDo))
    }

    return (
        <>
            <h1 className="text-center">To Do List</h1>
            <Card className='my-3'>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Control value={newToDo.task} name='task' onChange={handleInputChange}/>
                        <Button variant='primary' className='w-100 mt-3' type='submit'>Add To Do</Button>
                    </Form>
                </Card.Body>
            </Card>
            {toDos.map(toDo => <ToDoCard toDo={toDo} deleteTask={deleteTask} editTask={editTask} />)}
        </>
    )
}