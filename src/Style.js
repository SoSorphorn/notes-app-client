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
const SettingWrapper = styled.form `
  margin: 0 auto; 
  max-width: 480px;
// `

const BillingFormWrapper = styled.div`
    margin-bottom: 15px;
    background-color: white;
    padding: 11px 16px;
    border-radius: 6px;
    border: 1px solid #CCC;
    line-height: 1.3333333;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102,175, 233, .6);
    border-color: #66AFE9;

`


export { ParagraphWrapper, FormWrapper, Wrapper, NoteFormWrapper, NoteFormTextarea , NoteWrapper,SettingWrapper, BillingFormWrapper};