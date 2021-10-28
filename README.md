# styled Component - responsive practice

### globalStyle과 reset
프로젝트를 실행하기전 기본적으로 걸려있는 HTML태그들의 디폴트 css값을 초기화하기 위하여 
사용할 globalStyle 전역스타일과 reset이다.

- globalStyle
- styled-reset

기본적으로 모든 html태그들을 따로 손안보고 초기화를 할 것이라면
npm에서 제공하는 **styled-reset** 을 사용할수있다.
```js
    npm i styled-reset
```

설치를 한다음 sharded(폴더명:아무거나해도됨)폴더에 globalStyle.js파일을 만들어준 다음
```js
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset' // style-reset 패키지

const GlobalStyles = createGlobalStyle`
    ${reset} //<- npm styled-reset
    //...나만의 리셋 코드
`

export default GlobalStyles

```
위 코드처럼 사용할수있다. 만약 나만의 초기화설정을 원한다면 ${reset}아래에 커스텀한 나만의 스타일을 작성할 수있다.


<hr>

### themeProvider & onClick handler
만약 부트스트렙처럼 각 프로젝트마다 가지고 있는 디자인 시스템이 있다고 가정해보자
만약 이같은 시스템이 없다면 개발자마다 각각 조금씩 다른 스타일링으로 큰 혼란을 빚을것이며
서비스의 유지보수, 다시사용하기 어려운 코드, 협업의 불소통 등으로 매우 좋지않을것이다.
그래서 정리된 시스템이 필요하다.

이를 도와줄수 있는 스타일 컴포넌트의 **themeProvider** 가 존재한다.
이것은 context와 거의 비슷한 개념이라 생각하면된다. 

**"정리 및 배열된 css 시스템을 불러와 context처럼 최상단에 두어 모든 하위 컴포넌트들이 해당 css를 사용할수 있도록 도와주는 개념이다"**

연습해보자.
(이왕 연습하는 김에 낮과 밤의 컬러로 변경할수있는 핸들러를 제작해보았다.)

```js
// theme.js
// 낮과 밤에 사용하는 컬러값의 테마를 만들어보자
const dayColors = {
  bg: '#f0f0f0',
  color: '#333',
}

const noghtColors = {
  bg: '#000',
  color: '#fff',
}

// theme 객체에 감싸서 반환
const theme = {
  dayColors,
  noghtColors,
}

export default theme
```
위는 theme의 코드이다. 이제 만들어진 위 코드를 사용할 최상단 파일 App component에 불러보자

```js
import React, { useState } from 'react' // useState로 낮과 밤 state변경
import GlobalStyles from './sharded/GlobalStyle'
import styled, { ThemeProvider } from 'styled-components' // ThemeProvider를 사용하여 최상단기준부터 그 및 하위 컴포넌트에 지정된 테마를 뿌려준다.
import theme from './sharded/dayTheme' // 테마

const Box = styled.div`
  background-color: ${({ theme, day }) => // theme = 상단의 불러오는 테마, day = 적용된 박스의 props에 적용할 state
    day === 'day' ? theme.dayColors.bg : theme.noghtColors.bg}; // 만약 적용된 box의 props.day가 'day'라면 낮컬러 아니면 밤컬러
  width: 200px;
  height: 200px;
  color: ${({ theme, day }) => 
    day === 'day' ? theme.dayColors.color : theme.noghtColors.color};
  text-align: center;
  margin: 100px auto;
`

function App() {
  const [day, setDay] = useState('day')
  function handleRevers() {
    return day === 'day' ? setDay('noght') : setDay('day') // day = 'day'라면 밤으로 변경 아니면 낮으로 변경
  }

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}> // 이곳에서 테마를 물려받는다. 최하단 컴포넌트까지 모두다
        <div className="App">
          <Box day={day}> // box의 props.day = day('day')
            <button onClick={handleRevers}>반전</button>
            <h2>hello world...</h2>
            <p>2021.12.12</p>
            <p>lorem test is my sas.........</p>
          </Box>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App

```
조금 복잡해보이지만 위 코드를 잘 살펴보자 
ThemeProvider에서 물려준 props theme={theme}로부터 모든 하단 컴포넌트까지 theme의 속성을 받을수있다.
그렇기에 하단에 있는 Box의 props에서 theme를 사용할 수 있었던것!
또한 Box에 day라는 props를 주어 밤과 낮의 컬러값을 변경하는 핸들러를 주었는데
각 매 Box마다 props day를 주는건 비효율적이니 themeProvider에 효과를 주는것이 효율적일듯하다.


**실습 : 다크모드를 만들어보자**
```js
import React, { useState } from 'react' // useState로 낮과 밤 state변경
import GlobalStyles from './sharded/GlobalStyle'
import styled, { ThemeProvider } from 'styled-components'
import nightThemeColor from './theme2' // 밤테마
import dayThemeColor from './theme3' // 낮테마

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme: { day } }) => day.Color.color}; // state의 day = 초기값(nightThemeColor)
  color: ${({ theme: { day } }) => day.Color.text};
`

function App() {
  const [day, setDay] = useState(nightThemeColor)

  function handleRevers() {
    return day === nightThemeColor
      ? setDay(dayThemeColor)
      : setDay(nightThemeColor)
  }

  return (
    <ThemeProvider theme={{ day }}> // props.day(nightThemeColor) 로 출력
      <GlobalStyles />
      <button onClick={handleRevers}>반전</button>
      <Box className="App">hello react</Box>
    </ThemeProvider>
  )
}

export default App

```
연습을 하다보니 변수네이밍이 좀 이상하다는 생각은 들지만 우선 위 코드처럼 작성을 하니 다크모드가 작동되었다.
낮,밤테마를 따로 만들어 불러온 후 useState를 사용하여 버튼을 클릭시 낮과 밤의 값이 day를 통해서 변경되도록 한 후 
theme={{day}}로 할당을 해주었다.
다음에는 미디어쿼리를 좀더 흩어볼 예정이다.



### 반응형의 꽃 media query
반응형사이트를 만들기위해서는 미디어쿼리가 빠질수 없다.
그렇기에 이번에는 기존 알아본 themeProvider를 이용해 반응형 테마를 만든 후 
사이즈를 지정할 부분에서 적용할 예정이다. 

우선은 아래코드로 확인해보자
```js
// media.js
const size = {
  mobile: '320px',
  tablet: '780px',
  desktop: '1080px',
}

const device = {
  mobile: `screen and (max-width : ${size.mobile})`,
  tablet: `screen and (max-width : ${size.tablet})`,
  desktop: `screen and (max-width : ${size.desktop})`,
}

const media = {
  device,
}

export default media
```

위코드처럼 사이즈를 지정한 테마를 만든 후 themeProvider를 통해 전역에 불러온다. 
불러온 미디어 테마를 사용해 스타일코드를 작성해준다.

```js
import React from 'react' // useState로 낮과 밤 state변경
import GlobalStyles from './sharded/GlobalStyle'
import styled, { ThemeProvider } from 'styled-components'
import media from './media'

const Box = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  max-width: 800px;
  margin: 100px auto;
  padding: 30px;
  transition: all 0.3s ease;
  @media ${({ theme }) => theme.media.device.desktop} {
    max-width: 100px;
    background-color: red;
  }
`

function App() {
  return (
    <>
      <ThemeProvider theme={{ media }}>
        <GlobalStyles />
        <Box className="App">ss</Box>
      </ThemeProvider>
    </>
  )
}

export default App
```

이제 반응형작업을 하는 경우 위의 방식을 적용하여 만들수도 있을듯하다.
지금까지 연습해본 스타일링은 이론만을 확인하기 위한 방법이니
좀더 규모가 있는 커뮤니티를 만들어보며 적극적으로 사용해볼 예정이다.

