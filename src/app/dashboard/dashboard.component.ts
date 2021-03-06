import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';

import 'rxjs/add/operator/do';

import { DataAccessService } from '../services/data.access.service';
import { MatchCard } from '../models/match-card';
import { MatchCardOption } from '../models/match-card-option';

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    @ViewChild('editModal') public editModal: ModalDirective;

    categories: Array<string> = ['sports'];
    options: Array<MatchCardOption> = [];
    question: string = '';
    betClose: string = '';
    selectedCategory: string = '';
    currentCards: Observable<any>;

    editQuestion: string = '';
    editSelectedCategory: string = '';
    editBetClose: string = '';
    editOptions: Array<MatchCardOption> = [];
    editId: string = '';

    constructor(private dataAccess: DataAccessService) { }

    ngOnInit(): void {
        // todo - maybe want to institute debugging framework --> http://blog.angular-university.io/debug-rxjs/
        this.currentCards = this.dataAccess.getAllMatchCards()
            .do(res => console.log('current cards: ', res));
    }

    addOptionClick() {
        let matchCardOption = new MatchCardOption();
        matchCardOption.name = '';
        matchCardOption.result = '';

        this.options.push(matchCardOption);
    }

    submitCard() {
        let matchCard = new MatchCard();
        matchCard.question = this.question;
        matchCard.options = this.options;
        matchCard.category = this.selectedCategory;
        matchCard.betCloseDate = this.betClose;

        // TODO - catch and handle exception
        this.dataAccess.addNewMatchCard(matchCard);

        this.clearEntries();
    }

    pencilClick(currentCard) {
        this.editQuestion = currentCard.question;
        this.editSelectedCategory = currentCard.category;
        this.editBetClose = currentCard.betCloseDate;
        this.editOptions = currentCard.options;
        if (!currentCard.id) {
            alert('This object in the database is not up-to-date.  Will not be able to update item.  Please fix object first.');
            return;
        }
        this.editId = currentCard.id;
        this.editModal.show();
    }

    hideEditModal() {
        this.editModal.hide();
    }

    editCard() {
        let matchCard = new MatchCard();
        matchCard.question = this.editQuestion;
        matchCard.options = this.editOptions;
        matchCard.category = this.editSelectedCategory;
        matchCard.betCloseDate = this.editBetClose;
        matchCard.id = this.editId;

        this.dataAccess.updateMatchCard(matchCard);
        this.editModal.hide();
    }

    private clearEntries(): void {
        this.options = [];
        this.question = '';
        this.betClose = '';
        this.selectedCategory = '';
    }

    public brandPrimary: string = '#20a8d8';
    public brandSuccess: string = '#4dbd74';
    public brandInfo: string = '#63c2de';
    public brandWarning: string = '#f8cb00';
    public brandDanger: string = '#f86c6b';

    // dropdown buttons
    public status: { isopen: boolean } = { isopen: false };
    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    //convert Hex to RGBA
    public convertHex(hex: string, opacity: number) {
        hex = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        let rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
        return rgba;
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    // lineChart1
    public lineChart1Data: Array<any> = [
        {
            data: [65, 59, 84, 84, 51, 55, 40],
            label: 'Series A'
        }
    ];
    public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChart1Options: any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: 40 - 5,
                    max: 84 + 5,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart1Colours: Array<any> = [
        { // grey
            backgroundColor: this.brandPrimary,
            borderColor: 'rgba(255,255,255,.55)'
        }
    ];
    public lineChart1Legend: boolean = false;
    public lineChart1Type: string = 'line';

    // lineChart2
    public lineChart2Data: Array<any> = [
        {
            data: [1, 18, 9, 17, 34, 22, 11],
            label: 'Series A'
        }
    ];
    public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChart2Options: any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: 1 - 5,
                    max: 34 + 5,
                }
            }],
        },
        elements: {
            line: {
                tension: 0.00001,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart2Colours: Array<any> = [
        { // grey
            backgroundColor: this.brandInfo,
            borderColor: 'rgba(255,255,255,.55)'
        }
    ];
    public lineChart2Legend: boolean = false;
    public lineChart2Type: string = 'line';


    // lineChart3
    public lineChart3Data: Array<any> = [
        {
            data: [78, 81, 80, 45, 34, 12, 40],
            label: 'Series A'
        }
    ];
    public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChart3Options: any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart3Colours: Array<any> = [
        {
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
        }
    ];
    public lineChart3Legend: boolean = false;
    public lineChart3Type: string = 'line';


    // barChart1
    public barChart1Data: Array<any> = [
        {
            data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
            label: 'Series A'
        }
    ];
    public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
    public barChart1Options: any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 0.6,
            }],
            yAxes: [{
                display: false
            }]
        },
        legend: {
            display: false
        }
    };
    public barChart1Colours: Array<any> = [
        {
            backgroundColor: 'rgba(255,255,255,.3)',
            borderWidth: 0
        }
    ];
    public barChart1Legend: boolean = false;
    public barChart1Type: string = 'bar';

    // mainChart

    public random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public mainChartElements: number = 27;
    public mainChartData1: Array<number> = [];
    public mainChartData2: Array<number> = [];
    public mainChartData3: Array<number> = [];

    public mainChartData: Array<any> = [
        {
            data: this.mainChartData1,
            label: 'Current'
        },
        {
            data: this.mainChartData2,
            label: 'Previous'
        },
        {
            data: this.mainChartData3,
            label: 'BEP'
        }
    ];
    public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    public mainChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: function (value: any) {
                        return value.charAt(0);
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250
                }
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
        legend: {
            display: false
        }
    };
    public mainChartColours: Array<any> = [
        { //brandInfo
            backgroundColor: this.convertHex(this.brandInfo, 10),
            borderColor: this.brandInfo,
            pointHoverBackgroundColor: '#fff'
        },
        { //brandSuccess
            backgroundColor: 'transparent',
            borderColor: this.brandSuccess,
            pointHoverBackgroundColor: '#fff'
        },
        { //brandDanger
            backgroundColor: 'transparent',
            borderColor: this.brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5]
        }
    ];
    public mainChartLegend: boolean = false;
    public mainChartType: string = 'line';

    // social box charts

    public socialChartData1: Array<any> = [
        {
            data: [65, 59, 84, 84, 51, 55, 40],
            label: 'Facebook'
        }
    ];
    public socialChartData2: Array<any> = [
        {
            data: [1, 13, 9, 17, 34, 41, 38],
            label: 'Twitter'
        }
    ];
    public socialChartData3: Array<any> = [
        {
            data: [78, 81, 80, 45, 34, 12, 40],
            label: 'LinkedIn'
        }
    ];
    public socialChartData4: Array<any> = [
        {
            data: [35, 23, 56, 22, 97, 23, 64],
            label: 'Google+'
        }
    ];

    public socialChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public socialChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false,
            }],
            yAxes: [{
                display: false,
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
        legend: {
            display: false
        }
    };
    public socialChartColours: Array<any> = [
        {
            backgroundColor: 'rgba(255,255,255,.1)',
            borderColor: 'rgba(255,255,255,.55)',
            pointHoverBackgroundColor: '#fff'
        }
    ];
    public socialChartLegend: boolean = false;
    public socialChartType: string = 'line';

    // sparkline charts

    public sparklineChartData1: Array<any> = [
        {
            data: [35, 23, 56, 22, 97, 23, 64],
            label: 'Clients'
        }
    ];
    public sparklineChartData2: Array<any> = [
        {
            data: [65, 59, 84, 84, 51, 55, 40],
            label: 'Clients'
        }
    ];

    public sparklineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public sparklineChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false,
            }],
            yAxes: [{
                display: false,
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
        legend: {
            display: false
        }
    };
    public sparklineChartDefault: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: '#d1d4d7',
        }
    ];
    public sparklineChartPrimary: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: this.brandPrimary,
        }
    ];
    public sparklineChartInfo: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: this.brandInfo,
        }
    ];
    public sparklineChartDanger: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: this.brandDanger,
        }
    ];
    public sparklineChartWarning: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: this.brandWarning,
        }
    ];
    public sparklineChartSuccess: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: this.brandSuccess,
        }
    ];


    public sparklineChartLegend: boolean = false;
    public sparklineChartType: string = 'line';
}
