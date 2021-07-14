import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor(private http:HttpClient) { }

  getPin(pin:number){
    let pin_url=`https://api.postalpincode.in/pincode/${pin}`
    return this.http.get(pin_url);
  }

  postImage(url:string,file:File){
    return this.http.post(url,file);
  }

  getWeatherData(city:string){
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=30afa386d92ad71ca4588b9093bb6ee3`
    return this.http.get(url);
  }

  postData(data:any){
    let url='http://localhost:3000/api/Registers';
    return this.http.post(url,data);
  }
  
  getData(id:any){
    let url=`http://localhost:3000/api/Registers/${id}`;
    return this.http.get(url);
  }
}
