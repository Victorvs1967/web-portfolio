import { AlertDialogData } from "src/app/model/alert-dialog.model";
import { DialogService } from "src/app/service/dialog.service";
import { AlertComponent } from "./alert.component";

const defaultAlertData = {
  title: 'A you sure?',
  subtitle: 'You can login again when you want.',
  message: 'If you want to logout current user,',
};

export const alertModal = (alertData: AlertDialogData = defaultAlertData) => {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any) {
      DialogService.getInstance()?.openDialog(alertData, AlertComponent, '400px')
        .subscribe(validation => {
          if (validation) originalMethod.apply(this, args);
        });
    }

    return descriptor;
  }
}
