import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule,Validators   } from '@angular/forms';
import {RecuperaPswService} from './../recupera-psw.service';
import {CambiaPswTokenService} from './../cambia-psw-token.service';
import { MuestraLoginService } from './../../muestra-login.service';
import { MuestraRecuperaPswService } from './../../muestra-recupera-psw.service';
@Component({
  selector: 'app-recupera-psw',
  templateUrl: './recupera-psw.component.html',
  styleUrls: ['./recupera-psw.component.css']
})
export class RecuperaPswComponent implements OnInit {

  public recupera_psw:FormGroup;
  public cambia_psw:FormGroup;
  public cls_email:string;
  public show_err_email:boolean;
  public mostrar_error_e_mail:boolean;
  public mostrar_msj:boolean;
  public msj:string;
  public show_envia_token:boolean;
  public cls_token:string;
  public show_err_token:boolean;
  public msj_2:string;
  public cls_psw_nueva:string;
  public show_err_psw_nueva:boolean;

  public cls_conf:string;
  public show_err_psw_conf:boolean;

  public show_err_nueva_psw:boolean;
  public mostrar_recupera_psw:boolean;
  public cargando:boolean;
  constructor(private rps: RecuperaPswService,private m_l:MuestraLoginService,private m_r_p:MuestraRecuperaPswService,private cpt:CambiaPswTokenService) { }


  ngOnInit()
  {
      this.cargando=false;
      this.m_r_p.change.subscribe(mostrar_recupera_psw=>{this.mostrar_recupera_psw=mostrar_recupera_psw});
      this.fn_reinicia_cambia_psw();
      this.fn_reinicia_envia_token();
      this.fn_reinicia_styles();
      this.fn_reinicia_styles_2();
  }
  fn_reinicia_envia_token()
  {
    this.recupera_psw=new FormGroup(
        {
            e_mail:new FormControl('')
        }
    );
  }
  fn_reinicia_cambia_psw()
  {
    this.cambia_psw=new FormGroup(
        {
          token:new FormControl(''),
          psw_nueva:new FormControl(''),
          psw_conf:new FormControl('')
        }
    );
  }
  fn_reinicia()
  {
    this.fn_reinicia_cambia_psw();
    this.fn_reinicia_envia_token();
    this.fn_reinicia_styles_2();
    this.fn_reinicia_styles();
  }
  fn_iniciar_session()
  {
    this.fn_reinicia();
    this.m_l.fn_login(true);
    this.m_r_p.fn_recupera_psw(false);
  }
  fn_cerrar()
  {
    this.fn_reinicia();
    this.m_l.fn_login(false);
    this.m_r_p.fn_recupera_psw(false);
  }

  fn_recupera_psw()
  {
      var ok=0;
      if(this.recupera_psw.value.e_mail=="")
      {
        var ok=1;
        this.show_err_email=true;
      }

      if (ok==1)
      {
        return 0;
      }
      this.cargando=true;
      this.rps.fn_recupera_psw(this.recupera_psw.value.e_mail)
      .subscribe(
        data=>
        {
          if(data[0].estatus=="0")
          {
              this.msj=data[0].msj;
              this.mostrar_error_e_mail=true;
              this.cargando=false;
          }
          else
          {
              //this.mostrar_msj=true;
              this.fn_reinicia_styles();
              this.recupera_psw.value.e_mail="";
              this.show_envia_token=false;
              this.cargando=false;
              //setInterval(()=>{this.fn_oculta_msj();},3000);
          }
        }
      );
  }
  fn_ya_tengo_token()
  {

    this.fn_reinicia();
    this.show_envia_token=false;
  }

  fn_oculta_msj()
  {
      this.mostrar_msj=false;
      clearInterval();
      this.fn_reinicia();
  }
  fn_regresa_genera_token()
  {

      this.fn_reinicia();
      this.fn_reinicia_styles();
  }
  fn_reinicia_styles()
  {
    this.cls_email="form-control";
    this.show_err_email=false;

    this.mostrar_error_e_mail=false;
    this.mostrar_msj=false;
    this.show_envia_token=true;
  }
  fn_guarda_psw()
  {
    this.fn_reinicia_styles_2();
    var ok=0;

    if (this.cambia_psw.value.token=="")
    {

      ok=1;
      this.show_err_token=true;
      this.cls_token="form-control error_form";

    }

    if(this.cambia_psw.value.psw_nueva=="")
    {
      ok=1;
      this.show_err_psw_nueva=true;
      this.cls_psw_nueva="form-control error_form";
    }

    if(this.cambia_psw.value.psw_conf=="")
    {
      ok=1;
      this.show_err_psw_conf=true;
      this.cls_conf="form-control error_form";
    }
    if(this.cambia_psw.value.psw_conf!=this.cambia_psw.value.psw_nueva)
    {
        this.show_err_nueva_psw=true;
        this.msj_2="La confirmacion de la contraseña no es igual a la contraseña.";
        ok=1;
    }

    if (ok==1)
    {
      return 0;
    }

    this.cargando=true;
    this.cpt.fn_cambia_psw_token(this.cambia_psw)
    .subscribe(
      data=>
      {
        if(data[0].estatus=="0")
        {
            this.msj_2=data[0].msj;
            this.show_err_nueva_psw=true;
            this.cargando=false;
        }
        else
        {
            this.mostrar_msj=true;
            this.msj="Tu contraseña se actualizo correctamente";
            this.cargando=false;
            setInterval(()=>{this.fn_oculta_msj();},3000);

        }
      }
    );
}

  fn_reinicia_styles_2()
  {
    this.cls_token="form-control";
    this.show_err_token=false;

    this.cls_psw_nueva="form-control";
    this.show_err_psw_nueva=false;

    this.cls_conf="form-control";
    this.show_err_psw_conf=false;

    this.show_err_nueva_psw=false;
  }
}
