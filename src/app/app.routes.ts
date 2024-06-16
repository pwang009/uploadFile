import { Routes } from '@angular/router';
// import { DashboardComponent } from './components/pages/dashboard/dashboardComponent';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CommentsComponent } from './components/pages/comments/comments.component';
import { AnalyticsComponent } from './components/pages/analytics/analytics.component';
import { SettingsComponent } from './components/pages/settings/settings.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard', },
    { path: 'dashboard', component: DashboardComponent, },
    { path: 'comments', component: CommentsComponent, },
    { path: 'analytics', component: AnalyticsComponent, },
    { path: 'settings', component: SettingsComponent, }
];
