import { Response } from "express";

/**
 * Vérifie que tous les champs requis sont présents dans le body.
 * Retourne true si valide, false + réponse 400 si invalide.
 */
export function requireFields(
  body: Record<string, unknown>,
  fields: string[],
  res: Response,
): boolean {
  const missing = fields.filter(
    (f) => body[f] === undefined || body[f] === null,
  );
  if (missing.length > 0) {
    res
      .status(400)
      .json({ error: `Champs requis manquants : ${missing.join(", ")}` });
    return false;
  }
  return true;
}
