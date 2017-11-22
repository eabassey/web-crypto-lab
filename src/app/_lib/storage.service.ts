import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable()
export class StorageService extends Dexie {


    customers: Dexie.Table<{id?: number, cipher: string}, number>;
    constructor() {
        super('HotelDb');
        this.version(1).stores({
            customers: '++id'
        });
    }
}
