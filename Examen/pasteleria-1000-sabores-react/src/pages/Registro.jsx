import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', edad: '', codigo: '', password: '', password2: '' });
  const [errores, setErrores] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validar() {
    const errs = {};
    if (form.nombre.trim().length < 3) errs.nombre = 'Mínimo 3 caracteres.';
    if (!form.email.includes('@')) errs.email = 'Correo no válido.';
    const edad = Number(form.edad);
    if (!form.edad || edad < 1 || edad > 120) errs.edad = 'Edad entre 1 y 120.';
    if (form.codigo && form.codigo.toUpperCase() !== 'FELICES50') errs.codigo = 'Código no válido.';
    if (form.password.length < 6) errs.password = 'Mínimo 6 caracteres.';
    if (form.password !== form.password2) errs.password2 = 'Las contraseñas no coinciden.';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validar();
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;

    localStorage.setItem('edadUsuario', form.edad);
    localStorage.setItem('codigoPromo', form.codigo.toUpperCase());
    navigate('/catalogo');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <h2>Registro de usuarios</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} />
            {errores.nombre && <div className="text-danger">{errores.nombre}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
            {errores.email && <div className="text-danger">{errores.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Edad</label>
            <input type="number" className="form-control" name="edad" value={form.edad} onChange={handleChange} />
            {errores.edad && <div className="text-danger">{errores.edad}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Código promocional (opcional)</label>
            <input type="text" className="form-control" name="codigo" value={form.codigo} onChange={handleChange} />
            {errores.codigo && <div className="text-danger">{errores.codigo}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} />
            {errores.password && <div className="text-danger">{errores.password}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Repetir contraseña</label>
            <input type="password" className="form-control" name="password2" value={form.password2} onChange={handleChange} />
            {errores.password2 && <div className="text-danger">{errores.password2}</div>}
          </div>
          <button type="submit" className="btn btn-primary"
            style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}>Registrarme</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
