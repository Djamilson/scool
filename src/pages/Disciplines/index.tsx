import React, { useCallback, useEffect, useState } from 'react';
import { FcAddDatabase } from 'react-icons/fc';
import { Link } from 'react-router-dom';

import Layout from '../_layouts/auth';
import api from '../../_services/api';
import { Man, NavButton } from './styles';
import Table from './Table';

interface IDiscipline {
  id: string;
  name: string;
}

const Disciplines: React.FC = () => {
  const [disciplines, setDisciplines] = useState<IDiscipline[]>(
    [] as IDiscipline[],
  );

  const loadDisciplines = useCallback(async () => {
    try {
      const res = await api.get('disciplines');
      setDisciplines(res.data);
    } catch (erro) {}
  }, [setDisciplines]);

  useEffect(() => {
    loadDisciplines();
  }, [loadDisciplines]);

  return (
    <Layout>
      <Man>
        <NavButton>
          <header>
            <h1>Disciplinas</h1>
            <Link to="/disciplines/new">
              <span>
                <FcAddDatabase />
              </span>
              <strong>Nova Disciplina</strong>
            </Link>
          </header>
        </NavButton>

        <Table disciplines={disciplines} />
      </Man>
    </Layout>
  );
};

export default Disciplines;
