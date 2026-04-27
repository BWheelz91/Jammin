function monthlyPayment(amount, apr, months) {
  const r = apr / 100 / 12;
  if (!r) return amount / months;
  return (amount * r) / (1 - Math.pow(1 + r, -months));
}

function updateLoanEstimate() {
  const amount = Number(document.getElementById('loanAmount')?.value || 0);
  const apr = Number(document.getElementById('loanApr')?.value || 0);
  const months = Number(document.getElementById('loanMonths')?.value || 1);
  const payment = monthlyPayment(amount, apr, months);
  const output = document.getElementById('loanEstimate');
  if (output) output.textContent = `Estimated Payment: $${payment.toFixed(2)}/mo`;
}

['loanAmount','loanApr','loanMonths'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateLoanEstimate);
});
updateLoanEstimate();

const builderForm = document.getElementById('builderForm');
if (builderForm) {
  builderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(builderForm);
    const feet = Number(data.get('linearFeet') || 0);
    const gates = Number(data.get('gates') || 0);

    let basePerFoot = 22;
    const style = String(data.get('style'));
    if (style.includes('Continuous')) basePerFoot = 26;
    if (style.includes('Panel')) basePerFoot = 30;

    let addOnCost = 0;
    const addons = String(data.get('addons'));
    if (addons.includes('Stalls')) addOnCost += 4800;
    if (addons.includes('Round Pen')) addOnCost += 3400;
    if (addons.includes('Arena')) addOnCost += 12500;

    const estimate = feet * basePerFoot + gates * 550 + addOnCost;
    const result = document.getElementById('builderResult');
    if (result) {
      result.innerHTML = `<h3>Estimated Project Range: $${(estimate * 0.9).toFixed(0)} - $${(estimate * 1.15).toFixed(0)}</h3>
      <p>Next Step: book a consult and confirm measurements for a final quote.</p>
      <a class="btn" href="#lead-form">Book Appointment</a>`;
    }
  });
}
