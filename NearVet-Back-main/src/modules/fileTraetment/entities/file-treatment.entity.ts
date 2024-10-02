import { ClinicalExamination } from "src/modules/clinical-examination/entities/clinicalExamination.entity";
import { Treatment } from "src/modules/treatment/entities/treatment.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"fileTreatments"})
export class FileTreatment {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    image: string;

    @ManyToOne(() => ClinicalExamination, (clinicalExamination) => clinicalExamination.fileTreatments)
    @JoinColumn({name:"clinicalExaminationId"})
    clinicalExamination: ClinicalExamination;
    @Column("uuid")
    clinicalExaminationId:string
}
