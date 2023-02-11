import { Component, OnInit }   from '@angular/core';
import { from, ReplaySubject } from 'rxjs';
import sha256                  from '../sha256';
import { Sha256Stream }        from '../sha256.stream';

@Component({
    selector:    'app-hash',
    templateUrl: './hash.component.html',
    styleUrls:   [ './hash.component.scss' ],
})
export class HashComponent {
    public data: string = '';
    public hashStream   = new Sha256Stream();

    public hashData(data: string): void {
        this.hashStream.data = data;
    }
}
