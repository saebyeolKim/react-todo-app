import './App.css'
import { Component } from 'react'

// 클래스형 컴포넌트 만들기
// Component : react 내부에서 만든 것을 상속받은 것 -> render 메소드도 바로 사용할 수 있는 이유
export default class App extends Component {

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
    ]
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
  getStyle = () => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoraion: 'none',
    }
  }

  handleClick = (id) => {
    console.log(id)
    let newTodoData = this.state.todoData.filter((data) => data.id !== id)
    console.log(newTodoData)
    this.setState({todoData: newTodoData}) // setState : 이미 만들어져있는 함수, todoData를 newTodoData로 변경할꺼야
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
          <div key={data.id} style={this.getStyle()}>
            <input type='checkbox' defaultChecked={data.completed}/>
            {data.title}
            <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>X</button>
          </div>
        ))
      }
        </div>
      </div>
    )
  }
}
