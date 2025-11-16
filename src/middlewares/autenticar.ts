import type { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/jwtUtils";

// Estende o tipo Request do Express para incluir o usuário autenticado
declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: string;
        email: string;
        matricula: string;
      };
    }
  }
}

/**
 * Middleware de autenticação JWT
 * Verifica se o token está presente e válido
 */
export const autenticar = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Pega o token do header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    // Formato esperado: "Bearer TOKEN"
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

    // Verifica e decodifica o token
    const decoded = verificarToken(token);

    // Adiciona os dados do usuário ao request
    req.usuario = {
      id: decoded.id,
      email: decoded.email,
      matricula: decoded.matricula,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
