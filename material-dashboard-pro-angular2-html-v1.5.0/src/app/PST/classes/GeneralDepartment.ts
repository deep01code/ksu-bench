import { System } from './system-domain';
export class GeneralDepartment {
    id: number;
    gdEnName: String;
    gdArName: String;
    generalDepartmentNumber: number;
    departments: Department[];
    sectionId: number;

}

export class Section {
    id: Number;
    sectionNumber: number;
    sectionEnglishName: String;
    sectionArabicName: String;
    systemDomain: System[];
}

export class Department {
    id: number;
    departmentNumber: number;
    departmentEnglishName: String;
    departmentArabicName: String;
    sections: Section[];
}
