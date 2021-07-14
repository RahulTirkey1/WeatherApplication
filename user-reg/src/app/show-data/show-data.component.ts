import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { PinService } from '../service/pin.service';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  showData:any;
  allData:any;
  id:any;
  loaded1=false;
  urlImage='http://localhost:3000/api/Uploads/Test/download/';
  constructor(private pinService:PinService,public route: ActivatedRoute,public dialog: MatDialog) { 
    this.id=this.route.snapshot.queryParamMap.get('id');
    this.callApi()
  }

  ngOnInit(): void {
  }

  callApi(){
    this.pinService.getData(this.id).subscribe((data:any)=>{
      this.allData=data;
      let state=this.allData.state;
      this.show(state)
    })
  }

  show(data:any){
    this.pinService.getWeatherData(data).subscribe((el:any)=>{
      this.showData=el;
      this.showData['isDay']=true
      console.log(this.showData)
      let sunsetTime = new Date(this.showData.sys.sunset * 1000);
      this.showData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.showData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.showData.temp_celcius = (this.showData.main.temp - 273.15).toFixed(0);
    this.showData.temp_min = (this.showData.main.temp_min - 273.15).toFixed(0);
    this.showData.temp_max = (this.showData.main.temp_max - 273.15).toFixed(0);
    this.showData.temp_feels_like = (this.showData.main.feels_like - 273.15).toFixed(0);
      this.loaded1=true;
    })
  }

  weather(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '270px',
      data :this.showData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  

}
