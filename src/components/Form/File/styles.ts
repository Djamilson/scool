import styled from 'styled-components';

export const Container = styled.div`
  height: 300px;
  background: #e1faec;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  outline: 0;

  label {
    margin: auto 20px;
    width: calc(100% - 60px);
    height: calc(100% - 60px);

    border-radius: 10px;
    border: 1px dashed #4ecb79;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333;
    cursor: pointer;
    padding: 60px;

    svg {
      color: #4ecb79;
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
    }

    input[type='file'] {
      display: none;
      cursor: pointer;
    }
  }

  img {
    width: calc(75% - 60px);
    height: calc(100% - 60px);

    margin: auto 20px;

    object-fit: cover;

    input[type='file'] {
      display: none;
    }
  }
`;
