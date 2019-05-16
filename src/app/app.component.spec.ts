import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseAuthStub} from './Mock/FirebaseMocks';
import {Router} from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule/*.withRoutes([{ path: 'tasks', loadChildren: './tasks/tasks.module#TasksModule'},
          { path: 'login', loadChildren: './authorisation/authorisation.module#AuthorisationModule'}])*/
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AngularFireAuth, useClass: FirebaseAuthStub}
        // {provide: Router, useClass: RouterTestingModule}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Lazy2Do'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Lazy2Do');
  });
});
