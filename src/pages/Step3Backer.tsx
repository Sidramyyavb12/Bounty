// src/pages/Step3Backer.tsx
import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PageShell from "../components/layout/PageShell";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Toggle from "../components/ui/Toggle";
import Checkbox from "../components/ui/Checkbox";
import Button from "../components/ui/Button";
import { RootState, AppDispatch } from "../store/store";
import { updateBacker, setTermsAccepted } from "../store/bountySlice";

const MAX_NAME_LEN = 35;
const MAX_MESSAGE_LEN = 80;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"];
const MAX_FILE_BYTES = 2 * 1024 * 1024; // 2MB

export default function Step3Backer(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const backer = useSelector((s: RootState) => s.bounty.backer);
  const termsAccepted = useSelector((s: RootState) => s.bounty.terms_accepted);

  // preview stored locally (we store only filename in Redux per Option B)
  // If a preview was previously available in component state, it would be here.
  // Fallback preview image from uploaded session files (local path).
  const fallbackPreview = "/mnt/data/A_flat_digital_illustration_depicts_two_fists_bump.png";
  const initialPreview =
    // try to use an existing preview field if any (not part of slice by default)
    // otherwise if a logo filename exists, use the fallback local file (developer-provided).
    ((backer as any).logoPreview as string | undefined) ?? (backer.logo ? fallbackPreview : null);

  const [preview, setPreview] = useState<string | null>(initialPreview ?? null);
  const [localName, setLocalName] = useState<string>(backer.name ?? "");
  const [localMessage, setLocalMessage] = useState<string>(backer.message ?? "");
  const [hasBacker, setHasBacker] = useState<boolean>(!!backer.has_backer);
  const [logoFileName, setLogoFileName] = useState<string>(backer.logo ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // sync redux -> local if redux changes externally
  useEffect(() => {
    setLocalName(backer.name ?? "");
    setLocalMessage(backer.message ?? "");
    setHasBacker(!!backer.has_backer);
    setLogoFileName(backer.logo ?? "");
    // keep preview as is if already present; otherwise set fallback if filename exists
    if (!preview && backer.logo) {
      setPreview(fallbackPreview);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backer.name, backer.message, backer.has_backer, backer.logo]);

  // validators
  const validateAll = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (hasBacker) {
      if (!localName || localName.trim() === "") e.name = "Backer name is required";
      else if (localName.length > MAX_NAME_LEN) e.name = `Name must be <= ${MAX_NAME_LEN} characters`;

      if (!logoFileName) e.logo = "Backer logo is required";
      // preview is local-only; presence of preview implies file was chosen successfully
      if (!preview) e.logoPreview = "Please upload a valid logo file";

      if (!termsAccepted) e.terms = "You must accept the Terms & Conditions";
    } else {
      // if no backer, still require terms
      if (!termsAccepted) e.terms = "You must accept the Terms & Conditions";
    }

    if (localMessage && localMessage.length > MAX_MESSAGE_LEN) {
      e.message = `Message must be <= ${MAX_MESSAGE_LEN} characters`;
    }

    return e;
  };

  // will dispatch redux updates for backer fields (name/logo/message/has_backer)
  const persistBackerField = (field: "name" | "logo" | "message" | "has_backer", value: any) => {
    if (field === "has_backer") {
      setHasBacker(Boolean(value));
      dispatch(updateBacker({ has_backer: Boolean(value) }));
    } else {
      dispatch(updateBacker({ [field]: value } as any));
    }
  };

  // handles file selection: validates type/size, sets preview locally, stores filename in redux
  const handleLogoFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, logo: "Unsupported file type. Use png / jpg / svg / webp." }));
      return;
    }

    // validate size
    if (file.size > MAX_FILE_BYTES) {
      setErrors((prev) => ({ ...prev, logo: "File too large. Max 2MB allowed." }));
      return;
    }

    // create preview URL
    const url = URL.createObjectURL(file);
    setPreview(url);

    // store only file name in redux as per Option B
    setLogoFileName(file.name);
    persistBackerField("logo", file.name);

    // clear any logo-related errors
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.logo;
      delete copy.logoPreview;
      return copy;
    });
  };

  // remove preview & redux entry
  const handleRemoveLogo = () => {
    setPreview(null);
    setLogoFileName("");
    persistBackerField("logo", "");
    // also clear any logo errors
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.logo;
      delete copy.logoPreview;
      return copy;
    });
  };

  const handleNext = () => {
    const e = validateAll();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // focus first invalid element
      if (e.name) {
        const el = document.querySelector("input[name='backer-name']") as HTMLInputElement | null;
        el?.focus();
      }
      return;
    }

    // persist name/message/has_backer to redux
    persistBackerField("name", localName.trim());
    persistBackerField("message", localMessage.trim());
    persistBackerField("has_backer", hasBacker);

    // terms already persisted via dispatch when changed
    // navigate to next step (step-4 as in your flow)
    navigate("/step-3");
  };

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto">
        <div className="mt-4 m-3">
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#111" }}>
            Does the bounty have a sponsor or backer?
          </h2>

          <p className="text-muted mb-4" style={{ fontSize: "15px", fontWeight: 500 }}>
            Select this option if you wish to display the bounty sponsor/backer’s logo and name on the bounty.
          </p>

          <div className="mb-3">
            <Toggle
              checked={hasBacker}
              onChange={(v) => {
                setHasBacker(v);
                persistBackerField("has_backer", v);
                // clear backer-specific errors when toggling off
                if (!v) setErrors((p) => ({ ...p, name: undefined, logo: undefined, logoPreview: undefined }));
              }}
              label=""
            />
          </div>
        </div>

        <div
          className="p-4 p-md-5"
          style={{
            background: "#FAFAFA",
            border: "1px solid #e5e5e5",
            borderRadius: "16px",
          }}
        >
          {hasBacker && (
            <>
              {/* NAME */}
              <div className="mb-4">
                <label style={{ fontSize: "20px", fontWeight: 700, color: "#333" }}>
                  Enter sponsor or backer’s name *
                </label>
                <Input
                  name="backer-name"
                  value={localName}
                  onChange={(e) => {
                    const v = e.target.value;
                    setLocalName(v);
                    // optimistic persist
                    persistBackerField("name", v);
                    // clear name error as user types
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.name;
                      return copy;
                    });
                  }}
                  placeholder="Mention the name shown on bounties & certificates"
                  maxLength={MAX_NAME_LEN}
                />
                <div className="text-muted small mt-1">({localName.length}/{MAX_NAME_LEN})</div>
                {errors.name && <div className="text-danger mt-1" style={{ fontSize: 13 }}>{errors.name}</div>}
              </div>

              {/* UPLOAD LOGO */}
              <div className="mb-4">
                <label style={{ fontSize: "20px", fontWeight: 700, color: "#333" }}>
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

                      <div className="text-muted" style={{ fontSize: "14px" }}>Click to choose a logo to upload</div>
                      <div className="text-muted mt-1" style={{ fontSize: "12px" }}>Max file size: 2MB (ideal: 512×512px)</div>

                      <input
                        type="file"
                        accept={ALLOWED_TYPES.join(",")}
                        className="d-none"
                        onChange={handleLogoFile}
                      />
                    </label>
                  ) : (
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
                        <span className="text-muted">{logoFileName || backer.logo}</span>
                      </div>

                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-light rounded-circle border"
                          style={{ width: 36, height: 36 }}
                          onClick={handleRemoveLogo}
                          aria-label="Remove logo"
                        >
                          ✕
                        </button>

                        <label
                          className="btn btn-light rounded-circle border"
                          style={{ width: 36, height: 36, cursor: "pointer" }}
                        >
                          ✎
                          <input
                            type="file"
                            accept={ALLOWED_TYPES.join(",")}
                            className="d-none"
                            onChange={handleLogoFile}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {errors.logo && <div className="text-danger mt-1" style={{ fontSize: 13 }}>{errors.logo}</div>}
                {errors.logoPreview && <div className="text-danger mt-1" style={{ fontSize: 13 }}>{errors.logoPreview}</div>}
              </div>

              {/* MESSAGE */}
              <div className="mb-4">
                <label style={{ fontSize: "20px", fontWeight: 700, color: "#333" }}>
                  Enter Sponsor Message
                </label>

                <Textarea
                  rows={3}
                  placeholder="Add sponsor message if any, optional"
                  value={localMessage}
                  onChange={(e) => {
                    const v = e.target.value;
                    setLocalMessage(v);
                    persistBackerField("message", v);
                    // clear message error
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.message;
                      return copy;
                    });
                  }}
                  maxLength={MAX_MESSAGE_LEN}
                />

                <div className="text-muted small mt-1">({localMessage.length}/{MAX_MESSAGE_LEN})</div>
                {errors.message && <div className="text-danger mt-1" style={{ fontSize: 13 }}>{errors.message}</div>}
              </div>
            </>
          )}
        </div>

        {/* TERMS CARD */}
        <div
          className="p-4 p-md-5 mt-4"
          style={{ background: "#FAFAFA", border: "1px solid #e5e5e5", borderRadius: "16px" }}
        >
          <h4 style={{ fontSize: "20px", fontWeight: 700 }}>Terms & Conditions</h4>

          <p className="text-muted mt-1" style={{ fontSize: "14px" }}>
            By creating this bounty, you confirm that all provided information is accurate and you agree to the platform's Terms.
          </p>

          <div className="d-flex align-items-center gap-3">
            <Checkbox
              checked={termsAccepted}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                const checked = ev.target.checked;
                dispatch(setTermsAccepted(checked));
                // clear terms error if accepted
                if (checked) setErrors((p) => ({ ...p, terms: undefined }));
              }}
              label="I have read and accept the Terms & Conditions"
            />
          </div>
          {errors.terms && <div className="text-danger mt-2" style={{ fontSize: 13 }}>{errors.terms}</div>}
        </div>

        {/* ACTIONS */}
        <div className="d-flex justify-content-between mt-4">
          <Button variant="ghost" onClick={() => navigate("/step-1")}></Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={Object.keys(validateAll()).length > 0}
          >
            Next
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
