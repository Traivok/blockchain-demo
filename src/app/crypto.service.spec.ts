import { TestBed } from '@angular/core/testing';

import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
    let service: CryptoService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CryptoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should hash correctly using 256', async () => {
        const data   = 'helloworld';
        const sha256 = '936a185caaa266bb9cbe981e9e05cb78cd732b0b3280eb944412bb6f8f8f07af';

        expect(await service.hash(data)).toEqual(sha256);
    });
});
