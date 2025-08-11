# 간단한 To-Do 앱 만들며 리액트 익히기
### Vite 로 설치된 리액트 기본 구조 살펴보기
<img width="256" height="405" alt="image" src="https://github.com/user-attachments/assets/a9450220-6a01-4e26-b0a2-92e52299b86e" />

- src : 폴더안에 대부분의 리액트 소스코드가 들어간다.

- package.json 프로젝트에 관한 정보들이 있다.
  - scripts : 리액트 파일 실행 혹은 빌드에 관한 정보가 들어있다.
    <img width="763" height="707" alt="image" src="https://github.com/user-attachments/assets/938f15d9-4852-4166-924a-97cf61217bfa" />

    > npm run dev 혹은 npm run build 이런식으로 사용
  - dependencies : 앱을 생성하는데 필요한 라이브러리들의 모음
  - devDependencies : 개발 환경에서만 사용하는 라이브러리들

### React App 실행해보기
```bash
npm install # node_modules 생성
npm run dev
```

<img width="555" height="252" alt="image" src="https://github.com/user-attachments/assets/8267ee70-728d-42f1-8d08-a3c34522dd63" />

<img width="1276" height="899" alt="image" src="https://github.com/user-attachments/assets/64ff20cd-0d5a-4b02-9f44-e88e9c061909" />

### SPA(Single Page Application) 이란?
html 과 자바스크립트만으로 만들때에는 html 의 템플릿이 화면에서 보이게 된다. 하지만 리액트는 index.html 안에 `<div id="root">` 요소 안에 소스를 담는다.

index.html

<img width="653" height="313" alt="image" src="https://github.com/user-attachments/assets/872070d8-267d-4aa1-b26b-559b8ef20414" />

main.jsx

<img width="670" height="261" alt="image" src="https://github.com/user-attachments/assets/7d18d157-a413-47fb-af7e-28f93f0a1c90" />

App.jsx

<img width="676" height="457" alt="image" src="https://github.com/user-attachments/assets/4625960e-e60b-4290-9087-2db06db4616f" />

### 할 일 목록 앱 소개 및 JSX 알아보기

