import type { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/jwtUtils";

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: string;
        email: string;
        enrollmentNumber: string;
      };
    }
  }
}

export const autenticar = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      res.status(401).json({ error: "Token mal formatado" });
      return;
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({ error: "Token mal formatado" });
      return;
    }

    const decoded = verificarToken(token);

    req.usuario = {
      id: decoded.id,
      email: decoded.email,
      enrollmentNumber: decoded.enrollmentNumber,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
