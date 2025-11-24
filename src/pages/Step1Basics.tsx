import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import { useBounty } from "../context/BountyContext";
import { validateStep1 } from "../utils/validation";
import MapPicker from "../components/ui/MapPicker";
const BOUNTY_TYPES = [
  { value: "", label: "Choose category" },
  { value: "Content", label: "Content" },
  { value: "Design", label: "Design" },
  { value: "Development", label: "Development" },
  { value: "Marketing", label: "Marketing" },
  { value: "Other", label: "Other" },
];

const IMPACT_CORES = [
  { value: "", label: "Choose core" },
  { value: "Water", label: "Water" },
  { value: "Earth", label: "Earth" },
  { value: "Social", label: "Social" },
  { value: "Energy", label: "Energy" },
];

export default function Step1Basics() {
  const { data, update } = useBounty();
  const navigate = useNavigate();

  const [local, setLocal] = useState({
    title: data.title ?? "",
    description: data.description ?? "",
    type: data.type ?? "",
    dominant_core: data.dominant_core ?? "",
    mode: data.mode ?? "digital",
    location: data.location ?? "",
    projectTitle: data.projectTitle ?? "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setErrors(validateStep1(local));
  }, [local]);

  const onChange = (k: string, v: any) => {
    setLocal((s) => ({ ...s, [k]: v }));
    update({ [k]: v } as any);
  };

  const handleNext = () => {
    const errs = validateStep1(local);
    setErrors(errs);
    setTouched({ title: true, description: true });
    if (Object.keys(errs).length === 0) {
      update(local);
      navigate("/step-2");
    }
  };

  return (
    <PageShell>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">

            <div
              className="p-4 p-md-5 mb-4"
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E5E5E5",
                maxWidth: "100%",
                margin: "0 auto",
              }}
            >

              <h2 className="h1 fw-bold mb-3">Bounty Title</h2>

              {/* DESCRIPTION */}
              <div className="mb-3">
                <label className="form-label"
                  style={{ fontSize: "20px", fontWeight: 700, color: "#444" }}>
                  Bounty Description
                </label><i className="bi bi-exclamation-circle"></i>


                <Textarea
                  icon="bi-card-text"
                  value={local.description}
                  onChange={(e) => onChange("description", e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, description: true }))}
                  placeholder="Briefly describe what the bounty does"
                />

                <div className="text-end text-muted small">
                  {local.description.length}/1000
                </div>
              </div>

              {/* PROJECT */}
              <div className="mb-3">
                <label className="form-label"
                  style={{ fontSize: "20px", fontWeight: 700, color: "#444" }}>
                  Project
                </label>

                <Select
                  icon="bi-grid"
                  value={local.projectTitle}
                  onChange={(e) => onChange("projectTitle", e.target.value)}
                  options={[
                    { value: "", label: "Choose a project to link the bounty" },
                  ]}
                />
              </div>

              {/* TYPE + IMPACT */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label"
                    style={{ fontSize: "20px", fontWeight: 700, color: "#444" }}>
                    Bounty Type
                  </label><i className="bi bi-exclamation-circle"></i>


                  <Select
                    icon="bi-layers"
                    value={local.type}
                    onChange={(e) => onChange("type", e.target.value)}
                    options={BOUNTY_TYPES}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label"
                    style={{ fontSize: "20px", fontWeight: 700, color: "#444" }}>
                    Dominant Impact Core
                  </label><i className="bi bi-exclamation-circle"></i>


                  <Select
                    icon="bi-globe2"
                    value={local.dominant_core}
                    onChange={(e) => onChange("dominant_core", e.target.value)}
                    options={IMPACT_CORES}
                  />
                </div>
              </div>

              {/* MODE */}
              <div className="mb-3">
                <label className="form-label"
                  style={{ fontSize: "20px", fontWeight: 700, color: "#444" }}>
                  Bounty Mode
                </label><i className="bi bi-exclamation-circle"></i>

                <br />

                <div className="form-check form-check-inline">
                  <input
                    id="mode-digital"
                    className="form-check-input"
                    type="radio"
                    checked={local.mode === "digital"}
                    onChange={() => onChange("mode", "digital")}
                  />
                  <label className="form-check-label"
                    style={{ fontSize: "17px", fontWeight: 600 }}>
                    Digital Bounty
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    id="mode-physical"
                    className="form-check-input"
                    type="radio"
                    checked={local.mode === "physical"}
                    onChange={() => onChange("mode", "physical")}
                  />
                  <label className="form-check-label"
                    style={{ fontSize: "17px", fontWeight: 600 }}>
                    Physical Bounty
                  </label>
                </div>
              </div>

              {/* LOCATION */}
              {local.mode === "physical" && (
                <div className="mb-3">
                  <label className="form-label"
                    style={{ fontSize: "20px", fontWeight: 700, color: "#444" }}>
                    Enter Location
                  </label><i className="bi bi-exclamation-circle"></i>


                  <Input
                    icon="bi-geo-alt"
                    value={local.location}
                    onChange={(e) => onChange("location", e.target.value)}
                    placeholder="City / Town where the bounty is live"
                  />
                </div>
              )}
             {local.mode === "physical" && (
  <div className="mb-3">
    <label
      className="form-label"
      style={{ fontSize: "20px", fontWeight: 700, color: "#444" }}
    >
      Location Map
    </label>

    {/* FIX: WRAP MAP IN A BLOCK WITH FIXED HEIGHT */}
    <div
      style={{
        height: "280px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #E5E5E5",
      }}
    >
      <MapPicker
        lat={local.locationLat ?? 12.9716}
        lng={local.locationLng ?? 77.5946}
        radiusKm={local.radiusKm ?? 5}
        onChange={({ lat, lng, radiusKm }) => {
          onChange("locationLat", lat);
          onChange("locationLng", lng);
          onChange("radiusKm", radiusKm);
          onChange("location", `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }}
        height="280px" // ensures MapContainer uses correct height
      />
    </div>
  </div>
)}


              {/* BUTTONS */}
              <div className="d-flex justify-content-between mt-5">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                  Back
                </Button>

                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={Object.keys(errors).length > 0}
                >
                  Next
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
