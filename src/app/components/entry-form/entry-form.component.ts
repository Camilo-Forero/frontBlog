import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EntryService } from '../../service/entry.service';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  dataForm!: FormGroup;
  imgbase64?: any;
  entryObj!: any;
  snapshotArr: any = [];
  success: string = "";
  @ViewChild('idDataForm') idDataForm= {} as ElementRef;

  constructor(
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private formB:FormBuilder,
    private entry: EntryService
  ) { }

  ngOnInit(): void {
    this.dataForm = this.formB.group
    (
      {
        tittle: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        img: new FormControl('', [Validators.required])
      }
    );

    this.snapshotArr = Object.keys(this.activatedRoute.snapshot.data).length;
    
    if(this.snapshotArr != 0)
    {
      this.dataForm.addControl('status', this.formB.control(''));
      this.activatedRoute.snapshot.data['entry'].forEach((val: any)=>{
        this.entryObj = val;
        this.dataForm.get('tittle')?.setValue(this.entryObj['tittle']);
        this.dataForm.get('description')?.setValue(this.entryObj['description']);
        this.dataForm.get('status')?.setValue(this.entryObj['state']);
        this.imgbase64 = {'base':this.entryObj['image']};
        this.dataForm.get('img')?.removeValidators(Validators.required);
      });
    };
  }

  errorsApply: { [key: string]: any } =
  {
    'tittle':
    {
      'required':'Necesita este campo'
    },
    'description':
    {
      'required':'Necesita este campo'
    },
    'img':
    {
      'required':'Necesita este campo'
    },
    'status':
    {

    }
  };

  /** dev: Camilo Forero 09/07/2022
  * function that get the errors of the form control and apply the respective value of the errorsApply
  * @param val the object that contain all errors representation.
  * @param name string that contain the error of the DOM object.
  * @return stringReturn return the error found.
  */

  getErrors(val: any, name: string)
  {
    let keysErrors = (val.errors != null ? Object.keys(val.errors) : []);
    let count = 0;
    let boolean = true;
    let stringReturn = "";

    do
    {
      if(typeof this.errorsApply[name] != 'undefined' && (typeof this.errorsApply[name][keysErrors[count]] != 'undefined' && keysErrors[count] == 'required'))
      {
        boolean = false;
        stringReturn = this.errorsApply[name][keysErrors[count]];
      }
      else if(typeof this.errorsApply[name] != 'undefined' && (typeof this.errorsApply[name][keysErrors[count]] != 'undefined' && keysErrors[count] == 'minlength'))
      {
        boolean = false;
        stringReturn = this.errorsApply[name][keysErrors[count]]+': '+val.errors['minlength']['requiredLength'];
      }
      else if(typeof this.errorsApply[name] != 'undefined' && (typeof this.errorsApply[name][keysErrors[count]] != 'undefined' && keysErrors[count] == 'maxlength'))
      {
        boolean = false;
        stringReturn = this.errorsApply[name][keysErrors[count]]+': '+val.errors['maxlength']['requiredLength'];
      }
      else if(typeof this.errorsApply[name] != 'undefined' && (typeof this.errorsApply[name][keysErrors[count]] != 'undefined' && keysErrors[count] == 'ageRange'))
      {
        boolean = false;
        stringReturn = this.errorsApply[name][keysErrors[count]]+': '+val.errors['ageRange']['minimumAge'];
      }
      else if(typeof this.errorsApply[name] != 'undefined' && (typeof this.errorsApply[name][keysErrors[count]] != 'undefined' && keysErrors[count] == 'pattern'))
      {
        boolean = false;
        stringReturn = this.errorsApply[name][keysErrors[count]];
      }
      else if(typeof this.errorsApply[name][keysErrors[count]] != 'undefined' && keysErrors[count] != 'required')
      {
        boolean = false;
        stringReturn = this.errorsApply[name][keysErrors[count]];
      };

      count++;
    }
    while(count < keysErrors.length && boolean == true)

    return stringReturn;
  }

  /** dev: Camilo Forero 09/07/2022
  * procedure that apply the styles and put the returned error of the function "getErrors"
  * @param val AbstractControl that represent each element in the form.
  * @param name string that contain the name of the AbstractControl
  */
  errorsDOM(val: AbstractControl, name:string):void
  {
    let dataFormDOM = this.idDataForm.nativeElement;

    let message: string = this.getErrors(val, name);
    let domObj = dataFormDOM.querySelector('[formcontrolname="'+name+'"]');

    if(typeof domObj != 'undefined' || domObj != null)
    {
      this.renderer.addClass(domObj, 'is-invalid');

      let invalidFeedBack = domObj.parentNode.querySelector('.invalid-feedback');

      if(invalidFeedBack != null && message != '')
      {
        invalidFeedBack.innerHTML = message;
      }
      else if(invalidFeedBack != null && message == '')
      {
        invalidFeedBack.innerHTML = '';
        this.renderer.removeClass(domObj, 'is-invalid');
      }
    };
  }

  fileuploaded(event: any): void
  {
    this.extractBase64(event.target.files[0]).then((val)=>
    {
      this.imgbase64 = val;
    })
  }

  extractBase64 = async($event:any) => new Promise((res, rej)=>
  {
    try 
    {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>
      {
        res({"base":reader.result});
      };
      reader.onerror=()=>
      {
        res({"base":null});
      }

    } 
    catch (error) 
    {
      rej(error);
    };
  });

  sendData():void
  {
    console.log(this.dataForm);

    Object.keys(this.dataForm.controls).forEach((control: string, index) =>
    {
      const typedControl = this.dataForm.controls[control];
      this.errorsDOM(typedControl, control);
    });

    if(this.dataForm.status == 'VALID')
    {
      let newObj = this.dataForm.value;
      newObj['img'] = this.imgbase64['base'];

      if(this.snapshotArr != 0)
      {
        newObj['id'] = this.entryObj['id'];
        this.entry.updateEntry(newObj).forEach((val)=>{
          this.dataForm.reset();
          this.success = "Succesfully updated"
        });  
      }
      else
      {
        this.entry.postEntry(newObj).forEach((val)=>{
          this.dataForm.reset();
          this.success = "Succesfully created"
        });  
      }

    }
  }
}
