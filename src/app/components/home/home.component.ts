import { Component, OnInit, ElementRef, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

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


  public personel = [
      {
        dahili_id: 1,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet AKBAŞ',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 2,
        unvan: 'Öğr. Gör.',
        adsoyad: 'Ahmet AKIN',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 3,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet ALTIN',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 4,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet ALVER',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 5,
        unvan: 'Öğr. Gör.',
        adsoyad: 'Ahmet AŞİROĞLU',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 6,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet AKBAŞ',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 7,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet AKBAŞ',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 8,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet AKBAŞ',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 9,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet AKBAŞ',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 10,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet AKBAŞ',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 11,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet AKBAŞ',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 12,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet AKBAŞ',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 13,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet AKBAŞ',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
      {
        dahili_id: 14,
        unvan: 'Arş Gör.',
        adsoyad: 'Ahmet AKBAŞ',
        birim: 'İktisadi ve İdari Bilimler Fakültesi' ,
        dahili: '5173',
        gorev: 'Öğretim Üyesi',
        mail: 'ahmet.akbas@erdogan.edu.tr'
      },
  ];
  public selected: any;
  public searchList: any;

  constructor(private electron: ElectronService, private renderer: Renderer) { }

  ngOnInit() {


  }

  ngAfterViewInit() {

    let active = document.querySelector('tr.hover');

    document.addEventListener('keydown', handler.bind(this));

    function handler(e) {
            // console.log(e.which);
            active.classList.remove('hover');
        if (e.which === 40) {

            active = active.nextElementSibling || active;
            this.ViewSelectedDetail(active.getAttribute('data-id'));



            // ! html elementi angularda kullanmak için cast etmelisin
            const activeElem = <HTMLElement>active;

            console.log('aşağı');
            /* console.log('önceki hoverlı hover offset ' + activeElem.offsetTop);
            console.log('önceki hoverlı scroll top ' + this.list.nativeElement.scrollTop);
            console.log('önceki hoverlı tbody offset ' + this.list.nativeElement.offsetTop);
            console.log('önceki hoverlı tbody yüksekliği ' + this.list.nativeElement.clientHeight);
            console.log(' ');

            console.log(); */


            // tslint:disable-next-line:max-line-length
            if (activeElem.offsetTop - this.list.nativeElement.scrollTop === this.table.nativeElement.clientHeight ) {

              this.list.nativeElement.scrollTop = this.list.nativeElement.scrollTop + activeElem.clientHeight;

            }

            /* console.log('sonraki hoverlı hover offset ' + activeElem.offsetTop);
            console.log('sonraki hoverlı scroll top ' + this.list.nativeElement.scrollTop);
            console.log('sonraki hoverlı tbody offset ' + this.list.nativeElement.offsetTop);
            console.log('sonraki hoverlı tbody yüksekliği ' + this.list.nativeElement.clientHeight); */



        } else if (e.which === 38) {

            active = active.previousElementSibling || active;
            this.ViewSelectedDetail(active.getAttribute('data-id'));

            // ! html elementi angularda kullanmak için cast etmelisin
            const activeElem = <HTMLElement>active;

            console.log('yukarı');
            // console.log(activeElem.getAttribute('data-index'));

            console.log('önceki hoverlı hover offset ' + activeElem.offsetTop);
            console.log('önceki hoverlı scroll top ' + this.list.nativeElement.scrollTop);
            console.log('önceki hoverlı tbody offset ' + this.list.nativeElement.offsetTop);
            console.log('önceki hoverlı tbody yüksekliği ' + this.list.nativeElement.clientHeight);
            console.log(' ');


            // tslint:disable-next-line:max-line-length
            if (activeElem.offsetTop - (this.list.nativeElement.scrollTop + this.list.nativeElement.offsetTop) === -activeElem.clientHeight) {

                this.list.nativeElement.scrollTop = this.list.nativeElement.scrollTop - activeElem.clientHeight;

            }


        } else {
            active = e.target;
        }

            active.classList.add('hover');
    }
  }

  Search(searchKey) {
    console.log(searchKey);

    /* if (searchKey !== '' && searchKey !== null && searchKey !== undefined) {
      this.renderer.setElementStyle(this.resultElem.nativeElement, 'display', 'block');
      this.renderer.setElementStyle(this.searchElem.nativeElement, 'box-shadow', '10px 0px 10px rgba(0, 0, 0, 0.4)');

      this.electron.window.setContentSize(700, 400, true);

    } else {
      this.electron.window.setContentSize(700, 70, true);
      this.renderer.setElementStyle(this.resultElem.nativeElement, 'display', 'none');
      this.renderer.setElementStyle(this.searchElem.nativeElement, 'box-shadow', 'none');
    } */

    this.searchList = this.personel.filter(a => a.adsoyad.includes(searchKey));
    console.log(this.searchList);

  }


  ViewSelectedDetail(id: number) {

    // tslint:disable-next-line:triple-equals
    this.selected = this.personel.find(a => a.dahili_id == id);

    // ! * .filter liste, .find tek kayıt döner

    // console.log(this.selected);
    // setInterval(() => { console.log(selected); }, 1000 * 2);
    }
}
