import { useState } from "react"

export default function List({ title, completed, id, todoData, setTodoData }) {

    // 수정을 하고 있는지 기억하기 위한 변수 (수정하고 있다면 UI 설정을 바꿔줘야 하기 때문)
    // 다른 UI 제공을 위한 State 생성
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const getStyle = (completed) => {
        return {
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: completed ? 'line-through' : 'none',
        }
    }

    const btnStyle = {
        color: '#fff',
        border: 'none',
        padding: '5px 9px',
        borderRadius: '50%',
        cursor: 'pointer',
        float: 'right'
    }

    const handleClick = (id) => {
        console.log(id)
        let newTodoData = todoData.filter((data) => data.id !== id)
        console.log(newTodoData)
        setTodoData(newTodoData)
    }

    const handleComplteChange = (id) => {
        let newTodoData = todoData.map((data) => {
            if (data.id == id) {
                data.completed = !data.completed;
            }
            return data;
        })

        setTodoData(newTodoData)
    }

    const handleEditChange = (e) => {
        setEditedTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // 페이지 리프레쉬 막음
        
        const newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.title = editedTitle
            }
            // 수정안하는 애들은 그냥 원래 데이터 return
            return data;
        })

        setTodoData(newTodoData);
        setIsEditing(false);
    }


    if (isEditing) {
        return (
            <form style={getStyle(completed)} onSubmit={handleSubmit}>
                <input 
                    value={editedTitle}
                    autoFocus
                    onChange={handleEditChange}
                />
                <button type="button" style={btnStyle} onClick={() => setIsEditing(false)}>X</button>
                <button type="submit" style={btnStyle}>Save</button>
            </form>
        )
    } else {
        return <div style={getStyle(completed)}>
                <input type='checkbox'
                    onChange={() => handleComplteChange(id)} 
                    checked={completed}/>
                {title}
                <button style={btnStyle} onClick={() => handleClick(id)}>X</button>
                <button style={btnStyle} onClick={() => setIsEditing(true)}>Edit</button>
            </div>
    }
}