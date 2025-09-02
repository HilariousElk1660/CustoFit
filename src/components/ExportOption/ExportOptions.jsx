import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./ExportOptions.css";
import { DownloadIcon } from "../../assets/Icons.jsx";

const ExportOptions = ({ hoodieColor }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState("pdf");

  const targetSelector = ".studio-3d-model";

  const generateCanvas = async (scale = 2) => {
    const target = document.querySelector(targetSelector);
    if (!target) return null;

    return await html2canvas(target, {
      scale,
    });
  };

  const generatePreview = async () => {
    const canvas = await generateCanvas(1.5);
    if (canvas) setPreviewUrl(canvas.toDataURL("image/png"));
  };

  const handleExport = async () => {
    setIsExporting(true);
    const canvas = await generateCanvas(2);
    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");

    switch (exportFormat) {
      case "pdf": {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("custom-design.pdf");
        break;
      }
      case "png": {
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "custom-design.png";
        link.click();
        break;
      }
      case "jpeg": {
        const jpegData = canvas.toDataURL("image/jpeg", 0.95);
        const link = document.createElement("a");
        link.href = jpegData;
        link.download = "custom-design.jpg";
        link.click();
        break;
      }
      default:
        console.warn("Unsupported format:", exportFormat);
    }

    setIsExporting(false);
  };

  useEffect(() => {
    generatePreview();
  }, [hoodieColor]);

  return (
    <div className="export-options">
      <div className="item">
        <label>Preview: </label>
        {previewUrl && (
          <img
            src={previewUrl}
            style={{
              marginTop: "12px",
              borderRadius: "8px",
              maxHeight: "240px",
              objectFit: "contain",
              border: "1px solid #7c3aed",
            }}
            alt="Preview"
            className="preview-image"
          />
        )}
      </div>

      <div className="item mt-16">
        <label>Format: </label>
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
          className="export-select"
        >
          <option value="pdf">PDF</option>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
        </select>
      </div>
      <div className="panel-footer">
        <button
          className="panel-footer-button export"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <span className="spinner"></span>
          ) : (
            <>
              <DownloadIcon style={{ width: "16px", height: "16px" }} />
              Export as {exportFormat.toUpperCase()}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ExportOptions;
