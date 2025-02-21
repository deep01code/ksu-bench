import {AttendanceReport} from './attendance-report';

export class Workflow {
    id:string;
    reportPath:string;
    attendanceReport:AttendanceReport;
    currentBudget: string;
    currentCost: string;
    startDate:string;
    endDate: string;
}
/*
{
            "id": 56,
            "pendingState": {
                "id": 65
            },
            "costApprovedState": {
                "id": 63
            },
            "costRejectedState": {
                "id": 64
            },
            "invoiceNotPaidState": {
                "id": 66
            },
            "invoicePaidState": {
                "id": 67
            },
            "currentState": {
                "id": 65
            },
            "reportPath": "/tmp2/56_fromJSON.csv",
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
                "currentBudget": 41234,
                "currentCost": 355635,
                "startDate": null,
                "endDate": "05/09/2018",
                "rawData": []
            },
            "links": [
                {
                    "rel": "self",
                    "href": "http://172.20.214.180:7180/workflowservice/attendance_workflow/56",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                },
                {
                    "rel": "approveCost",
                    "href": "http://172.20.214.180:7180/workflowservice/approveCost/56",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                },
                {
                    "rel": "rejectCost",
                    "href": "http://172.20.214.180:7180/workflowservice/rejectCost/56",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                },
                {
                    "rel": "payInvoice",
                    "href": "http://172.20.214.180:7180/workflowservice/payInvoice/56",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                }
            ]
        }
*/