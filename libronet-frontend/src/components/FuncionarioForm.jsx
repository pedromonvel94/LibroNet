// =============================================
// FuncionarioForm.jsx — Create / Edit
// Incluye selects de catálogos y grupo familiar
// =============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFuncionario, updateFuncionario } from '../services/funcionarioService';
import { useCatalogos } from '../hooks/useCatalogos';
import './FuncionarioForm.css';

function validate(values, isEdit) {
  const errors = {};
  if (!isEdit) {
    if (!values.numeroDocumento) errors.numeroDocumento = 'Requerido';
    else if (isNaN(Number(values.numeroDocumento))) errors.numeroDocumento = 'Debe ser numérico';
  }
  if (!values.nombreCompleto.trim()) errors.nombreCompleto = 'Requerido';
  if (!values.fechaIngreso)          errors.fechaIngreso   = 'Requerido';
  if (!values.estadoCivilId)         errors.estadoCivilId  = 'Selecciona un estado civil';
  if (!values.tipoDocId)             errors.tipoDocId      = 'Selecciona un tipo de documento';
  if (!values.formacionId)           errors.formacionId    = 'Selecciona una formación';
  return errors;
}

export default function FuncionarioForm({ funcionario }) {
  const isEdit   = Boolean(funcionario);
  const navigate = useNavigate();
  const { catalogos, loading: loadingCat } = useCatalogos();

  const [values, setValues] = useState({
    numeroDocumento: funcionario?.numeroDocumento ?? '',
    nombreCompleto:  funcionario?.nombreCompleto  ?? '',
    fechaIngreso:    funcionario?.fechaIngreso     ?? '',
    estadoCivilId:   '',
    tipoDocId:       '',
    formacionId:     '',
  });

  // Grupo familiar: array de { nombreFamiliar, parentesco }
  const [familiares, setFamiliares] = useState(
    funcionario?.grupoFamiliar?.map(gf => ({
      nombreFamiliar: gf.nombreFamiliar,
      parentesco:     gf.parentesco,
    })) ?? []
  );

  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  }

  // Grupo familiar handlers
  function addFamiliar() {
    setFamiliares(prev => [...prev, { nombreFamiliar: '', parentesco: '' }]);
  }

  function removeFamiliar(idx) {
    setFamiliares(prev => prev.filter((_, i) => i !== idx));
  }

  function handleFamiliarChange(idx, field, value) {
    setFamiliares(prev =>
      prev.map((f, i) => i === idx ? { ...f, [field]: value } : f)
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values, isEdit);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setStatus(null);

    const payload = {
      numeroDocumento: isEdit ? funcionario.numeroDocumento : Number(values.numeroDocumento),
      nombreCompleto:  values.nombreCompleto,
      fechaIngreso:    values.fechaIngreso,
      estadoCivilId:   Number(values.estadoCivilId),
      tipoDocId:       Number(values.tipoDocId),
      formacionId:     Number(values.formacionId),
    };

    try {
      if (isEdit) {
        await updateFuncionario(funcionario.numeroDocumento, payload);
        setStatus('success');
        setMessage('Funcionario actualizado correctamente.');
      } else {
        await createFuncionario(payload);
        setStatus('success');
        setMessage('Funcionario creado correctamente. Redirigiendo...');
        setTimeout(() => navigate('/funcionarios'), 1400);
      }
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card">
      <h2 className="form-card__title">
        {isEdit ? 'Editar Funcionario' : 'Nuevo Funcionario'}
      </h2>
      <p className="form-card__subtitle">
        {isEdit
          ? `Editando el registro de ${funcionario.nombreCompleto}`
          : 'Completa todos los campos para crear el registro'}
      </p>

      {status && (
        <div className={`form-alert form-alert--${status}`}>
          {status === 'success' ? '✓' : '⚠'} {message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* ── Identificación ── */}
        <div className="form-section">
          <p className="form-section__title">Identificación</p>
          <div className={`form-grid form-grid--2`}>

            {!isEdit && (
              <div className="form-field">
                <label htmlFor="numeroDocumento">Número de Documento</label>
                <input
                  id="numeroDocumento"
                  name="numeroDocumento"
                  type="number"
                  placeholder="Ej: 1234567890"
                  value={values.numeroDocumento}
                  onChange={handleChange}
                  className={errors.numeroDocumento ? 'error' : ''}
                />
                {errors.numeroDocumento && <span className="form-field__error">{errors.numeroDocumento}</span>}
              </div>
            )}

            <div className="form-field">
              <label htmlFor="tipoDocId">Tipo de Documento</label>
              <select
                id="tipoDocId"
                name="tipoDocId"
                value={values.tipoDocId}
                onChange={handleChange}
                className={errors.tipoDocId ? 'error' : ''}
                disabled={loadingCat}
              >
                <option value="">
                  {loadingCat ? 'Cargando...' : '-- Seleccionar --'}
                </option>
                {catalogos.tiposDocumento.map(t => (
                  <option key={t.id} value={t.id}>{t.nombre}</option>
                ))}
              </select>
              {errors.tipoDocId && <span className="form-field__error">{errors.tipoDocId}</span>}
            </div>

            <div className={`form-field ${isEdit ? '' : 'form-field--full'}`}>
              <label htmlFor="nombreCompleto">Nombre Completo</label>
              <input
                id="nombreCompleto"
                name="nombreCompleto"
                type="text"
                placeholder="Ej: María García López"
                value={values.nombreCompleto}
                onChange={handleChange}
                className={errors.nombreCompleto ? 'error' : ''}
              />
              {errors.nombreCompleto && <span className="form-field__error">{errors.nombreCompleto}</span>}
            </div>

          </div>
        </div>

        {/* ── Información Personal ── */}
        <div className="form-section">
          <p className="form-section__title">Información Personal</p>
          <div className="form-grid form-grid--2">

            <div className="form-field">
              <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
              <input
                id="fechaIngreso"
                name="fechaIngreso"
                type="date"
                value={values.fechaIngreso}
                onChange={handleChange}
                className={errors.fechaIngreso ? 'error' : ''}
              />
              {errors.fechaIngreso && <span className="form-field__error">{errors.fechaIngreso}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="estadoCivilId">Estado Civil</label>
              <select
                id="estadoCivilId"
                name="estadoCivilId"
                value={values.estadoCivilId}
                onChange={handleChange}
                className={errors.estadoCivilId ? 'error' : ''}
                disabled={loadingCat}
              >
                <option value="">{loadingCat ? 'Cargando...' : '-- Seleccionar --'}</option>
                {catalogos.estadosCiviles.map(e => (
                  <option key={e.id} value={e.id}>{e.nombre}</option>
                ))}
              </select>
              {errors.estadoCivilId && <span className="form-field__error">{errors.estadoCivilId}</span>}
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="formacionId">Formación Académica</label>
              <select
                id="formacionId"
                name="formacionId"
                value={values.formacionId}
                onChange={handleChange}
                className={errors.formacionId ? 'error' : ''}
                disabled={loadingCat}
              >
                <option value="">{loadingCat ? 'Cargando...' : '-- Seleccionar --'}</option>
                {catalogos.formaciones.map(f => (
                  <option key={f.id} value={f.id}>{f.nombre}</option>
                ))}
              </select>
              {errors.formacionId && <span className="form-field__error">{errors.formacionId}</span>}
            </div>

          </div>
        </div>

        {/* ── Grupo Familiar ── */}
        <div className="form-section">
          <p className="form-section__title">Grupo Familiar (opcional)</p>

          {familiares.length === 0 ? (
            <p className="familiar-empty-msg">Sin familiares agregados aún.</p>
          ) : (
            <div className="familiar-list">
              {familiares.map((fam, idx) => (
                <div key={idx} className="familiar-row">
                  <div className="form-field">
                    <label>Nombre</label>
                    <input
                      type="text"
                      placeholder="Nombre del familiar"
                      value={fam.nombreFamiliar}
                      onChange={e => handleFamiliarChange(idx, 'nombreFamiliar', e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Parentesco</label>
                    <input
                      type="text"
                      placeholder="Ej: Hijo/a, Cónyuge"
                      value={fam.parentesco}
                      onChange={e => handleFamiliarChange(idx, 'parentesco', e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn-remove"
                    title="Eliminar familiar"
                    onClick={() => removeFamiliar(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button type="button" className="btn-add-familiar" onClick={addFamiliar}>
            + Agregar familiar
          </button>
        </div>

        {/* ── Acciones ── */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn--primary"
            disabled={loading || loadingCat}
          >
            {loading ? 'Guardando…' : isEdit ? 'Actualizar' : 'Crear Funcionario'}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
}
