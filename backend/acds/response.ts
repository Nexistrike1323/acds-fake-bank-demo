import { DetectionResult } from "./detection";

export type Action = "BLOCK" | "HONEYPOT" | "ALLOW";

export function processResponse(ip: string, result: DetectionResult): Action {
  if (!result.attack_detected) {
    return "ALLOW";
  }

  switch (result.type) {
    case "SQLI":
      return "BLOCK";
    case "XSS":
      return "BLOCK";
    case "RECON":
      return "HONEYPOT";
    default:
      return "ALLOW";
  }
}
