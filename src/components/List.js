import styled from "styled-components";
export const ListBox = styled.div`
  width: 90%;
  border: 1px 0px 1px 0;
  outline: none;
  height: 30px;
  background-color: white;
  min-width: 400px;
  //max-width: 600px;
  text-align: left;
  display: flex;
`;
export const ElementText = styled.div`
  width: 15%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 10px 0 10px;
`;
function List() {}

export default List;
