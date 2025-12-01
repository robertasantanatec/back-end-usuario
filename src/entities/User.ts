import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column({ type: "text" })
  fullname: string;

  @Column({ type: "text" })
  profileImage: string;

  @Column({ type: "text" })
  cpf: string;

  @Column({ type: "date" })
  birthDate: Date;

  @Column({ type: "text" })
  gender: "M" | "F";

  @Column({ type: "text" })
  phoneNumber: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  enrollmentNumber: string;

  @Column({ type: "text" })
  post: string;

  @Column({ type: "text" })
  unity: string;

  @Column({ type: "text" })
  specialization: string;

  @Column({ type: "text" })
  address: {
    postOfficeBox: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
  };

  @Column({ type: "text" })
  passwordHash: string;

  public getPasswordHash() {
    return this.passwordHash;
  }

  public setPasswordHash(passwordHash: string) {
    this.passwordHash = passwordHash;
  }

  @Column({ type: "boolean" })
  isActive: boolean;

  @CreateDateColumn({ name: "created_at", select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", select: false })
  deletedAt: Date;
}
