### 리액트는 프레임워크가 아닌 라이브러리
> 앵귤러와 뷰는 프레임워크이며 리액트는 라이브러리이다.

#### 프레임 워크와 라이브러리의 차이
  - 프레임워크 : 어떠한 앱을 만들기 위해 필요한 대부분의 것을 가지고 있음
  - 라이브러리 : 특정 기능을 모듈화 해놓은 것 (라이브러리는 프레임워크에 포함)

<img width="713" height="427" alt="image" src="https://github.com/user-attachments/assets/571c1bb4-a1ce-4d5d-b3f1-de268d06d7fc" />

> 리액트가 라이브러리인 이유는 전적으로 UI(화면구현) 렌더링하는데 관여하기 때문이다. 리액트는 화면을 구현하는 것 이외의 것들은 다른 라이브러리> 를 사용한다.

#### :white_check_mark: 리액트와 잘 맞는 라이브러리들

<img width="785" height="354" alt="image" src="https://github.com/user-attachments/assets/38c4b151-e3b8-4b0e-a36c-547fe570c9ef" />

### 리액트 컴포넌트
> 리액트는 여러 컴포넌트를 이용해서 개발을 한다.

#### 컴포넌트란? 리액트로 만들어진 앱을 이루는 최소한의 단위

리액트는 여러 컴포넌트 조각으로 되어있다.

<img width="715" height="631" alt="image" src="https://github.com/user-attachments/assets/583dbfb5-bf5c-42d0-a662-c5f1cda6175b" />

:white_check_mark: 컴포넌트가 여러개로 나누어져 있기 떄문에 하나의 컴포넌트를 여러 곳에서 사용할 수 있다. 또한 여러 명이 각자 맡은 컴포넌트를 동시에 수정할 수도 있다.

#### 리액트 컴포넌트의 종류
  
:white_check_mark: 클래스형 컴포넌트

<img width="412" height="195" alt="image" src="https://github.com/user-attachments/assets/88baf0d5-82c8-4ddf-bcd7-1a625399050e" />

:white_check_mark: 함수형 컴포넌트 (리액트 hooks 이후에 많이 사용)

<img width="397" height="142" alt="image" src="https://github.com/user-attachments/assets/0e8396d6-971c-444a-ba34-d34d10484c7b" />


### 브라우저가 그려지는 원리 및 가상돔

브라우저가 렌더링하는 과정
웹페이지 빌드 과정 (Critical Rendering Path)
웹브라우저가 HTML 문서를 읽고, 스타일을 입히고 뷰포트에 입히는 과정
<img width="1197" height="345" alt="image" src="https://github.com/user-attachments/assets/c1768757-e5cb-4522-bb9f-5f844f7d0df2" />

- DOM tree 생성 : 렌더 엔진이 문서을 읽어들여서 그것들을 파싱하고 어떤 내용을 페이지에 렌더링할지 결정
- Render Tree 생성 : 브러우저가 DOM CSSOM 을 결합하는 곳이며, 이 프로세스는 화면에 보이는 모든 콘텐츠와 스타일 정보를 모두 포함하는 최종 렌더링 트리를 출력합니다. 즉 화면에 표시되는 모든 노드의 콘텐츠 및 스타일 정보를 포함한다.
- Layout(reflow) : 브라우저가 페이지에 표시되는 각 요소의 크기와 위치를 계산
- Paint : 실제 화면에 그리기

❗문제점 발생

어떤 인터랙션에 의해 DOM 에 변화가 생기면, 그 때 마다 Render Tree 가 재생성된다. 즉 모든 요소들의 스타일을 다시 계산하고 위의 과정을 다시 거치게 된다.

인터렉션이 엄청 많다면? 작은 변화로 인해 필요한 과정을 계속 거치게 되니 불필요하게 DOM을 조작하는 비용이 크게 발생한다.

> 이러한 문제를 해결하기 위해 나온 것이 Virtual Dom 이다.
> 가상 돔이란 실제 DOM을 메모리에 복사해준 것

<img width="3401" height="1957" alt="image" src="https://github.com/user-attachments/assets/3750b933-082c-4e08-886d-e98d0e0ee52f" />

#### 가상돔의 작동 방식
데이터가 바뀌면 가상돔에 렌더링되고 이전에 생긴 가상돔에 비교해서 바뀐 부분만 실제 돔에 적용을 시켜준다. 바뀐 부분을 찾는 과정을 Diffing 이라고 부르며, 바뀐 부분만 실제 돔에 적용시켜주는 것을 재조정(reconciliation)이라고 부른다.

만약 요소가 30개가 변하였다고 하더라도 한 번에 묶어서 한 번의 실제 돔 수정으로 처리하게 되서 돔을 조작하는 비용을 줄이게 된다.

### 리액트 설치를 위해서 필요한 것들(Node.js & Visual Studio Code)
node.js 란?

리액트 프로젝트를 만들기 위해 Node.js 와 npm 을 먼저 설치해야하는데 Node.js 를 받을 때 Npm 도 같이 설치된다.

Node.js 란 크롬 V8 자바스크립트 엔진으로 빌드한 자바스크립트 런타임으로서, 웹브라우저 환경이 아닌 곳에서도 자바스크립트를 사용하여 연산할 수 있다.

React 설치 시 Node.js 가 필요한 이유

리액트 앱은 웹 브라우저에서 실행되는 코드여서 Node.js 와 직접적인 연관은 없지만, 프로젝트를 개발하는 데 주요 도구들이 Node.js 를 사용하기 때문에 필요하다. 이 때 사용하는 개발 도구는 바벨, 모듈화된 코드를 한 파일로 합치고 코드를 수정할 때마다 웹 브라우저를 리로딩하는 등 여러 기능을 지닌 웹팩 등이 있다.

Visual Studio Code 란?

비주얼 스튜디오 코느는 마이크로소프트에서 오픈소스로 개발하고 있는 소스 코드 에디터이다. 웹 기반 기술들로 데스크톱 애플리케이션을 만들 수 있는 깃허브의 일렉트론을 기반으로 만들어져 맥os, 리눅스, 윈도우 등 메이저 운영체제를 모두 지원하고 있습니다. 마이크로소프트의 통합 개발 환경 비주얼 스튜디오와 이름이 비슷하지만 따로 개발되고 있으며 IDE 보다는 코드 에디터에 가깝다. MIT 라이센스로 오픈소스로 공개되어 있으며, 무료로 사용할 수 있다.

### Vite를 이용해서 리액트 설치하기
요즘에는 `npm create vite@latest` 명령어를 통해 간단히 설치할 수 있다.

이전에는 webpack 이나 babel 같은 모듈을 설치하고 설정해야 리액트 앱을 시작할 수 있었다.

<img width="553" height="383" alt="image" src="https://github.com/user-attachments/assets/9c888a5c-fcfc-43f4-8864-9301e3357c6f" />

<img width="189" height="369" alt="image" src="https://github.com/user-attachments/assets/8301e708-96ae-4df8-8d21-782252dc475c" />
