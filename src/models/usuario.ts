import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUsuario extends Document {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  matricula: string;
  dataCadastro: Date;
  ativo: boolean;
  compararSenha(senhaFornecida: string): Promise<boolean>;
}

const usuarioSchema = new Schema<IUsuario>({
  nome: { 
    type: String, 
    required: [true, "Nome é obrigatório"],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, "Email é obrigatório"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Email inválido"]
  },
  senha: { 
    type: String, 
    required: [true, "Senha é obrigatória"],
    minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
    select: false // não retorna senha por padrão nas consultas
  },
  cpf: { 
    type: String, 
    required: [true, "CPF é obrigatório"],
    unique: true,
    trim: true,
    match: [/^\d{11}$/, "CPF deve conter 11 dígitos"]
  },
  matricula: { 
    type: String, 
    required: [true, "Matrícula é obrigatória"],
    unique: true,
    trim: true
  },
  dataCadastro: { 
    type: Date, 
    default: Date.now 
  },
  ativo: { 
    type: Boolean, 
    default: true 
  }
});

// Middleware para hashear senha antes de salvar
usuarioSchema.pre("save", async function (next) {
  // Só hasheia se a senha foi modificada ou é nova
  if (!this.isModified("senha")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Método para comparar senha fornecida com a hasheada
usuarioSchema.methods.compararSenha = async function (
  senhaFornecida: string
): Promise<boolean> {
  return await bcrypt.compare(senhaFornecida, this.senha);
};

export const Usuario = mongoose.model<IUsuario>("Usuario", usuarioSchema);
