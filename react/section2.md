# 간단한 To-Do 앱 만들며 리액트 익히기
### 1. Vite 로 설치된 리액트 기본 구조 살펴보기
<img width="256" height="405" alt="image" src="https://github.com/user-attachments/assets/a9450220-6a01-4e26-b0a2-92e52299b86e" />

- src : 폴더안에 대부분의 리액트 소스코드가 들어간다.

- package.json 프로젝트에 관한 정보들이 있다.
  - scripts : 리액트 파일 실행 혹은 빌드에 관한 정보가 들어있다.
    <img width="763" height="707" alt="image" src="https://github.com/user-attachments/assets/938f15d9-4852-4166-924a-97cf61217bfa" />

    > npm run dev 혹은 npm run build 이런식으로 사용
  - dependencies : 앱을 생성하는데 필요한 라이브러리들의 모음
  - devDependencies : 개발 환경에서만 사용하는 라이브러리들

### 2. React App 실행해보기
```bash
npm install # node_modules 생성
npm run dev
```

<img width="555" height="252" alt="image" src="https://github.com/user-attachments/assets/8267ee70-728d-42f1-8d08-a3c34522dd63" />

<img width="1276" height="899" alt="image" src="https://github.com/user-attachments/assets/64ff20cd-0d5a-4b02-9f44-e88e9c061909" />

### 3. SPA(Single Page Application) 이란?
html 과 자바스크립트만으로 만들때에는 html 의 템플릿이 화면에서 보이게 된다. 하지만 리액트는 index.html 안에 `<div id="root">` 요소 안에 소스를 담는다.

index.html

<img width="653" height="313" alt="image" src="https://github.com/user-attachments/assets/872070d8-267d-4aa1-b26b-559b8ef20414" />

main.jsx

<img width="670" height="261" alt="image" src="https://github.com/user-attachments/assets/7d18d157-a413-47fb-af7e-28f93f0a1c90" />

App.jsx

<img width="676" height="457" alt="image" src="https://github.com/user-attachments/assets/4625960e-e60b-4290-9087-2db06db4616f" />

### 4. 할 일 목록 앱 소개 및 JSX 알아보기
JSX란?
- 모양은 HTML과 비슷하지만, 자바스크립트의 확장 문법이다.
- 리액트에서 UI(화면 구조)를 작성할 때 주로 사용한다.
- 필수는 아니지만, 자바스크립트 코드 안에서 UI를 작성하기 편리해 거의 모든 개발자가 사용한다.

리액트와 JSX
- 리액트는 JSX를 가상 DOM(Virtual DOM) 안에서 처리해 화면을 그린다.
- JSX는 결국 자바스크립트 코드로 변환되어 브라우저에서 실행된다.

바벨(Babel)의 역할
- JSX를 브라우저가 이해할 수 있는 순수 자바스크립트 코드로 변환해 준다.
- 예를 들어, `<h1>Hello</h1>` 같은 JSX를 React.createElement(...) 형태로 바꿔준다.

즉, JSX = 자바스크립트에서 UI를 간편하게 표현하는 문법이고,
바벨이 이걸 일반 자바스크립트로 변환,
리액트가 이를 가상 DOM에 반영해 화면에 보여주는 구조입니다.

<img width="995" height="241" alt="image" src="https://github.com/user-attachments/assets/75bda9bb-5554-4491-9421-1a4ed23caa4a" />

### 5. 할 일 목록 앱 만들기 시작
index.css
```css
body {
  background-color: aliceblue;
}
```


App.jsx
```jsx
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

```

App.css
```css
.container {
  margin: auto;
  max-width: 600px;
}

.todoBlock {
  padding: 30px;
  margin-top: 50px;
  background: #fff;
  border-radius: 10px;
  box-shadow: -9px 17px 13px rgb(0 0 0 / 16%);
}
```

<img width="1069" height="339" alt="image" src="https://github.com/user-attachments/assets/8229b455-33d3-408a-b3c8-86f3574a6c6c" />

### 6. 할 일 목록 UI 만들기(JSX, CSS 작성)

