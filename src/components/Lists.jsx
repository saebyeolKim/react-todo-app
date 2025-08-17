export default function Lists({todoData, setTodoData}) {

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

    return <div>
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
    </div>
}