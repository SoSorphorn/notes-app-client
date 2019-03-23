import styled from 'styled-components';

const NoteHeader = styled.h4 `
  font-family: "Open Sans", sans-serif; font-weight: 600;
  overflow: hidden;
  line-height: 1.5;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const NoteParagraph = styled.p `
  color: #666;
`
export { NoteHeader, NoteParagraph};