// this contains all currently mounted nodes with help text, in a dictionary
// of the ids passed to the helpText directive. When something gets unmounted
// the id of the directive is removed from this variable.
export let elements_with_help_text: Record<string, [string, HTMLElement]> = {}

// this type is just so long, so I made this little abstraction just to make
// things clearer. most of the stuff here is marked any because I don't care
// what type it is, and the Vue docs didn't speciy a type for it.
type MountHelpBinding = { arg: any, modifiers: any, value: { id: string, text: string }, oldValue: any }

// i guess it's weird and different on unmount so I also made a second one
type UnmountHelpBinding = { arg: any, modifiers: any, value: any, oldValue: { id: string, text: string } }

export const vHelpText = {
    mounted(el: HTMLElement, binding: MountHelpBinding) {
        console.log(binding);
        elements_with_help_text[binding.value.id] = [binding.value.text, el];
    },

    beforeUnmount(el: HTMLElement, binding: MountHelpBinding) {
        console.log(elements_with_help_text);
        console.log("binding");
        console.log(binding.value);
        delete elements_with_help_text[binding.value.id];
    }
}
