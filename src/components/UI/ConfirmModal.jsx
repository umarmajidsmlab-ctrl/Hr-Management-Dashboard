import React from 'react';
import { AlertCircle } from 'lucide-react';

const ConfirmModal = ({ show, onConfirm, onCancel, title, message, type = 'danger' }) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100 }}>
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-body p-4 text-center">
            <div className={`bg-${type}-subtle text-${type} rounded-circle d-inline-flex p-3 mb-3`}>
              <AlertCircle size={32} />
            </div>
            <h5 className="fw-bold mb-2">{title || 'Are you sure?'}</h5>
            <p className="text-muted small mb-4">{message || 'This action cannot be undone.'}</p>
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-light px-4" onClick={onCancel}>Cancel</button>
              <button className={`btn btn-${type} px-4`} onClick={() => { onConfirm(); onCancel(); }}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
