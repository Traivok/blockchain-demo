import sha256 from './sha256';

describe('Sha256', () => {
    it('should create an instance', async () => {
        expect(sha256).toBeInstanceOf(Function);
        const data = 'helloworld';
        const hash = '936a185caaa266bb9cbe981e9e05cb78cd732b0b3280eb944412bb6f8f8f07af';

        expect(await sha256(data)).toEqual(hash);
    });
});
