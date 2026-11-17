import React from 'react';

function CompraFallida() {
  return (
    <div className="text-center">
      <h2 className="text-danger">No se pudo realizar el pago</h2>
      <p>Revisa los datos ingresados e inténtalo nuevamente.</p>
    </div>
  );
}

export default CompraFallida;
