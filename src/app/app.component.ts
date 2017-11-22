import { Component, OnInit, Inject } from '@angular/core';
import { StorageService } from './_lib/storage.service';
import { CryptoService } from './_lib/_crypto.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { AES_CBC_KEY_NAME } from './_lib/config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
