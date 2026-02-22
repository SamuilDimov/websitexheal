export default function MedicalDisclaimer() {
  return (
    <div
      className="rounded-[12px] p-[16px] mt-[32px] border border-xlight-blue-low/50"
      style={{ fontSize: "13px", color: "#141933b3", backgroundColor: "#f8f8fa" }}
    >
      <p className="leading-[1.5]">
        <strong style={{ color: "#141933" }}>Medical disclaimer:</strong> This
        content is for informational purposes only and does not constitute
        medical advice. Always consult your healthcare provider before making
        changes to your health routine, medications, or treatment plan. xHeal is
        a health tracking and awareness tool, not a diagnostic or treatment
        platform.
      </p>
    </div>
  );
}
