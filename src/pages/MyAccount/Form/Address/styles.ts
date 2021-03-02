import styled from 'styled-components';

import Input from '../../../../components/Form/Input';

export const AddressItem = styled.div`
  @media (min-width: 700px) {
    display: grid;
    column-gap: 1.6rem;
    grid-template-columns: 1fr 200px;
  }
`;

export const InputNumber = styled(Input)`
  @media (min-width: 700px) {
    width: 100%;
  }
`;
