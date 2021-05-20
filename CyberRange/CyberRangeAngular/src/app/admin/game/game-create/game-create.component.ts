import { VmService } from './../../../shared/vm.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameService } from './../game.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { gameCreate } from './game-create.model';


@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit {
  errorMessage: string;
  gameCreateForm: FormGroup;
  iconFormGroup: FormGroup;
  iconCss = new FormControl();
  fallbackIcon = 'fas fa-user';
  todayUTC = new Date().toISOString().substr(0,10);
  todayLocal = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0,10);
  tomorrowLocal = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0,10);
  categories = [
    {name: "Serious"},
    {name: "fun"},
  ];
    //Vm template list
    vmTemplates = {};
  public gameModel : gameCreate  = {
    GameId: null,
    Name: '',
    Description: '',
    Icon: 'fa-cogs',
    IsTeamGame: false,
    IsPlayerGame: false,
    AlwaysOpen: false,
    StartDate: '0000-00-00',
    EndDate:'0000-00-00',
    State:'',
    category: '',
    passwordRequired: false,
    hidden: false,
    password: "",
    VmTemplate: "",
  };
  
  constructor(
    private gameService: GameService,
    private toastr: ToastrService,
    private router: Router,
    private vms: VmService
    ) { }

  ngOnInit(): void {
    this.vms.GetVmTemplates().subscribe(res => {
      this.vmTemplates = res;
    }, error => {
      this.toastr.error("unable to get vm templates");
      console.error(error);
      console.error(error.errorMessage);
    })


    this.iconFormGroup = new FormGroup({iconCss: this.iconCss});
    this.gameCreateForm = new FormGroup({
      Name: 
      new FormControl(this.gameModel.Name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]),
      Description: 
      new FormControl(this.gameModel.Description, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250)
      ]),
      AlwaysOpen: new FormControl(this.gameModel.AlwaysOpen, []),
      PasswordRequired: new FormControl(this.gameModel.passwordRequired, []),
      password: new FormControl(this.gameModel.password, []),
      IsTeamGame: new FormControl(this.gameModel.IsPlayerGame, []),
      IsPlayerGame: new FormControl(this.gameModel.IsTeamGame, []),
      StartDate: new FormControl(this.todayLocal, []),
      EndDate: new FormControl(this.tomorrowLocal, []),
      Icon: new FormControl(this.gameModel.Icon, []),
      Category: new FormControl(this.categories[0].name,[]),
      VmTemplate: new FormControl(this.gameModel.VmTemplate, []),
    });


    
  }
  onIconPickerSelect(icon: string): void {
    this.iconCss.setValue(icon);
  }
  setNewImage(image: string): void {
    this.gameModel.VmTemplate = image + "";
  }
  public CreateGame = () => {
    this.gameModel = new gameCreate(this.gameCreateForm.value);
    this.gameService.CreateGame(this.gameModel)
      .subscribe(res => {
        this.toastr.success("Game created");
        console.log(res);
        this.router.navigate(["/admin/game/edit/"+res["GameId"]]);
      },
      (error) => {
        this.errorMessage = error;
        this.toastr.error("Error on create game: ");
        console.error(JSON.stringify(error));
        this.errorMessage = "Error on create game: status - " + error.status;
      }
      );
  }



  setNewCategory(image: string): void {
    this.gameModel.category = image + "";
}

///iconpicker



}
