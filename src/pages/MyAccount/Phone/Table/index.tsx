import React from 'react';
import { FaHandPointLeft, FaThumbsUp } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';

import { colors } from '../../../../styles';
import { ContentTable } from './styles';

interface IPhone {
  id: string;
  phone: string;
  person_id: string;
  main: boolean;
}

interface IProps {
  phones: IPhone[];
  handlerToggleModalEditPhone: (idPhone: string) => void;
  handlerPhoneMain: (idPhone: string) => void;
  handlerToggleModalDeletePhone: (idPhone: string) => void;
}

const Table: React.FC<IProps> = ({
  phones,
  handlerToggleModalEditPhone,
  handlerPhoneMain,
  handlerToggleModalDeletePhone,
}) => {
  return (
    <ContentTable>
      <thead>
        <tr>
          <th>#</th>
          <th>Fone</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {phones.length < 1 && (
          <tr>
            <td colSpan={4}>
              <h2>Você ainda não tem fone cadastrado!</h2>
            </td>
          </tr>
        )}
        {phones.map((item, ind) => (
          <tr key={item.id}>
            <td>
              <strong>{ind + 1}</strong>
            </td>
            <td>
              <span>
                <strong>{item.phone}</strong>
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
                    onClick={() => handlerPhoneMain(item.id)}
                  >
                    <FaHandPointLeft size={20} color={colors.colorTextTitle} />
                  </button>
                )}
                <button
                  title="Editar fone"
                  type="button"
                  onClick={() => handlerToggleModalEditPhone(item.id)}
                >
                  <MdEdit size={20} color="#7159c1" />
                </button>
                {!item.main && (
                  <button
                    title="Detete"
                    type="button"
                    onClick={() => handlerToggleModalDeletePhone(item.id)}
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
