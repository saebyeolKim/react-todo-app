import { useState } from 'react'
import './App.css'

export default function App() {

  // 컴포넌트에서 어떠한 데이터를 기억하고 있을 때 사용
  const [todoData, setTodoData] = useState([
    {
      id: "1",
      title: "공부하기",
      completed: true,
    },
    {
      id: "2",
      title: "청소하기",
      completed: false,
    }
  ])

  const [value, setValue] = useState('')

  const btnStyle = {
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
  }

  // 값을 받아서 dynamic 하게 사용 가능
  const getStyle = (completed) => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: completed ? 'line-through' : 'none',
    }
  }

  const handleClick = (id) => {
    console.log(id)
    let newTodoData = todoData.filter((data) => data.id !== id)
    console.log(newTodoData)
    setTodoData(newTodoData)
  }

  // 할 일 입력하는 기능
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리프레싱 막아줌

    let newTodo = {
      id: Date.now(), // 유니크한 값을 id 로 지정해줌
      title: value,
      completed: false
    }

    setTodoData([...todoData, newTodo])
    setValue('')
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

  return (
    <div className='container'>
      <div className='todoBlock'>
        <div className='title'>
          <h1>할 일 목록</h1>
        </div>
        {
          todoData.map((data) => (
            <div key={data.id} style={getStyle(data.completed)}>
              <input type='checkbox'
              onChange={() => handleComplteChange(data.id)} checked={data.completed}/>
              {data.title}
              <button style={btnStyle} onClick={() => handleClick(data.id)}>X</button>
            </div>
          ))
        }

        <form style={{display: 'flex'}} onSubmit={handleSubmit}>
          <input 
            type='text' 
            name='value' 
            style={{flex: '10', padding: '5px'}} 
            placeholder='할 일을 입력하세요'
            value={value}
            onChange={handleChange}
          />
          <input 
            type='submit'
            value='입력'
            className='btn'
            style={{flex: '1'}}
          />
        </form>
      </div>
    </div>
  )
}
