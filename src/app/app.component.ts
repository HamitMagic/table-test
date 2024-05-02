import {
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { data, headerStringList } from './shared/mockData';
import { CommonModule } from '@angular/common';
import { ModalService } from './shared/modal/modal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'table';
  public inputText: string = '';
  public data = data;
  public headerStringList = headerStringList;
  public isChecked = false;
  private parent: string = '';
  @ViewChild('search', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  constructor(private modalService: ModalService) {}

  openDialog(view: TemplateRef<Element>, parent: string) {
    this.parent = parent;
    this.modalService.open(this.vcr, view, {
      animations: {
        modal: {
          enter: 'enter-scaling 0.3s ease-out',
          leave: 'fade-out 0.1s forwards',
        },
        overlay: {
          enter: 'fade-in 1s',
          leave: 'fade-out 0.3s forwards',
        },
      },
      size: {
        width: '40rem',
      },
    });
  }

  close() {
    this.modalService.close();
  }
  clear() {
    this.inputText = '';
    this.data = data;
  }

  filter(event: string) {
    console.log(this.parent)
    this.data = data.filter((el) => 
      el[this.parent]?.toString().includes(event));
  }
  setChecked() {
    this.isChecked = !this.isChecked;
    if (this.isChecked)
      this.data = data.filter((el) => el.isExists === this.isChecked);
    else this.data = data;
  }
}
