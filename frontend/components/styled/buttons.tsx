import styled from 'styled-components'
const SmallButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 18px;
  border: none;
  color: #ffffff; /* Text color */
  background-color: #e06464; /* Button color */
  cursor: pointer;

  &:hover {
    background-color: #b55454; /* Darker shade for hover */
  }
`;

const LargeButton = styled.button`
  padding: 1.2rem 2rem;
  font-size: 1.3rem;
  border-radius: 10px;
  border: none;
  color: #ffffff; /* Text color */
  background-color: #e06464; /* Button color */
  cursor: pointer;

  &:hover {
    background-color: #b55454; /* Darker shade for hover */
  }
`;


const FloatButton = styled(LargeButton)`
    width: 80%;
    position: fixed;
    bottom: 20px;
    left: 10%;
    z-index: 100;
`

export { SmallButton, LargeButton, FloatButton }