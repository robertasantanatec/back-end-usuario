import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_super_segura_aqui";
const JWT_EXPIRES_IN = "7d";

export interface TokenPayload {
  id: string;
  email: string;
  enrollmentNumber: string;
}

export function gerarToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verificarToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error("Token inválido ou expirado");
  }
}
