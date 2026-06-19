import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from './login-component';
import { AuthService } from "../../shared/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { vi, describe, it, beforeEach } from "vitest";
import { of } from "rxjs";


const mockAuthService = {
    isAuthenticated: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    getUser: vi.fn()
};

const mockRouter = {
    navigate: vi.fn()
};

const mockActivatedRoute = { queryParams: of({}) };


describe("Login component", () => {
    describe("Component class", () => {
        let fixture: ComponentFixture<LoginComponent>;
        let component: LoginComponent;

        beforeEach(async () => {
            vi.clearAllMocks();
            mockActivatedRoute.queryParams = of({}); // Reset queryParams to default state

            await TestBed.configureTestingModule({
                imports: [ LoginComponent ],
                providers: [
                    { provide: Router, useValue: mockRouter },
                    { provide: AuthService, useValue: mockAuthService },
                    { provide: ActivatedRoute, useValue: mockActivatedRoute }
                ]
            }).compileComponents();

            fixture = TestBed.createComponent(LoginComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        afterEach(() => {
            fixture.destroy();
        });

        describe("isLogged()",() => {
            it('should return true when the user is authenticated', () => {
                mockAuthService.isAuthenticated.mockReturnValue(true);

                expect(component.isLogged()).toBe(true);
            })

            it("should return false when the user is not authenticated", () => {
                mockAuthService.isAuthenticated.mockReturnValue(false);

                expect(component.isLogged()).toBe(false);
            })
        });

        describe("login()", () => {
            it("calls auth.login with username and 'user'role ", () => {
                component.login('user');
                expect(mockAuthService.login).toHaveBeenCalledWith("Kiril", "user");
            });

            it("calls auth.login with username and 'admin' role", () => {
                component.login("admin");
                expect(mockAuthService.login).toHaveBeenCalledWith("Kiril", "admin");
            });

            it("does NOT call auth.login for an unknown role", () => {
                component.login('superadmin');
                expect(mockAuthService.login).not.toHaveBeenCalled();
            });

            it("navigates to a returnUrl", () => {

                mockActivatedRoute.queryParams = of({ returnUrl: '/dashboard'});
                
                component.login('user');
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
            })
            
            it("does not navigate when returnUrl is absent", () => {
                mockActivatedRoute.queryParams = of({});
                
                component.login("user");
                expect(mockRouter.navigate).not.toHaveBeenCalled();
            });

            it("does not navigate when the role is invalid", () => {
                component.login('superuser');
                expect(mockRouter.navigate).not.toHaveBeenCalled();
            });
        });

        describe("logout()", () => {
            it("delegates to auth.logout()", () => {
                component.logout();
                expect(mockAuthService.logout).toHaveBeenCalledOnce();
            });
        });

        describe("getUserName()", () => {
            it("returns the username of a logged-in user", () => {
                mockAuthService.getUser.mockReturnValue({ username: 'Kiril', role: 'user'});
                expect(component.getUserName()).toBe('Kiril');
            });

            it("returns undefined when no user is logged", () => {
                mockAuthService.getUser.mockReturnValue(null);
                expect(component.getUserName()).toBeUndefined();
            });
        });

        describe("getUserRole()", () => {
            it("returns the user role of a logged-in user", () => {
                mockAuthService.getUser.mockReturnValue({ username: 'Kiril', role: 'user' });
                expect(component.getUserRole()).toBe('user');
            });

            it("returns undefined when no user is logged", () => {
                mockAuthService.getUser.mockReturnValue(null);
                expect(component.getUserRole()).toBeUndefined();
            });
        });
    })

    
    describe("Component template", () => {
        let fixture: ComponentFixture<LoginComponent>;

        beforeEach(async () => {
            vi.clearAllMocks();
            mockActivatedRoute.queryParams = of({}); // Reset queryParams to default state

            await TestBed.configureTestingModule({
                imports: [ LoginComponent ],
                providers: [
                    { provide: Router, useValue: mockRouter },
                    { provide: AuthService, useValue: mockAuthService },
                    { provide: ActivatedRoute, useValue: mockActivatedRoute }
                ]
            }).compileComponents();

            fixture = TestBed.createComponent(LoginComponent);
        });

        afterEach(() => { fixture.destroy(); });

        describe("when logged out", () => {

            beforeEach(() => {
                mockAuthService.isAuthenticated.mockReturnValue(false);
                fixture.detectChanges();
            });

            it("shows the login text", () => {
                expect(fixture.nativeElement.textContent).toContain("You can login with the following roles:")
            });

            it("shows login as a user button", () => {
                const button = fixture.nativeElement.querySelector('button:nth-of-type(1)');
                expect(button?.textContent?.trim()).toBe("Login user");
            });

            it("shows login as an admin button", () => {
                const button = fixture.nativeElement.querySelector('button:nth-of-type(2)');
                expect(button?.textContent?.trim()).toBe("Login admin");
            });

            it("does NOT show the logged-in message", () => {
                expect(fixture.nativeElement.textContent).not.toContain("You are logged in as Kiril ")
            });

            it("does NOT show logout button", () => {
                const buttons = fixture.nativeElement.querySelectorAll('button');
                
                const labels = Array.from<HTMLButtonElement>(buttons).map((element: HTMLButtonElement) => element.textContent.trim());
                expect(labels).not.toContain('Logout'); 
            });
        });

        describe("when logged in", () => {
            beforeEach(() => {
                mockAuthService.isAuthenticated.mockReturnValue(true);
                mockAuthService.getUser.mockReturnValue({ username: "Kiril", role: "admin"})
                fixture.detectChanges();
            });

            it("renders a logout button", () => {
                const button = fixture.nativeElement.querySelector('button');
                expect(button.textContent).toBe('Logout');
            });

            it("shows the logged-in message with username and role", () => {
                const content = fixture.nativeElement.textContent;
                expect(content).toContain("You are logged in as Kiril with admin role")
            });
            it("does NOT show login buttons", () => {
                const buttons = fixture.nativeElement.querySelectorAll('button');
                const labels = Array.from<HTMLButtonElement>(buttons).map((b: HTMLButtonElement) => b.textContent);
                expect(labels).not.toContain("Login user");
                expect(labels).not.toContain("Login admin");
            });

            it("calls logout() when logout is clicked", () => {
                const button = fixture.nativeElement.querySelector('button');
                button.click();

                expect(mockAuthService.logout).toHaveBeenCalledOnce();
            })
        });
    });
});
