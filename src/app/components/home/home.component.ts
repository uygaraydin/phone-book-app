import { Component, OnInit, ElementRef, ViewChild, Renderer, AfterViewInit, Input } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { PersonelService } from '../../providers/personel.service';
import { PersonelModel } from '../../models/personelModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('result') resultElem: ElementRef;
  @ViewChild('searchKey') searchElem: ElementRef;
  @ViewChild('list') list: ElementRef;
  @ViewChild('table') table: ElementRef;
  @ViewChild('noResult') noResult: ElementRef;
  @ViewChild('searchInstitue') searchInstitue: ElementRef;



  public selected: any;
  public searchList: PersonelModel[];
  private cursorPositionInInput: number;
  private active;
  private searchInstitueMode = false;

  // ! input elementinin bazı metodlarını kullanabilmek için typescript e HTMLInputElement türünde tanımlamalıyız
  input: HTMLInputElement;

  constructor(private electron: ElectronService, private renderer: Renderer, private personelService: PersonelService) { }

  ngOnInit() {


  }


  ngAfterViewInit() {

    this.input = <HTMLInputElement>document.querySelector('input.searchKey');

    this.electron.window.on('show', () => {
      this.input.focus();
      this.input.select();
    });


    this.input.addEventListener('keydown', function(e) {
      if (e.which === 38 || e.which === 40) {
        e.preventDefault();
      }
    });

    this.input.addEventListener('keypress', function(e) {
      if (e.which === 38 || e.which === 40) {
        e.preventDefault();
      }
    });

    document.addEventListener('keydown', this.handler.bind(this));

  }


  /* TrackForResult (index: number, searchList: any): string {
    return searchList.id;
  } */


  handler(e) {

    if ((e.keyCode === 40) || (e.keyCode === 38)) {
      this.active = document.querySelector('tr.hover');
      console.log(this.active);

      if ((this.searchList) &&
          (this.active)) {

            this.active.classList.remove('hover');

        if (e.which === 40) {

          this.active = this.active.nextElementSibling || this.active;
            this.ViewSelectedDetail(this.active.getAttribute('data-id'));



            // ! html elementi angularda kullanmak için cast etmelisin
            const activeElem = <HTMLElement>this.active;

            /* console.log('aşağı'); */
            /* console.log('önceki hoverlı hover offset ' + activeElem.offsetTop);
            console.log('önceki hoverlı scroll top ' + this.list.nativeElement.scrollTop);
            console.log('önceki hoverlı tbody offset ' + this.list.nativeElement.offsetTop);
            console.log('önceki hoverlı tbody yüksekliği ' + this.list.nativeElement.clientHeight);
            console.log(' ');*/

            if (activeElem.offsetTop - this.list.nativeElement.scrollTop === this.table.nativeElement.clientHeight ) {

              this.list.nativeElement.scrollTop = this.list.nativeElement.scrollTop + activeElem.clientHeight;

            }

            /* console.log('sonraki hoverlı hover offset ' + activeElem.offsetTop);
            console.log('sonraki hoverlı scroll top ' + this.list.nativeElement.scrollTop);
            console.log('sonraki hoverlı tbody offset ' + this.list.nativeElement.offsetTop);
            console.log('sonraki hoverlı tbody yüksekliği ' + this.list.nativeElement.clientHeight); */



        } else if (e.which === 38) {

          this.active = this.active.previousElementSibling || this.active;
            this.ViewSelectedDetail(this.active.getAttribute('data-id'));

            // ! html elementi angularda kullanmak için cast etmelisin
            const activeElem = <HTMLElement>this.active;

            /* console.log('yukarı'); */
            // console.log(activeElem.getAttribute('data-index'));

            /* console.log('önceki hoverlı hover offset ' + activeElem.offsetTop);
            console.log('önceki hoverlı scroll top ' + this.list.nativeElement.scrollTop);
            console.log('önceki hoverlı tbody offset ' + this.list.nativeElement.offsetTop);
            console.log('önceki hoverlı tbody yüksekliği ' + this.list.nativeElement.clientHeight);
            console.log(' '); */


            // tslint:disable-next-line:max-line-length
            if (activeElem.offsetTop - (this.list.nativeElement.scrollTop + this.list.nativeElement.offsetTop) === -activeElem.clientHeight) {

                this.list.nativeElement.scrollTop = this.list.nativeElement.scrollTop - activeElem.clientHeight;

            }


        } else {
          this.active = e.target;
        }

        this.active.classList.add('hover');
      }
      }
  }

  Search(event: any) {

    if (event.target.value.length === 0 && this.searchInstitueMode && (event.keyCode === 46 || event.keyCode === 8)) {

      event.target.placeholder = 'Rehberde Ara…';
      event.target.style.paddingLeft = '80px';
      this.searchInstitue.nativeElement.style.display = 'none';
      this.searchInstitueMode = false;

    }

    if (event.target.value.length < 3) {

      this.noResult.nativeElement.style.display = 'none';
      this.searchList = [];
      this.HideResultList();
      this.selected = {};

    }

    if (event.target.value === 'b/') {
      event.target.value = '';
      event.target.placeholder = '';
      event.target.style.paddingLeft = '260px';
      this.searchInstitue.nativeElement.style.display = 'inline';
      this.searchInstitueMode = true;
    }

    if (
        (event.keyCode !== 37) &&
        (event.keyCode !== 38) &&
        (event.keyCode !== 39) &&
        (event.keyCode !== 40) &&
        (event.target.value.length > 2) ) {

      // this.searchList = this.personel.filter(a => new RegExp(event.target.value, 'gmi').test(a.adsoyad));

      if (!this.searchInstitueMode) {
        this.personelService.Search(event.target.value).subscribe(
          response => this.searchList = response['rows'],
          err => console.log(err),
          () => {

            if (this.searchList.length > 0) {

              this.noResult.nativeElement.style.display = 'none';
              this.ShowResultList();

            } else {

              this.selected = {};
              this.HideResultList();
              this.noResult.nativeElement.style.display = 'inline-block';

            }
          }
        );
      } else {
        this.personelService.SearchByInstitue(event.target.value).subscribe(
          response => this.searchList = response['rows'],
          err => console.log(err),
          () => {

            if (this.searchList.length > 0) {

              this.noResult.nativeElement.style.display = 'none';
              this.ShowResultList();

            } else {

              this.selected = {};
              this.HideResultList();
              this.noResult.nativeElement.style.display = 'inline-block';

            }
          }
        );
      }

      /* setTimeout(function() {
        this.AddListenerResultList();
      }, 3000); */
    }
  }

  ShowResultList() {

    this.renderer.setElementStyle(this.resultElem.nativeElement, 'display', 'block');
    this.renderer.setElementStyle(this.searchElem.nativeElement, 'box-shadow', '10px 0px 10px rgba(0, 0, 0, 0.4)');

    this.electron.window.setContentSize(700, 400, true);
  }

  HideResultList() {
    this.electron.window.setContentSize(700, 70, true);
    this.renderer.setElementStyle(this.resultElem.nativeElement, 'display', 'none');
    this.renderer.setElementStyle(this.searchElem.nativeElement, 'box-shadow', 'none');
  }

  ViewSelectedDetail(id: number) {

    // tslint:disable-next-line:triple-equals
    // this.selected = this.personel.find(a => a.dahili_id == id);

    this.personelService.GetByID(id).subscribe(
      response => this.selected = response,
      err => console.log(err),
      () => {
        console.log(this.selected);
      }
    );

    // ! * .filter liste, .find tek kayıt döner

  }
}

