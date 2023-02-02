import { Component }     from '@angular/core';
import { Route, Router } from '@angular/router';
import { routes }        from '../app-routing.module';

@Component({
    selector:    'app-navibar',
    templateUrl: './navibar.component.html',
    styleUrls:   [ './navibar.component.scss' ],
})
export class NavibarComponent {

    public readonly links: string[];

    activeLink: string;

    constructor(private router: Router) {
        this.links = routes.reduce((prev: string[], curr: Route) => {
            if (typeof curr.path === 'string' && curr.path.length)
                prev.push(curr.path);

            return prev;
        }, []);

        this.activeLink = this.links[0] ?? '';
    }
}
