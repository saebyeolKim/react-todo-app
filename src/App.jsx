import './App.css'
import { Component } from 'react'

// 클래스형 컴포넌트 만들기
// Component : react 내부에서 만든 것을 상속받은 것 -> render 메소드도 바로 사용할 수 있는 이유
export default class App extends Component {

  // 컴포넌트에서 어떠한 데이터를 기억하고 있을 때 사용
  state = {
    todoData: [
      {
        id: "1",
        title: "공부하기",
        completed: true,
      },
      {
        id: "2",
        title: "청소하기",
        completed: false,
      },
    ],

    // 타이핑한 것을 기억하고 싶기 때문에
    value: '',
  }

  btnStyle = {
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
  }
  // 값을 받아서 dynamic 하게 사용 가능
  getStyle = (completed) => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: completed ? 'line-through' : 'none',
    }
  }

  handleClick = (id) => {
    console.log(id)
    let newTodoData = this.state.todoData.filter((data) => data.id !== id)
    console.log(newTodoData)
    this.setState({todoData: newTodoData}) // setState : 이미 만들어져있는 함수, todoData를 newTodoData로 변경할꺼야
  }

  // 할 일 입력하는 기능
  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리프레싱 막아줌

    let newTodo = {
      id: Date.now(), // 유니크한 값을 id 로 지정해줌
      title: this.state.value,
      completed: false
    }

    this.setState({
      todoData: [...this.state.todoData, newTodo], // ... 을 사용해 원래있던 애들 얕은복사 후 같이 넣어준다
      value: ''
    })
  }

  handleComplteChange = (id) => {
    let newTodoData = this.state.todoData.map((data) => {
      if (data.id == id) {
        data.completed = !data.completed;
      }
      return data;
    })

    this.setState({ todoData : newTodoData});
  }

  render() {
    return (
      <div className='container'>
        <div className='todoBlock'>
          <div className='title'>
            <h1>할 일 목록</h1>
          </div>
          {
            this.state.todoData.map((data) => (
              <div key={data.id} style={this.getStyle(data.completed)}>
                <input type='checkbox'
                onChange={() => this.handleComplteChange(data.id)} checked={data.completed}/>
                {data.title}
                <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>X</button>
              </div>
            ))
          }

          <form style={{display: 'flex'}} onSubmit={this.handleSubmit}>
            <input 
              type='text' 
              name='value' 
              style={{flex: '10', padding: '5px'}} 
              placeholder='할 일을 입력하세요'
              value={this.state.value}
              onChange={this.handleChange}
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
}
