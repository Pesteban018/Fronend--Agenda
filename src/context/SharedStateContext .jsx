import React, { createContext, useContext, useState } from 'react';

const SharedStateContext = createContext();

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState debe usarse dentro de un SharedStateProvider');
  }
  return context;
};

export const SharedStateProvider = ({ children }) => {
  const [anchoPagina, setAnchoPagina] = useState('w-64');
  const [perfilExtendido, setPerfilExtendido] = useState(false);

  const toggleAnchoPagina = () => {
    setAnchoPagina((prevAncho) => (prevAncho === 'w-64' ? 'w-96' : 'w-64'));
  };

  const togglePerfilExtendido = () => {
    setPerfilExtendido((prevExtendido) => !prevExtendido);
  };

  return (
    <SharedStateContext.Provider value={{ anchoPagina, toggleAnchoPagina, perfilExtendido, togglePerfilExtendido }}>
      {children}
    </SharedStateContext.Provider>
  );
};
