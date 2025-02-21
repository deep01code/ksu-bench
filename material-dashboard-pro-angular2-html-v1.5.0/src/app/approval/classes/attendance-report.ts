import {RoleCost} from './role-cost';

export class AttendanceReport {
    id:string;
    projectName:string;
    roleCost:[RoleCost]
}
/*
"attendanceReport": {
                "id": 57,
                "projectName": "B2C BAU",
                "roleCost": [
                    {
                        "id": 58,
                        "roleName": "Tester",
                        "normalManDays": 61.5,
                        "approvedWeekEnds": 0,
                        "approvedOthers": 0,
                        "totalManDays": 61.5,
                        "numberOfEmployees": 34,
                        "rate": 1395,
                        "cost": 85792.5
                    }
                ],
*/