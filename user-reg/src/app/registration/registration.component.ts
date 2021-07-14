import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PinService } from '../service/pin.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm:FormGroup;
  date:Date=new Date();

  gender_:string="";
  constructor(private fb:FormBuilder,private pin:PinService,
    private rouetr:Router,private http:HttpClient,private _snackBar: MatSnackBar) { 
    this.registerForm=new FormGroup({})
    this.initializeForm()
  }

  ngOnInit(): void {
    this.datePickerId.max = new Date().toISOString().split("T")[0];
  
  }

  

  initializeForm(){
    this.registerForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      gender:['',Validators.required],
      dob:['',Validators.required],
      age:['',Validators.required], 
      address1:['',Validators.required],
      address2:[''],
      phoneNumber:['',Validators.required],
      pinCode:['',Validators.required],
      state:[''], 
      district:[''],
      image:['',Validators.required]
    })
  }
  datePickerId:any={};
  wait=false;
  get image(){
    return this.registerForm.get('image');
  }

  selected(event:any){
    this.registerForm.get('gender')?.setValue(event.target.value)
  }

  onSelectFile(event:any) { // called each time file input changes
    console.log(event)
		if (event.target.files && event.target.files[0]) {
		
				this.image?.setValue(event.target.files)
        
			var reader = new FileReader();

			reader.readAsDataURL(event.target.files[0]); // read file as data url
      
			reader.onload = (event) => { // called once readAsDataURL is completed
				this.initImage(event?.target?.result)
			}
		}
	}
  allImages:any;
  
  initImage(img:any){
    this.allImages=img;
  }
  allData:any;
  async register(){
    new Promise(async(resolve)=>{
    console.log(this.registerForm.value)
    let image=await this.uploadData(this.registerForm.value.image);
      this.allData={...this.registerForm.value};
      this.allData['image']=image;
      console.log(this.allData)
    resolve(this.allData)
    }).then((data:any)=>{
      this.pin.postData(data).subscribe((e:any)=>{
        this.rouetr.navigate(['/show'],{queryParams:{id:e.id}})
      })
    })
  }

  calculateAge(){
    let date=new Date().getTime();
    let date1=this.registerForm.get('dob')?.value;
    date1=new Date(date1).getTime();
    let age=Math.floor((date-date1)/(1000 * 60 * 60 * 24 * 365.25))
    this.registerForm.get('age')?.setValue(age);
//    console.log(this.registerForm.value)
  }

  districts(){
    let pCode=this.registerForm.get('pinCode')?.value;
    console.log(pCode)
    this.pin.getPin(pCode).subscribe((data:any)=>{
      console.log(data)
      if(data[0].Status==='Success'){
        this.registerForm.get('state')?.setValue(data[0].PostOffice[0].State);
        this.registerForm.get('district')?.setValue(data[0].PostOffice[0].District);
        console.log(this.registerForm.value)
        this.wait=true
      }else{
        this._snackBar.open('Wrong Pin Code','OK',{duration:2000})
      }
    })
  }

  uploadData(fileData: any) {
		return new Promise(resolve => {
			if (fileData) {
					this.uploadImage(fileData).subscribe((res: any) => {
						//        console.log(res)
						resolve(res.result.files.file[0].name);
					})
        }
      })
    }

      

	uploadImage(fileData:any) {
		let formData = new FormData();
		Array.from(fileData).forEach((f: any) => formData.append('file', f))
		return this.http.post('http://localhost:3000/api/Uploads/Test/upload/', formData)

  }

}
