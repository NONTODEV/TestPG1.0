import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { CommonModule } from '@angular/common'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { UserInterface } from '../interfaces/user.interface'

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ],
})

export class DataTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'edit',
    'firstname',
    'lastname',
    'gender',
    'score',
  ];
  dataSource = new MatTableDataSource<UserInterface>([])
  @Output() edit = new EventEmitter<UserInterface>()

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(): void {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]')
    this.dataSource.data = users
  }

  setData(data: UserInterface[]): void {
    this.dataSource.data = data
  }

  onEdit(user: UserInterface) {
    this.edit.emit(user)
  }

  getGenderDisplay(gender: string): string {
    switch (gender) {
      case 'male':
        return 'm';
      case 'female':
        return 'f';
      case 'unknow':
        return 'u';
      default:
        return '';
    }
  }

  getGenderTooltip(gender: string): string {
    switch (gender) {
      case 'male':
        return 'Male';
      case 'female':
        return 'Female';
      case 'unknow':
        return 'Unknown';
      default:
        return '';
    }
  }
}
