import { useState } from 'react';
import { VALID_CERTS } from '../data/homeContent';

export default function CertificateVerify() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);

  const verify = () => {
    const key = id.trim().toUpperCase();
    const c = VALID_CERTS[key];
    if (c) {
      setResult({ ok: true, text: `✓ Valid certificate — ${c.name} · ${c.course} · Issued ${c.date}` });
    } else if (!key) {
      setResult({ ok: false, text: 'Please enter a certificate ID.' });
    } else {
      setResult({ ok: false, text: 'Certificate ID not found. Try ST-2025-08421 for a demo.' });
    }
  };

  return (
    <div className="verify-box fade-up" style={{ marginTop: 44 }}>
      <div>
        <h4>Verify Course Completion Certificate</h4>
        <p>Employers can verify Shiv Tatva course certificates (issued on program completion) using the certificate ID or QR code.</p>
        <div className="verify-input">
          <input
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && verify()}
            placeholder="Enter certificate ID (e.g. ST-2025-08421)"
          />
          <button type="button" onClick={verify}>Verify</button>
        </div>
        {result && (
          <div className={`verify-result ${result.ok ? 'ok' : 'err'}`} style={{ display: 'block' }}>
            {result.text}
          </div>
        )}
      </div>
      <div className="verify-demo">
        <div className="qr">📱</div>
        <div className="lbl">Scan QR on your course certificate</div>
      </div>
    </div>
  );
}
