import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="row">
      <div className="col-12 col-md-3 mb-3">
        <div className="list-group">
          <a href="/admin" className="list-group-item list-group-item-action active">Productos</a>
        </div>
      </div>
      <div className="col-12 col-md-9">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
