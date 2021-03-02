import React from 'react';
import { FaHandPointLeft, FaThumbsUp } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';

import { colors } from '../../../../styles';
import { ContentTable } from './styles';

interface IAddress {
  id: string;
  number: number;
  street: string;
  complement: string;
  zip_code: string;
  neighborhood: string;
  city: string;
  state: string;
  main: boolean;
}

interface IProps {
  addresses: IAddress[];
  handlerAddressMain: (idAddress: string) => void;
  handlerToggleModalDeleteAddress: (idAddress: string) => void;
  handlerEditAddress: (idAddress: string) => void;
}

const Table: React.FC<IProps> = ({
  addresses,
  handlerAddressMain,
  handlerToggleModalDeleteAddress,
  handlerEditAddress,
}) => {
  return (
    <ContentTable>
      <thead>
        <tr>
          <th>#</th>
          <th>Rua</th>
          <th>Complemento</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {addresses.length < 1 && (
          <tr>
            <td colSpan={4}>
              <h2>Você ainda não tem endereço cadastrado!</h2>
            </td>
          </tr>
        )}
        {addresses.map((item, ind) => (
          <tr key={item.id}>
            <td>
              <strong>{ind + 1}</strong>
            </td>
            <td>
              <span>
                <strong>{item.street}</strong>
              </span>
            </td>

            <td>
              <span>
                <strong>
                  {item.complement}, número: {item.number}, {item.neighborhood},
                  {item.zip_code}, {item.city}-{item.state}
                </strong>
              </span>
            </td>

            <td>
              <div>
                {item.main && (
                  <FaThumbsUp size={20} color={colors.colorSecundary} />
                )}
                {!item.main && (
                  <button
                    title="Torna principal"
                    type="button"
                    onClick={() => handlerAddressMain(item.id)}
                  >
                    <FaHandPointLeft size={20} color={colors.colorTextTitle} />
                  </button>
                )}

                <button
                  title="Editar"
                  type="button"
                  onClick={() => handlerEditAddress(item.id)}
                >
                  <MdEdit size={20} color={colors.colorPrimary} />
                </button>

                {!item.main && (
                  <button
                    title="Detete"
                    type="button"
                    onClick={() => handlerToggleModalDeleteAddress(item.id)}
                  >
                    <MdDelete size={20} color={colors.colorTertiary} />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </ContentTable>
  );
};

export default Table;
