import jwt from "jsonwebtoken";

// Use uma chave secreta forte em produção (coloque no .env)
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_super_segura_aqui";
const JWT_EXPIRES_IN = "7d"; // Token expira em 7 dias

export interface TokenPayload {
  id: string;
  email: string;
  matricula: string;
}

/**
 * Gera um token JWT para o usuário
 */
export function gerarToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verifica e decodifica um token JWT
 */
export function verificarToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error("Token inválido ou expirado");
  }
}
