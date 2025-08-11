import './App.css'
import { Component } from 'react'

// 클래스형 컴포넌트 만들기
// Component : react 내부에서 만든 것을 상속받은 것 -> render 메소드도 바로 사용할 수 있는 이유
export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='todoBlock'>
          <div className='title'>
            <h1>할 일 목록</h1>
          </div>
        </div>
      </div>
    )
  }
}
