import { ComponentType } from '@angular/cdk/portal';
import { DialogService } from './dialog.service';

export const modal = (componentType: ComponentType<any>, message?: any) => {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor, data: any = {}) => {
    const originalMethod = descriptor.value;
    data = message;
    descriptor.value = async function ( ...args: any ) {
      DialogService.getInstance()?.openDialog(data, componentType)
        .subscribe(validation => {
          if (validation) originalMethod.apply(this, args);
        }
      );
    }
  };
}
