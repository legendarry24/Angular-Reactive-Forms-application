import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLoggerComponent } from './my-logger.component';

describe('MyLoggerComponent', () => {
	let component: MyLoggerComponent;
	let fixture: ComponentFixture<MyLoggerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MyLoggerComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MyLoggerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
