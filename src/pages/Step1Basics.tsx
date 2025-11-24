// src/pages/Step1Basics.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PageShell from "../components/layout/PageShell";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import MapPicker from "../components/ui/MapPicker";
import { RootState, AppDispatch } from "../store/store";
import { updateBasics } from "../store/bountySlice";
import { validateStep1 } from "../utils/validation";

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

export default function Step1Basics(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Redux basics (we confirmed values are at state.bounty.basics)
  const basics = useSelector((s: RootState) => s.bounty.basics);

  // Local controlled state mirrors redux basics for responsive inputs
  const [local, setLocal] = useState({
    title: basics.title ?? "",
    description: basics.description ?? "",
    projectTitle: basics.projectTitle ?? "",
    type: basics.type ?? "",
    dominant_core: basics.dominant_core ?? "",
    mode: basics.mode ?? "digital",
    location: basics.location ?? "",
    locationLat: basics.locationLat ?? null,
    locationLng: basics.locationLng ?? null,
    radiusKm: (basics as any).radiusKm ?? 5,
  });

  // touched controls whether we show validation errors for a field
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // validation errors object
  const [errors, setErrors] = useState<Record<string, string>>({});

  // keep local in sync when redux basics change externally
  useEffect(() => {
    setLocal((s) => ({
      ...s,
      title: basics.title ?? "",
      description: basics.description ?? "",
      projectTitle: basics.projectTitle ?? "",
      type: basics.type ?? "",
      dominant_core: basics.dominant_core ?? "",
      mode: basics.mode ?? "digital",
      location: basics.location ?? "",
      locationLat: basics.locationLat ?? null,
      locationLng: basics.locationLng ?? null,
    }));
  }, [
    basics.title,
    basics.description,
    basics.projectTitle,
    basics.type,
    basics.dominant_core,
    basics.mode,
    basics.location,
    basics.locationLat,
    basics.locationLng,
  ]);

  // helper to update local + redux together
  const updateField = (key: string, value: any) => {
    setLocal((s) => ({ ...s, [key]: value }));

    // Only update redux fields that belong to basics slice
    const payload: Partial<any> = {};
    if (key === "locationLat" || key === "locationLng") {
      // update both lat/lng if either changes
      payload.locationLat = key === "locationLat" ? value : local.locationLat;
      payload.locationLng = key === "locationLng" ? value : local.locationLng;
    } else {
      payload[key] = value;
    }

    dispatch(updateBasics(payload));
  };

  // When map changes (lat, lng, radius)
  const handleMapChange = (payload: { lat: number; lng: number; radiusKm: number }) => {
    updateField("locationLat", payload.lat);
    updateField("locationLng", payload.lng);
    updateField("radiusKm", payload.radiusKm);
    // also update textual location field used for payload
    updateField("location", `${payload.lat.toFixed(6)}, ${payload.lng.toFixed(6)}`);
  };

  // Validate local fields whenever they change
  useEffect(() => {
    const v = validateStep1({
      title: local.title,
      description: local.description,
      type: local.type,
      dominant_core: local.dominant_core,
      mode: local.mode,
      location: local.mode === "physical" ? local.location : undefined,
    } as any);
    setErrors(v);
  }, [local.title, local.description, local.type, local.dominant_core, local.mode, local.location]);

  // whether the whole step is valid
  const isStepValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handleNext = () => {
    // mark fields as touched so errors become visible
    setTouched({
      title: true,
      description: true,
      type: true,
      dominant_core: true,
      location: true,
    });

    if (!isStepValid) {
      // focus first invalid field for better UX
      if (errors.title) {
        const el = document.getElementById("bounty-title") as HTMLInputElement | null;
        el?.focus();
      }
      return;
    }

    // state already persisted to redux by updateField — navigate forward
    navigate("/step-2");
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
              <h2 className="h1 fw-bold mb-3">Bounty Assignment</h2>

              {/* Title */}
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: 20, fontWeight: 700, color: "#444" }}>
                  Bounty Assignment
                </label>
                <Input
                  id="bounty-title"
                  icon="card-text"
                  value={local.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, title: true }))}
                  placeholder="Enter a short, descriptive title (max 40 chars)"
                  maxLength={40}
                />
                {touched.title && errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: 20, fontWeight: 700, color: "#444" }}>
                  Bounty Description
                </label>
                <Textarea
                  id="bounty-description"
                  icon="card-text"
                  value={local.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, description: true }))}
                  placeholder="Briefly describe what the bounty does"
                />
                <div className="text-end text-muted small">{(local.description || "").length}/1000</div>
                {touched.description && errors.description && (
                  <div className="text-danger small mt-1">{errors.description}</div>
                )}
              </div>

              {/* Project */}
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: 20, fontWeight: 700, color: "#444" }}>
                  Project
                </label>
                <Select
                  icon="grid"
                  value={local.projectTitle}
                  onChange={(e) => updateField("projectTitle", e.target.value)}
                  options={[{ value: "", label: "Choose a project to link the bounty" }]}
                />
              </div>

              {/* Type + Impact Core */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label" style={{ fontSize: 20, fontWeight: 700, color: "#444" }}>
                    Bounty Type
                  </label>
                  <Select
                    icon="layers"
                    value={local.type}
                    onChange={(e) => {
                      updateField("type", e.target.value);
                      setTouched((t) => ({ ...t, type: true }));
                    }}
                    options={BOUNTY_TYPES}
                  />
                  {touched.type && errors.type && <div className="text-danger small mt-1">{errors.type}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label" style={{ fontSize: 20, fontWeight: 700, color: "#444" }}>
                    Dominant Impact Core
                  </label>
                  <Select
                    icon="globe2"
                    value={local.dominant_core}
                    onChange={(e) => {
                      updateField("dominant_core", e.target.value);
                      setTouched((t) => ({ ...t, dominant_core: true }));
                    }}
                    options={IMPACT_CORES}
                  />
                  {touched.dominant_core && errors.dominant_core && (
                    <div className="text-danger small mt-1">{errors.dominant_core}</div>
                  )}
                </div>
              </div>

              {/* Mode */}
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: 20, fontWeight: 700, color: "#444" }}>
                  Bounty Mode
                </label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    id="mode-digital"
                    className="form-check-input"
                    type="radio"
                    name="mode"
                    checked={local.mode === "digital"}
                    onChange={() => updateField("mode", "digital")}
                  />
                  <label className="form-check-label" style={{ fontSize: 17, fontWeight: 600 }}>
                    Digital Bounty
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    id="mode-physical"
                    className="form-check-input"
                    type="radio"
                    name="mode"
                    checked={local.mode === "physical"}
                    onChange={() => updateField("mode", "physical")}
                  />
                  <label className="form-check-label" style={{ fontSize: 17, fontWeight: 600 }}>
                    Physical Bounty
                  </label>
                </div>
              </div>

              {/* Location fields (only when physical) */}
              {local.mode === "physical" && (
                <>
                  <div className="mb-3">
                    <label className="form-label" style={{ fontSize: 20, fontWeight: 700, color: "#444" }}>
                      Enter Location
                    </label>
                    <Input
                      icon="geo-alt"
                      value={local.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, location: true }))}
                      placeholder="City / Town where the bounty is live"
                    />
                    {touched.location && errors.location && (
                      <div className="text-danger small mt-1">{errors.location}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={{ fontSize: 20, fontWeight: 700, color: "#444" }}>
                      Location Map
                    </label>

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
                        onChange={handleMapChange}
                        height="280px"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="d-flex justify-content-between mt-5">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button variant="primary" onClick={handleNext} disabled={!isStepValid}>
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
