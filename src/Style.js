import styled from 'styled-components';

const Wrapper = styled.div `
@media all and (min-width: 480px) {
  padding: 60px 0;
}
`
const FormWrapper = styled.form `
  margin: 0 auto; 
  max-width: 320px;
`
const ParagraphWrapper = styled.p `
  font-size: 14px; padding-botptom: 10px;
  color: #999;
`  
const NoteWrapper = styled.div `
  padding-left: 400px;
  padding-right: 400px;
  padding-top: 30px;
`
const NoteFormWrapper = styled.form `
  padding-bottom: 15px;
`
const NoteFormTextarea = styled.textarea `
  height: 300px;
  font-size: 24px;
`

export { ParagraphWrapper, FormWrapper, Wrapper, NoteFormWrapper, NoteFormTextarea , NoteWrapper};