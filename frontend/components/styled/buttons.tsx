import styled from 'styled-components'
const SmallButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  color: #ffffff; /* Text color */
  background-color: #e06464; /* Button color */
  cursor: pointer;

  &:hover {
    background-color: #b55454; /* Darker shade for hover */
  }
`;

const LargeButton = styled.button`
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  color: #ffffff; /* Text color */
  background-color: #e06464; /* Button color */
  cursor: pointer;

  &:hover {
    background-color: #b55454; /* Darker shade for hover */
  }
`;

export { SmallButton, LargeButton }