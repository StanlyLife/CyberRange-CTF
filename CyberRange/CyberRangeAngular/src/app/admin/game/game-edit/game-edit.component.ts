import { VmService } from './../../../shared/vm.service';
import { ToastrService } from 'ngx-toastr';
import { gameCreate } from './../game-create/game-create.model';
import { GameService } from './../game.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { error } from 'selenium-webdriver';
import { GameCreateComponent } from '../game-create/game-create.component';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['../game-create/game-create.component.scss'],
})
export class GameEditComponent implements OnInit {
  editGameForm: FormGroup;
  formData: boolean = false;
  public id: number;
  //all other tasks
  tasks = {};
  //hasTasks: All the tasks connected to game
  hasTasks = {};
  //hasTasksBool: Does the game have any tasks?
  hasTasksBool = false;
  //Game categories to choose from
  categories = [
    { name: "Serious" },
    { name: "fun" },
  ];
  //Has tasksloaded
  hasTaskLoaded = false;
  //Vm template list
  vmTemplates = {};

  public gameModel: gameCreate = {
    GameId: null,
    Name: '',
    Description: '',
    Icon: '',
    IsTeamGame: false,
    IsPlayerGame: false,
    AlwaysOpen: false,
    StartDate: '0000-00-00',
    EndDate: '0000-00-00',
    State: '',
    category: 'starting value',
    hidden: false,
    passwordRequired: false,
    password: "",
    VmTemplate: "null"
  };


  constructor(
    private route: ActivatedRoute,
    private gs: GameService,
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

    this.route.queryParams.subscribe((params) => {
      this.id = +this.route.snapshot.paramMap.get('id');
      //GET GAME FOR EDITING
      this.gs.GetGame(this.id).subscribe(
        (res) => {
          console.log('Game recieved');
          console.log(res);
          this.gameModel = new gameCreate(res);
          this.gameModel.hidden = res["Hidden"];
          this.gameModel.category = res["category"];
          this.gameModel.passwordRequired = res["PasswordRequired"];
          this.gameModel.password = res["Password"];
          this.gameModel.VmTemplate = res["VmTemplate"];
          if(res["VmTemplate"]+"" == 'null'){
            this.gameModel.VmTemplate = "Null";
          }
          this.SetFormValues();
        },
        (error) => {
          console.warn('Error on edit game: ' + this.id);
          console.error(JSON.stringify(error));
        }
      );
    });
    //GET ALL TASKS
      this.gs.GetAllTasks().subscribe(res => {
        console.log("GET ALL TASKS");
        console.log(res);
        this.tasks = res;
      },
      (error) => {
        console.error("Unable to get all tasks");
      });
    //GET ALL GAMETASKS
    this.RefreshHasTasks();
  }

  //Gets all tasks connected to game
  public RefreshHasTasks = () => {
    this.gs.GetAllTasksFromGame(this.id).subscribe(res => {
      console.log("GET ALL TASKS FROM GAME");
      console.log(res);
      this.hasTasks = res;
      this.hasTasksBool = true;
      this.hasTaskLoaded = true;
    });
  }

  public SetFormValues = () => {
    console.log('Setting form values');
    this.editGameForm = new FormGroup({

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
      IsTeamGame: new FormControl(this.gameModel.IsPlayerGame, []),
      PasswordRequired: new FormControl(this.gameModel.passwordRequired, []),
      password: new FormControl(this.gameModel.password, []),
      IsPlayerGame: new FormControl(this.gameModel.IsTeamGame, []),
      StartDate: new FormControl(this.gameModel.StartDate, []),
      EndDate: new FormControl(this.gameModel.EndDate, []),
      Icon: new FormControl(this.gameModel.Icon, []),
      Category: new FormControl(this.GetCategory(), []),
      VmTemplate: new FormControl(this.gameModel.VmTemplate, []),
    });
    this.formData = true;
  };

  setNewImage(image: string): void {
    this.gameModel.VmTemplate = image + "";
  }

  public EditGame = () => {
    this.gameModel = new gameCreate(this.editGameForm.value);
    this.gameModel.GameId = this.id + '';
    console.log(this.gameModel);
    this.gs.UpdateGame(this.gameModel).subscribe(
      (res) => {
        console.log(JSON.stringify(res) == 'true');
        if (JSON.stringify(res) == 'true') {
          this.toastr.success('Game updated');
          this.router.navigate(["/admin/game"]);
        } else {
          this.toastr.warning('Game was not updated');
        }
      },
      (error) => {
        this.toastr.error('EDIT GAME ERROR!');
        console.error(error.errorMessage);
      }
    );
  };

  public DeleteGame(){

    if (confirm('Do you want to delete the game?')) {
      this.gs.DeleteGame(this.id).subscribe(res => {
        this.toastr.success("Deleted game successfully!");
        this.router.navigateByUrl("/admin/game");
      }, error => {
        this.toastr.error("Unable to delete game!");
      });
    } else {
      // Do nothing!
      this.toastr.info("The game delete was canceled");
    }

  }

  public GetCategory = () => {

    console.log('category: ');
    console.log(JSON.stringify(this.gameModel.category));
    if (this.gameModel.category == 'Serious') {
      return this.categories[0].name;
    } else {
      return this.categories[1].name;
    }
  };

  ChangeVisibility() {
    this.gameModel.hidden = !this.gameModel.hidden;
    this.gs.ChangeVisibility(this.id, this.gameModel.hidden).subscribe(res => {
      if(this.gameModel.hidden){
        this.toastr.success("The game is now hidden!");
      }else {
        this.toastr.success("The game is now public!");
      }
    },error => {
      this.gameModel.hidden = !this.gameModel.hidden;
      this.toastr.error("Unable to change visibility!");
    });
  }
}
