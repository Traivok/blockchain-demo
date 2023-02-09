import { Component }                            from '@angular/core';
import { CryptoService }                        from '../crypto.service';
import { BehaviorSubject, from, ReplaySubject } from 'rxjs';

@Component({
    selector:    'app-hash',
    templateUrl: './hash.component.html',
    styleUrls:   [ './hash.component.scss' ],
})
export class HashComponent {
    public data: string = '';
    public hash$        = new ReplaySubject<string>();

    constructor(public crypto: CryptoService) {}

    public hashData(data: string): void {
        from(this.crypto.hash(data))
            .subscribe(hash => this.hash$.next(hash));
    }
}
