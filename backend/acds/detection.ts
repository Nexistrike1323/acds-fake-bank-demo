export interface DetectionResult {
  attack_detected: boolean;
  type: "SQLI" | "XSS" | "RECON" | null;
}

export function inspectRequest(req: { body: any; url: string }): DetectionResult {
  const url = req.url.toLowerCase();
  const bodyString = JSON.stringify(req.body || {}).toLowerCase();

  // SQL Injection Detection
  const sqlPatterns = ["' or 1=1", "union select"];
  if (sqlPatterns.some(p => url.includes(p) || bodyString.includes(p))) {
    return { attack_detected: true, type: "SQLI" };
  }

  // XSS Detection
  const xssPatterns = ["<script>"];
  if (xssPatterns.some(p => url.includes(p) || bodyString.includes(p))) {
    return { attack_detected: true, type: "XSS" };
  }

  // Recon Detection
  const reconPatterns = ["/admin", "/.env"];
  if (reconPatterns.some(p => url.includes(p))) {
    return { attack_detected: true, type: "RECON" };
  }

  return { attack_detected: false, type: null };
}
