/* Brochure Download Simulator — Premium Static Experience */

function downloadBrochure() {
  const btn = event.currentTarget;
  const originalText = btn ? btn.innerHTML : null;

  if (btn) {
    btn.innerHTML = 'Generating PDF...';
    btn.disabled = true;
  }

  // Simulate premium download generation
  setTimeout(() => {
    // Create a beautiful PDF-like text file (HTML styled as brochure)
    const brochureContent = `
Kai Lennox | Elite Performance Coaching
THE 2026 PERFORMANCE GUIDE

A complete 28-page blueprint to building elite physical and mental performance.

SECTION 01 — THE FOUNDATION
• Precision Assessment Protocol
• Movement & Biomechanical Audit
• Blood Biomarker Analysis

SECTION 02 — THE LENNox METHOD
• Custom Architecture Framework
• Weekly Iteration Cycles
• Recovery & Longevity Systems

SECTION 03 — CLIENT RESULTS
• Average 31% Strength Gains
• 94% Long-term Retention
• 17 Countries

SECTION 04 — PROGRAMS
• Elite Performance — €7,200
• Power & Strength — €4,800
• Longevity Protocol — €5,400

To apply for a private intake:
hello@kailennox.com

© 2026 Kai Lennox Performance
`;

    const blob = new Blob([brochureContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Kai_Lennox_2026_Performance_Guide.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show toast
    showDownloadToast();

    if (btn) {
      btn.innerHTML = originalText || 'Download Guide';
      btn.disabled = false;
    }
  }, 950);
}

function showDownloadToast() {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #181818; border: 1px solid #C9A96E;
    color: #F2F0E9; padding: 13px 26px; border-radius: 9999px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.45);
    font-size: 0.9rem; display: flex; align-items: center; gap: 12px;
    z-index: 9999;
  `;
  toast.innerHTML = `
    <span>✓ Guide downloaded. Thank you.</span>
    <button onclick="this.parentElement.remove()" style="background:none; border:none; color:#C9A96E; font-size:1rem; cursor:pointer; margin-left:8px;">×</button>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast && toast.parentElement) toast.parentElement.removeChild(toast);
  }, 3800);
}

// Expose to global
window.downloadBrochure = downloadBrochure;