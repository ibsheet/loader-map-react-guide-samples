# loader-map-react-guide-samples 👋

## Guide sample using loader and ibmap and react

## 📖 구조

1. `main.jsx`는 `index.html`에 `App.jsx`를 렌더링합니다.
2. `App.jsx`는 메인 페이지입니다.
3. `Layout.jsx`에는 페이지의 레이아웃 컴포넌트가 있습니다.
4. `react-router-dom`을 통해 라우팅을 구현하여, 각 샘플 페이지를 URL로 렌더링합니다.
5. `Home.jsx`는 메인 페이지에서 보여지는 컴포넌트입니다.
6. `Redux Toolkit`을 사용하여 전역 상태를 관리합니다.

### :gift_heart:메인 화면 흐름

순서: `App.jsx =>  Layout.jsx => Section.jsx => Navigation.jsx => Home.jsx => 각 샘플 페이지`

### 사용기술

👉 `@ibsheet/loader: 1.3.3` <br/>
👉 `Javascript, React, Redux, Material-UI, BootStrap, SweetAlert2, React-Icons`

### ✨설치방법

1. `clone` 을 받는다.
2. 해당 프로젝트는 `yarn berry` 를 기준으로 만들어졌습니다. `yarn` 을 최신 버전으로 설치해줍니다. `npm install --global yarn`
3. `yarn` 을 하여 패키지 모듈을 설치해줍니다.
4. `public/lib` 에 `ibsheet` 라이브러리가 들어있는 `assets` 폴더를 넣어줍니다. (`config/config.js` 에서 파일위치는 변경할 수 있음.)
5. `yarn build` // build 파일 생성됨.
6. `yarn start` // 실행
