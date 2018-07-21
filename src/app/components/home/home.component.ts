import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('result') resultElem: ElementRef;
  @ViewChild('searchKey') searchElem: ElementRef;

  constructor(private electron: ElectronService, private renderer: Renderer) { }

  ngOnInit() {
  }

  Search(searchKey) {
    console.log(searchKey);

    if (searchKey !== '' && searchKey !== null && searchKey !== undefined) {
      this.renderer.setElementStyle(this.resultElem.nativeElement, 'display', 'block');
      this.renderer.setElementStyle(this.searchElem.nativeElement, 'box-shadow', '10px 0px 10px rgba(0, 0, 0, 0.4)');

      this.electron.window.setContentSize(700, 400, true);

    } else {
      this.electron.window.setContentSize(700, 70, true);
      this.renderer.setElementStyle(this.resultElem.nativeElement, 'display', 'none');
      this.renderer.setElementStyle(this.searchElem.nativeElement, 'box-shadow', 'none');
    }

  }
}
