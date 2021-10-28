import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset' // style-reset 패키지

const GlobalStyles = createGlobalStyle`
    ${reset}
    body{
        font-size:16px;
    }
    a{
        color:#000;
        text-decoration:none;
    }
`

export default GlobalStyles
