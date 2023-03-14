import { DialogService } from './../../service/dialog.service';
import { LoginComponent } from './login/login.component';
import { ComponentType } from '@angular/cdk/portal';
import { SignupComponent } from './signup/signup.component';

export const authModal = (componentType: ComponentType<LoginComponent | SignupComponent>) => {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor, data: any = {}) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function ( ...args: any ) {
      DialogService.getInstance()?.openDialog(data, componentType)
        .subscribe(validation => {
          if (validation) originalMethod.apply(this, args);
        }
      );
    }
  };
}
