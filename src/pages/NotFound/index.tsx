import React from 'react';
import { FiInfo } from 'react-icons/fi';

import Layout from '../_layouts/auth';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <section className="container view-wrapper view-not-found">
        <div className="tile is-parent is-8 is-vertical is-notification-tile is-not-found-tile">
          <div>
            <div className="notification tile is-child is-danger rubberBand-animation">
              <div>
                <FiInfo size="2x" />
                <span className="title">Atenção</span>
              </div>
              <p className="subtitle">
                Você não tem permissão para acessar essa página!!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
