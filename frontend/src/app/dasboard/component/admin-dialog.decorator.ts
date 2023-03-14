import { EditSkillComponent } from './dashboard/component/edit-skill/edit-skill.component';
import { EditProjectComponent } from './dashboard/component/edit-project/edit-project.component';
import { AddImageComponent } from './dashboard/component/add-image/add-image.component';
import { AddSkillComponent } from './dashboard/component/add-skill/add-skill.component';
import { DialogService } from '../../service/dialog.service';
import { ComponentType } from '@angular/cdk/portal';
import { AddProjectComponent } from './dashboard/component/add-project/add-project.component';
import { EditUserComponent } from './dashboard/component/edit-user/edit-user.component';

export const adminModal = (componentType: ComponentType<EditUserComponent | AddProjectComponent | EditProjectComponent | AddSkillComponent | EditSkillComponent | AddImageComponent>, data: any = {}) => {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
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
