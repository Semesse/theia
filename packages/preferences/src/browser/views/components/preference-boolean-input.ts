// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
// *****************************************************************************

import { injectable } from '@theia/core/shared/inversify';
import { PreferenceLeafNodeRenderer } from './preference-node-renderer';

@injectable()
export class PreferenceBooleanInputRenderer extends PreferenceLeafNodeRenderer<boolean, HTMLInputElement> {
    protected createInteractable(parent: HTMLElement): void {
        const interactable = document.createElement('input');
        this.interactable = interactable;
        interactable.type = 'checkbox';
        interactable.classList.add('theia-input');
        interactable.defaultChecked = this.getValue();
        interactable.onchange = this.handleUserInteraction.bind(this);
        parent.appendChild(interactable);
    }

    protected override getAdditionalNodeClassnames(): Iterable<string> {
        return ['boolean'];
    }

    protected getFallbackValue(): false {
        return false;
    }

    protected handleUserInteraction(): Promise<void> {
        return this.setPreferenceImmediately(this.interactable.checked);
    }

    protected doHandleValueChange(): void {
        const currentValue = this.interactable.checked;
        this.updateInspection();
        const newValue = this.getValue();
        this.updateModificationStatus(newValue);
        if (newValue !== currentValue && document.activeElement !== this.interactable) {
            this.interactable.checked = newValue;
        }
    }
}
