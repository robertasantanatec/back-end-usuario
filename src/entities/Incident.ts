import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Incident {
  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column({ type: "text" })
  fullname: string;

  @Column({ type: "text" })
  firstPhoneNumber: string;

  @Column({ type: "text" })
  secondPhoneNumber?: string;

  @Column({ type: "text" })
  observations: string;

  @Column({ type: "text" })
  incidentType: string;

  @Column({ type: "text" })
  associatedTeam: string;

  @Column({ type: "text" })
  status: string;

  @Column({ type: "date" })
  dateTime: Date;

  @CreateDateColumn({ name: "created_at", select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", select: false })
  deletedAt: Date;
}
