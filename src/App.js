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
