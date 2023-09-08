import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

type ToDo = {
    id: number,
    task: string
}
type ToDoCardProps = {
    toDo: ToDo,
    deleteTask: (id:number) => void
    editTask: (id:number, toDo:ToDo) => void
}

export default function ToDoCard({ toDo, deleteTask, editTask }: ToDoCardProps) {
    const [displayEdit, setDisplayEdit] = useState(false);
    const [editedToDo, setEditedToDo] = useState<ToDo>(toDo);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedToDo({...editedToDo, task: e.target.value})
    }

    const handleFormSubmit = (e:React.FormEvent, id:number, editedToDo:ToDo) => {
        e.preventDefault();
        editTask(id, editedToDo)
    }

    return (
        <Card>
            <Card.Body>
                {toDo.task}
                <div>
                    <Button variant='danger' onClick={() => deleteTask(toDo.id)}>Delete Task</Button>
                    <Button variant='success' onClick={() => setDisplayEdit(!displayEdit)}>Edit Task</Button>
                </div>
                {displayEdit && (
                    <Form onSubmit={(e) => handleFormSubmit(e, toDo.id, editedToDo)}>
                        <Form.Control value={editedToDo.task} onChange={handleInputChange}/>
                        <Button variant='success' type='submit'>Edit Task</Button>
                    </Form>
                )}
            </Card.Body>
        </Card>
    )
}