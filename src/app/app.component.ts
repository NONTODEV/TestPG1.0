import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { DataTableComponent } from './data-table/data-table.component'
import { GenderInterface, UserInterface } from './interfaces/user.interface'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    DataTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'TestPG';

  userForm: FormGroup;

  isEditing = false;

  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  genders: GenderInterface[] = [
    { value: '', viewValue: '' },
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'unknown', viewValue: 'Unknown' },
  ]

  constructor(private _fb: FormBuilder) {
    this.userForm = this._fb.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      score: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    })
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadDataFromLocalStorage();
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value
      if (this.isEditing) {
        this.updateDataInLocalStorage(formData)
        this.isEditing = false
      } else {
        formData.id = this.generateId()
        this.saveDataToLocalStorage(formData)
      }
      this.updateDataTable()
      this.userForm.reset()
    } else {
      this.userForm.markAllAsTouched()
    }
  }

  saveDataToLocalStorage(user: UserInterface) {
    let users = JSON.parse(localStorage.getItem('users') ?? '[]')
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
  }

  loadDataFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]')
    if (this.dataTableComponent) {
      this.dataTableComponent.setData(users)
    }
  }

  onEditUser(user: UserInterface) {
    this.isEditing = true
    this.userForm.patchValue(user);
  }

  updateDataTable() {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]');
    if (this.dataTableComponent) {
      this.dataTableComponent.setData(users);
    }
  }

  updateDataInLocalStorage(updatedUser: UserInterface) {
    let users = JSON.parse(localStorage.getItem('users') ?? '[]');
    users = users.map((user: UserInterface) => user.id === updatedUser.id ? updatedUser : user)
    localStorage.setItem('users', JSON.stringify(users))
  }

  generateId(): number {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]');
    return users.length > 0 ? users[users.length - 1].id + 1 : 1;
  }
}
