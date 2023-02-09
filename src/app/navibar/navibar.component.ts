import { Component }                     from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { routes }                        from '../app-routing.module';

@Component({
    selector:    'app-navibar',
    templateUrl: './navibar.component.html',
    styleUrls:   [ './navibar.component.scss' ],
})
export class NavibarComponent {

    public readonly routes: string[];

    activeLink: string;

    constructor(private router: Router) {

        this.routes = routes.reduce((prev: string[], curr: Route) => {
            if (typeof curr.path === 'string' && curr.path.length)
                prev.push(curr.path);

            return prev;
        }, []);

        this.activeLink = this.routes[0] ?? '';
        this.navigateTo(this.activeLink); // FIXME
    }

    public navigateTo(route: string): void {
        this.router.navigate([ route ]).catch();
        this.activeLink = route;
    }
}
