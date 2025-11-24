import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Toggle from "../components/ui/Toggle";
import Checkbox from "../components/ui/Checkbox";
import Button from "../components/ui/Button";
import { useBounty } from "../context/BountyContext";
import { validateStep3 } from "../utils/validation";

export default function Step3Backer() {
  const { data, update } = useBounty();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [preview, setPreview] = useState<string | null>(
    data.backer.logoPreview || null
  );

  const setBackerField = (
    field: "name" | "logo" | "message" | "logoPreview",
    value: any
  ) => {
    update({
      backer: {
        ...data.backer,
        [field]: value,
      },
    });
  };

  const handleLogoFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setBackerField("logoPreview", url);
    setBackerField("logo", file.name); // store actual file name
  };

  const handleNext = () => {
    const errs = validateStep3(data);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      navigate("/step-4");
    }
  };

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
         <div className="mt-4 m-3">
        <h2
          className="mb-2"
          style={{ fontSize: "28px", fontWeight: 700, color: "#111" }}
        >
          Does the bounty have a sponsor or backer?
        </h2>

        <p className="text-muted mb-4" style={{ fontSize: "15px", fontWeight:500 }}>
          Select this option if you wish to display the bounty sponsor/backer’s
          logo and name on the bounty.
        </p>

        {/* TOGGLE */}
       
  <Toggle
    checked={data.has_backer}
    onChange={(val) => update({ has_backer: val })}
    label=""
  />
</div>

        {/* CARD */}
        <div
          className="p-4 p-md-5"
          style={{
            background: "#FAFAFA",
            border: "1px solid #e5e5e5",
            borderRadius: "16px",
          }}
        >
          {data.has_backer && (
            <>

              {/* NAME FIELD */}
              <div className="mb-4">
                <label
                  style={{ fontSize: "20px", fontWeight: 700, color: "#333" }}
                >
                  Enter sponsor or backer’s name *
                </label>

                <Input
                  value={data.backer.name}
                  onChange={(e) => setBackerField("name", e.target.value)}
                  placeholder="Mention the name shown on bounties & certificates"
                  maxLength={35}
                />

                <div className="text-muted small mt-1">
                  ({data.backer.name.length}/35)
                </div>
              </div>

              {/* UPLOAD LOGO */}
              <div className="mb-4">
                <label
                  style={{ fontSize: "20px", fontWeight: 700, color: "#333" }}
                >
                  Upload sponsor or backer’s logo *
                </label>

                <div
                  className="mt-2 p-4"
                  style={{
                    border: "2px dashed #c8c8c8",
                    borderRadius: "16px",
                    background: "#fff",
                  }}
                >
                  {!preview ? (
                    // Upload Box
                    <label
                      className="w-100 d-flex flex-column justify-content-center align-items-center"
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="d-flex justify-content-center align-items-center mb-2"
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          border: "2px solid #ddd",
                          fontSize: "28px",
                        }}
                      >
                        +
                      </div>

                      <div className="text-muted" style={{ fontSize: "14px" }}>
                        Click to choose a logo to upload
                      </div>

                      <div
                        className="text-muted mt-1"
                        style={{ fontSize: "12px" }}
                      >
                        Max file size: 2MB (ideal: 512×512px)
                      </div>

                      <input
                        type="file"
                        className="d-none"
                        onChange={handleLogoFile}
                      />
                    </label>
                  ) : (
                    // Preview Box
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={preview}
                          alt="logo-preview"
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: "12px",
                            objectFit: "cover",
                          }}
                        />
                        <span className="text-muted">{data.backer.logo}</span>
                      </div>

                      <div className="d-flex gap-3">
                        {/* DELETE BUTTON */}
                        <button
                          type="button"
                          className="btn btn-light rounded-circle border"
                          style={{ width: 36, height: 36 }}
                          onClick={() => {
                            setPreview(null);
                            setBackerField("logo", "");
                            setBackerField("logoPreview", "");
                          }}
                        >
                          ✕
                        </button>

                        {/* EDIT BUTTON */}
                        <label
                          className="btn btn-light rounded-circle border"
                          style={{
                            width: 36,
                            height: 36,
                            cursor: "pointer",
                          }}
                        >
                          ✎
                          <input
                            type="file"
                            className="d-none"
                            onChange={handleLogoFile}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* MESSAGE */}
              <div className="mb-4">
                <label
                  style={{ fontSize: "20px", fontWeight: 700, color: "#333" }}
                >
                  Enter Sponsor Message
                </label>

                <Textarea
                  rows={3}
                  placeholder="Add sponsor message if any, optional"
                  value={data.backer.message}
                  onChange={(e) => setBackerField("message", e.target.value)}
                />

                <div className="text-muted small mt-1">
                  ({(data.backer.message || "").length}/80)
                </div>
              </div>
            </>
          )}
        </div>

        {/* TERMS CARD */}
        <div
          className="p-4 p-md-5 mt-4"
          style={{
            background: "#FAFAFA",
            border: "1px solid #e5e5e5",
            borderRadius: "16px",
          }}
        >
          <h4 style={{ fontSize: "20px", fontWeight: 700 }}>Terms & Conditions</h4>

          <p className="text-muted mt-1" style={{ fontSize: "14px" }}>
            By creating this bounty, you confirm that all provided information is
            accurate and you agree to the platform's Terms.
          </p>

          <Checkbox
            checked={data.terms_accepted}
            onChange={(v) => update({ terms_accepted: v })}
            label="I have read and accept the Terms & Conditions"
          />
        </div>

        {/* BUTTONS */}
        <div className="d-flex justify-content-between mt-4">
          <Button variant="ghost" onClick={() => navigate("/step-2")}>
            Back
          </Button>

          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
