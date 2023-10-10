import { Directive, HostBinding, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isClassApplied = false;

    @HostListener('click') onDropdownClicked(eventDate: Event){
        this.isClassApplied = !this.isClassApplied;
    }

}