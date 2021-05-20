import { VmService } from './../../../shared/vm.service';
import { error } from 'selenium-webdriver';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './../task.service';
import { TaskModel } from './../task-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SelectorContext, ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['../task-create/task-create.component.scss']
})
export class TaskEditComponent implements OnInit {
  recieved = false;
  taskEditForm: FormGroup;
  public taskModel : TaskModel = {
    TaskId: null,
    Icon: "",
    Name: "asdasda",
    Description: "",
    Duration: 15,
    State: "",
    MaxPoints: 15,
    RandomFlag: false,
    Flag: "",
    TemplateName: "null", 
  };
  selectOption: string;
  vmTemplates = {};
  id:number;
  constructor(
    private ts: TaskService,
     private route: ActivatedRoute,
     private toastr: ToastrService,
     private router: Router,
     private vms: VmService,
     ) { }

  ngOnInit(): void {

    this.vms.GetVmTemplates().subscribe(res => {
      this.vmTemplates = res;
      console.log(this.vmTemplates);
    }, error => {
      this.toastr.error("unable to get vm templates");
      console.error(error);
      console.error(error.errorMessage);
    })


    this.setFormValues();
    this.id = +this.route.snapshot.paramMap.get('id');
    this.ts.GetTask(this.id).subscribe(
      res => {
        this.taskModel = new TaskModel(res);
        console.log(this.taskModel);
        this.setFormValues();
      },
      (error) => {
        console.error("Error on get task");
      });
      this.recieved = true;
  }

  public setFormValues = () => {
    this.taskEditForm = new FormGroup({
      Icon: new FormControl(this.taskModel.Icon, []),
      Name: 
      new FormControl(this.taskModel.Name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]),
      Description: 
      new FormControl(this.taskModel.Description, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250)
      ]),
      Duration: new FormControl(this.taskModel.Duration, []),
      State: new FormControl(this.taskModel.State, []),
      MaxPoints: new FormControl(this.taskModel.MaxPoints, []),
      RandomFlag: new FormControl(this.taskModel.RandomFlag, []),
      Flag: new FormControl(this.taskModel.Flag, []),
      TemplateName: new FormControl(this.taskModel.TemplateName, []),
  });
  }

  public EditTask = () => {
    console.log("Tried create task");
    this.taskModel = new TaskModel(this.taskEditForm.value);
    this.taskModel.TaskId = this.id;
    this.ts.EditTask(this.taskModel)
    .subscribe(res => {
      this.toastr.success("Task updatef");
      this.router.navigate(["/admin/task"]);
    },
    (error) => {
      this.toastr.error("Error on edit task");
      console.error(JSON.stringify(error));
    });
  }

  setNewImage(image: string): void {
    this.taskModel.TemplateName = image + "";
}

DeleteTask(){
  if(confirm("Are you sure you want to delete this task?")){
    this.ts.DeleteTask(this.id).subscribe(res => {
      this.toastr.warning("Task deleted!");
      this.router.navigate(["/admin/task"]);
    }, error => {
      this.toastr.error("ERROR: Unable to delete task");
      console.error(error);
    })
  }else{
    this.toastr.info("Task was NOT deleted");
  }
}

}
