import { from, ReplaySubject, take } from 'rxjs';
import sha256                        from './sha256';

export class Sha256Stream {
    private _stream$ = new ReplaySubject<string>(1);
    public stream$   = this._stream$.asObservable();

    public set data(value: string | object) {
        from(sha256(value))
            .pipe(take(1))
            .subscribe(hash => this._stream$.next(hash));
    }

    constructor(data: string | object = '') {
        this.data = data;
    }
}
