import React from 'react'
import styled from 'styled-components'

const New = styled.div`
  width: 200px;
  background-color: ${({ theme }) => theme.day.Color.color};
  font-size: ${({ theme }) => theme.themeFontSize.fontSize.fontSize};
`

function NewBox() {
  return <New>aaaa</New>
}

export default NewBox
